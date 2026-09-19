const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
let authTokenGetter = null;

export const setAuthTokenGetter = (getter) => {
  authTokenGetter = getter;
};

/**
 * Build common headers for API requests.
 */
const getHeaders = async (isJson = true) => {
  const headers = {};
  let token = null;

  const impersonationToken = sessionStorage.getItem(
    "urbanrent_impersonation_token",
  );
  if (impersonationToken) {
    token = impersonationToken;
  } else {
    try {
      token =
        JSON.parse(localStorage.getItem("urbanrent_admin") || "null")
          ?.sessionToken || null;
    } catch {
      /* ignore invalid local session */
    }
  }

  if (!token) {
    token = authTokenGetter ? await authTokenGetter() : null;
  }

  if (!token) {
    token = (await window.Clerk?.session?.getToken?.()) || null;
  }

  if (!token && window.location.pathname.startsWith("/demo")) {
    const demoId = window.location.pathname.startsWith("/demo/admin")
      ? "demo-admin"
      : window.location.pathname.startsWith("/demo/tenant")
        ? "demo-tenant"
        : "demo-manager";
    headers["x-demo-user-id"] = demoId;
  }
  if (token) headers.Authorization = `Bearer ${token}`;
  if (isJson) headers["Content-Type"] = "application/json";
  return headers;
};

/**
 * Shared error handler - detects suspension/deletion from API 403 responses
 */
const handleApiError = (res, err) => {
  if (res.status === 403) {
    if (err.deleted) {
      window.dispatchEvent(
        new CustomEvent("user-deleted-api", {
          detail: { reason: err.error },
        }),
      );
    } else if (err.suspended) {
      window.dispatchEvent(
        new CustomEvent("user-suspended-api", {
          detail: { reason: err.reason, suspendedAt: err.suspendedAt },
        }),
      );
    }
  }
};

/**
 * GET request
 */
export const apiGet = async (path) => {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: await getHeaders(),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Request failed" }));
    handleApiError(res, err);
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  return res.json();
};

/**
 * POST request (JSON body)
 */
export const apiPost = async (path, body) => {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: await getHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Request failed" }));
    handleApiError(res, err);
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  return res.json();
};

/**
 * POST request with FormData (for file uploads)
 */
export const apiPostForm = async (path, formData) => {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: await getHeaders(false), // No Content-Type -- browser sets it with boundary
    body: formData,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Request failed" }));
    handleApiError(res, err);
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  return res.json();
};

/**
 * PATCH request
 */
export const apiPatch = async (path, body = {}) => {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "PATCH",
    headers: await getHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Request failed" }));
    handleApiError(res, err);
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  return res.json();
};

/**
 * PUT request
 */
export const apiPut = async (path, body) => {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "PUT",
    headers: await getHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Request failed" }));
    handleApiError(res, err);
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  return res.json();
};

/**
 * PUT request with FormData (for file uploads during edits)
 */
export const apiPutForm = async (path, formData) => {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "PUT",
    headers: await getHeaders(false),
    body: formData,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Request failed" }));
    handleApiError(res, err);
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  return res.json();
};

/**
 * DELETE request
 */
export const apiDelete = async (path) => {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "DELETE",
    headers: await getHeaders(),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Request failed" }));
    handleApiError(res, err);
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  return res.json();
};
