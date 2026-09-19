import User from "../models/User.js";
import crypto from "crypto";
import { verifyToken } from "@clerk/backend";

const TOKEN_PREFIX = "urbanrent";
const getSigningSecret = () =>
  process.env.ADMIN_SESSION_SECRET || process.env.CLERK_SECRET_KEY;

const encode = (value) =>
  Buffer.from(JSON.stringify(value)).toString("base64url");
const decode = (value) =>
  JSON.parse(Buffer.from(value, "base64url").toString("utf8"));

const signPayload = (payload) => {
  const secret = getSigningSecret();
  if (!secret)
    throw new Error(
      "ADMIN_SESSION_SECRET or CLERK_SECRET_KEY must be configured",
    );
  const encodedPayload = encode(payload);
  const signature = crypto
    .createHmac("sha256", secret)
    .update(encodedPayload)
    .digest("base64url");
  return `${TOKEN_PREFIX}.${encodedPayload}.${signature}`;
};

const verifySignedPayload = (token) => {
  const [, encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) return null;

  const secret = getSigningSecret();
  if (!secret) return null;

  const expected = crypto
    .createHmac("sha256", secret)
    .update(encodedPayload)
    .digest("base64url");
  const suppliedBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  if (
    suppliedBuffer.length !== expectedBuffer.length ||
    !crypto.timingSafeEqual(suppliedBuffer, expectedBuffer)
  ) {
    return null;
  }

  const payload = decode(encodedPayload);
  return payload.exp > Math.floor(Date.now() / 1000) ? payload : null;
};

export const createAdminSessionToken = (userId) =>
  signPayload({
    type: "admin",
    sub: userId,
    exp: Math.floor(Date.now() / 1000) + 8 * 60 * 60,
  });

export const createImpersonationToken = (adminId, targetId) =>
  signPayload({
    type: "impersonation",
    actor: adminId,
    sub: targetId,
    exp: Math.floor(Date.now() / 1000) + 15 * 60,
  });

const getBearerToken = (req) => {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) return null;
  return header.slice(7).trim();
};

const getIdentity = async (req) => {
  const token = getBearerToken(req);
  if (token?.startsWith(`${TOKEN_PREFIX}.`)) {
    return verifySignedPayload(token);
  }

  if (token && process.env.CLERK_SECRET_KEY) {
    try {
      const claims = await verifyToken(token, {
        secretKey: process.env.CLERK_SECRET_KEY,
      });
      return { type: "clerk", sub: claims.sub };
    } catch {
      return null;
    }
  }

  if (process.env.NODE_ENV !== "production") {
    const demoId = req.headers["x-demo-user-id"];
    if (demoId) return { type: "demo", sub: demoId };
  }

  return null;
};

const findUserForIdentity = async (identity) => {
  if (!identity?.sub) return null;

  let user = await User.findOne({ clerkId: identity.sub });
  if (
    !user &&
    identity.type === "demo" &&
    ["demo-manager", "demo-tenant", "demo-admin"].includes(identity.sub)
  ) {
    const roleMap = {
      "demo-manager": "manager",
      "demo-tenant": "tenant",
      "demo-admin": "admin",
    };
    const role = roleMap[identity.sub];
    user = await User.create({
      clerkId: identity.sub,
      email: `${role}@demo.urbanrent.com`,
      firstName: "Demo",
      lastName: role.charAt(0).toUpperCase() + role.slice(1),
      role,
    });
  }

  return user;
};

export const authenticateIdentity = async (req, res, next) => {
  try {
    const identity = await getIdentity(req);
    if (!identity)
      return res.status(401).json({ error: "Authentication required." });
    req.auth = identity;
    next();
  } catch (error) {
    console.error("Identity verification error:", error);
    res.status(401).json({ error: "Authentication failed." });
  }
};

/**
 * Middleware to authenticate a user from a verified Clerk token or a signed
 * server-issued admin/impersonation session.
 */
export const authenticateUser = async (req, res, next) => {
  try {
    const identity = await getIdentity(req);
    if (!identity)
      return res.status(401).json({ error: "Authentication required." });

    const user = await findUserForIdentity(identity);

    if (!user) {
      return res
        .status(404)
        .json({ error: "User not found. Please complete registration." });
    }

    // Permanently deleted - no recovery possible
    if (user.isDeleted) {
      return res.status(403).json({
        error: "This account has been permanently removed.",
        deleted: true,
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        error: "Account is suspended.",
        suspended: true,
        suspendedAt: user.suspendedAt,
        reason: user.suspendedReason || "Account suspended by administrator",
      });
    }

    req.user = user;
    req.auth = identity;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(500).json({ error: "Authentication failed." });
  }
};

/**
 * Optional authentication middleware.
 * Attempts to authenticate user but does NOT reject unauthenticated requests.
 * Sets req.user if valid credentials are present, otherwise proceeds with req.user = null.
 */
export const optionalAuth = async (req, res, next) => {
  try {
    const identity = await getIdentity(req);
    const user = await findUserForIdentity(identity);
    if (user && user.isActive) {
      req.user = user;
      req.auth = identity;
    }
    next();
  } catch (error) {
    // Silently proceed without auth
    next();
  }
};

/**
 * Role-based access control middleware.
 * Usage: requireRole('manager') or requireRole('tenant', 'admin')
 */
export const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required." });
    }

    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ error: `Access denied. Requires role: ${roles.join(" or ")}` });
    }

    next();
  };
};
