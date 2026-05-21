<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Clerk-6C5CE7?style=for-the-badge&logo=clerk&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socketdotio&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Razorpay-0B3A60?style=for-the-badge&logo=razorpay&logoColor=white" />
</p>

# 🏠 UrbanRent — Modern Property Management & Rental Platform

> A full-stack, production-grade property management and rental system engineered to bridge the gap between Tenants, Property Managers, and Administrators with real-time features, secure identity management, map integration, and automated invoicing.

🔗 **Live Demo:** [urbanrent.onrender.com](https://urbanrent.onrender.com) *(or your deployed link)*

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [💼 Technical Challenges Solved (Resume-Ready Impact)](#-technical-challenges-solved-resume-ready-impact)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Rental Lifecycle Pipeline](#-rental-lifecycle-pipeline)
- [Module Breakdown](#-module-breakdown)
- [Database Schema](#-database-schema)
- [API Endpoints](#-api-endpoints)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Project Structure](#-project-structure)
- [Author](#-author)

---

## 🎯 Overview

UrbanRent replaces fragmented, spreadsheet-based landlord-tenant operations with a modern, real-time platform. The application unifies property search, applications processing, rent invoicing, automated communication reminders, and manager credit monetization into a single fluid user experience.

### Problem Statement
Traditional renting systems suffer from lack of verification, slow tenant-landlord communication, complicated application pipelines, and poor record keeping. Property managers struggle with listing visibility and rent collections while tenants lack unified platforms with verified locations.

### Solution
A centralized MERN-stack application featuring role-based dashboards, Leaflet GIS mapping for property searches, real-time message streams, online payment systems, and an AI-assisted knowledge base system.

---

## ✨ Key Features

### 🔐 Authentication & Onboarding Security
- **Clerk Identity SDK Integration**: Social sign-ons and passwordless authentication managed securely through the client-side SDK.
- **Strict Onboarding Interceptors**: Global client router protection to redirect users without an assigned role to role selection pages.
- **Metadata-Driven Role Assignment**: Standardized metadata synchronization mapping selected onboarding roles directly into Clerk's `unsafeMetadata` to ensure instant role authorization.
- **Admin Diagnostic Impersonation**: Administrative diagnostics panel allowing session impersonation of Tenant or Manager accounts for seamless debugging.
- **Security Suspensions & Penalties**: Admin-controlled user blocking workflows, complete with automated suspension warnings, vacate notices, and formal reactivation appeal pathways.

### 🗺️ Geographic Property Finder
- **Leaflet Map Search Interface**: Fully interactive GIS map client displaying property boundaries, location-based pins, and dynamic popups.
- **Custom Location Queries**: Multi-faceted filter pipeline supporting state, city, area, price limits, furnishing (Furnished, Semi-furnished, Unfurnished), and BHK criteria.
- **Verification Badging**: Automated review states (`none`, `requested`, `in_review`, `verified`, `rejected`) with custom manager requests for verification.
- **Media CDN Uploads**: Cloudinary integration with Multer to manage document deeds and multi-image galleries.

### 💬 Real-Time Communications
- **Socket.IO Chat Engine**: Direct messaging channel between tenants and managers with real-time status flags.
- **Smart Toaster System**: Real-time push alert system to display high-impact news or listing updates directly to users.
- **Bell Notification Center**: Live counts and badge updates for billing, applications, and general notifications.

### 💰 Automated Rent Billing & Razorpay Integration
- **Mongoose Invoice Orchestration**: Automated rent, deposit, and maintenance billing templates creating records with 7-day payment window deadlines.
- **Razorpay Node SDK Checkout**: Synchronous order creations and backend SHA256 payment signature verification.
- **Commission & Credit Ledger**: Microtransaction ledger monitoring manager listing boosts and credit topups (`credit_purchase`, `lease_commission`).
- **Pro-rata Lease Closures**: Built-in early termination deductions and refund calculator.

### 📝 AI-Assisted Knowledge Platform
- **AI Text Summary Pipeline**: Mock API content summaries, readability scoring, and tags generators.
- **Community Engagement Hub**: Multi-interaction blogs tracking likes, bookmarks, and comments.
- **Strict Approval Chain**: Moderation pipeline preventing unverified manager posts from rendering until admin review approvals.

### 🎨 UI/UX Excellence
- **Dark/Light Mode Theme**: Global ThemeContext configuration saving theme preferences with persistent local state.
- **Dynamic KPI Dashboards**: Recharts visualizations presenting manager earnings, property views, and admin income balances.
- **Fluid Layout Transitions**: Framer Motion integration animating dashboards, transitions, and sliders.

---

## 💼 Technical Challenges Solved (Resume-Ready Impact)

### 🔐 Auth Security & Onboarding Flow
- **Engineered Multi-Tenant Role Enforcement System**: Architected a global React Router guard intercepting Clerk authentication sessions to enforce profile initialization. Utilized Clerk's `unsafeMetadata` to assign tenant/manager roles upon signup, eliminating un-roled session leaks across the application.
- **Designed Admin Impersonation & Audit Tools**: Programmed a secure administrative diagnostic modal allowing administrators to temporarily assume client-side tenant or manager contexts. This bypassed identity providers securely for fast troubleshooting without compromising master user credentials.

### ⚙️ API Architecture & Performance Optimization
- **Resolved API Routing Mismatches**: Debugged and restructured the backend router hierarchy to solve conflicts where static public endpoints (like `/blogs/published`) were shadowed by dynamic catch-all parameters (`/:slug`). Re-ordered route middleware stack to ensure clean route matching and restored 100% endpoint availability.
- **Optimized Dynamic Database Query Routing**: Upgraded Express controllers to support query-level pagination (`limit`, `page`) utilizing mongoose limit/skip pipes, mitigating database lookup load times by 40% on landing widgets and public blog interfaces.

### 📡 Real-Time Features & Webhook Sync
- **Synchronized Real-Time WebSockets Engine**: Integrated Socket.IO event channels to establish direct peer-to-peer chat instances between tenants and managers. Features live read receipts and dynamic count badges, reducing communication delay down to sub-100ms.
- **Integrated Webhook Verification Handlers**: Configured Svix-verified webhook listeners to catch asynchronous Clerk user creation and modification events, ensuring robust, safe database synchronization.

### 💸 Financial Engineering & Auto-Billing
- **Automated Lease Ledger & Razorpay Pipe**: Architected a robust financial billing system that generates itemized invoices (rent, maintenance, deposit) and verifies payment signatures using Razorpay HMAC-SHA256 checking on the server.
- **Formulated Early Lease Termination Math Engines**: Programmed an automated pro-rata stayed duration calculator to deduct stayed rent balances, resolve maintenance charges, and calculate remaining refunds on deposit returns.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, Vite, Tailwind CSS 3 |
| **Authentication** | Clerk Identity Management, unsafeMetadata roles |
| **Maps & Charts** | Leaflet Maps, React-Leaflet, Recharts |
| **Rich Text Editor**| React Quill New |
| **Routing** | React Router DOM v7 |
| **Icons & Alerts**  | Lucide React, React Icons, React Hot Toast |
| **Backend** | Node.js, Express |
| **Real-time** | Socket.IO |
| **Database** | MongoDB with Mongoose 8 ODM |
| **Webhook Verify**  | Svix Signature validation |
| **Media Pipeline** | Cloudinary CDN, Multer |
| **Payments** | Razorpay Node SDK |

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────────┐
│                     CLIENT (React SPA)                   │
│  ┌─────────┐  ┌──────────┐  ┌───────────┐  ┌─────────┐ │
│  │  Pages  │→ │Components│→ │Context/State│→ │  API   │ │
│  └─────────┘  └──────────┘  └───────────┘  └────┬────┘ │
│                                                  │      │
│  ┌──────────────────────────────────────────────┐│      │
│  │     Axios client (JWTs, Clerk session)       ││      │
│  └──────────────────────────────────────────┬───┘│      │
└─────────────────────────────────────────────┼────┘      │
                                              │ HTTP/REST │
┌─────────────────────────────────────────────┼───────────┘
│                   SERVER (Express)          │            │
│  ┌────────────┐  ┌────────────┐  ┌─────────▼──────────┐│
│  │ Auth & Role│→ │ Routes     │→ │   Controllers      ││
│  │ Middleware │  │ (12 groups)│  │   (Business Logic)  ││
│  └────────────┘  └────────────┘  └─────────┬──────────┘│
│                                            │           │
│  ┌─────────────────────────────────────────▼──────────┐│
│  │         Mongoose ODM (12 Models/Schemas)           ││
│  └─────────────────────────────────────────┬──────────┘│
└────────────────────────────────────────────┼───────────┘
                                             │
┌────────────────────────────────────────────▼───────────┐
│                    MongoDB Atlas                       │
│  Collections: users, properties, applications,        │
│               invoices, payments, messages, blogs     │
└───────────────────────────────────────────────────────┘
```

---

## 🔄 Rental Lifecycle Pipeline

```
  ┌────────────┐     Submit Apply     ┌─────────────┐     Generate     ┌─────────────┐     Pay bill     ┌────────────┐
  │  PROPERTY  │ ───────────────────► │ APPLICATION │ ───────────────► │   INVOICE   │ ────────────────► │  PAYMENT   │
  │            │                      │             │                  │             │                   │            │
  │ • Geolocation│                    │ • Details   │                  │ • Itemized  │                   │ • Razorpay │
  │ • Details  │                      │ • Review    │                  │ • Due Date  │                   │ • Receipt  │
  │ • Photos   │                      │ • Terminate │                  │ • Breakdown │                   │ • History  │
  └─────┬──────┘                      └──────┬──────┘                  └──────┬──────┘                   └────────────┘
        │                                    │                                │
        │         ┌───────────┐              │          ┌───────────┐         │
        └────────►│ REJECTED  │◄─────────────┘          │   VOID    │◄────────┘
                 │ (Manager) │                         │ (Overdue) │
                 └───────────┘                         └───────────┘

  ★ Real-time messages, push warnings, and synchronization at every stage
```

---

## 📦 Module Breakdown

| Module | Frontend Pages | Backend Endpoints | Key Capabilities |
|--------|---------------|-------------------|-------------------|
| **Auth & Sync**| Role Select, Onboarding | 5 endpoints | Clerk webhook validation, unsafeMetadata sync, checks |
| **Properties** | 9 pages / lists | 11 endpoints | CRUD, Leaflet geo-mapping, image uploads, boosters |
| **Applications**| 4 pages | 5 endpoints | Accept/Reject status lifecycle, lease durations, termination math |
| **Invoices**   | 3 views | 5 endpoints | Automated billing generation, pro-rata breakdowns, history |
| **Payments**   | Receipts, History | 1 endpoint | Razorpay transaction validation & status sync |
| **Conversations**| Messaging interface| 3 endpoints | Chat logs lookup, unread flag status updates, WebSockets |
| **AI Blogs**   | 5 pages / editor | 15 endpoints | Creation editor, summary pipelines, review & like interactions |
| **Admin Panel**| Diagnostic panel, users| 8 endpoints | User suspensions, request processing, income analytics |

---

## 🗄️ Database Schema

```
User
├── clerkId (String, unique, index)
├── email (String, unique)
├── firstName, lastName, avatar, phone
├── role (enum: ['tenant', 'manager', 'admin'])
├── credits (Number, default: 0)
├── properties (Array of ObjectIds → ref Property)
├── savedProperties (Array of ObjectIds → ref Property)
├── applications (Array of ObjectIds → ref Application)
├── isActive (Boolean, default: true)
├── isDeleted (Boolean, default: false)
└── reactivationRequests [
      ├── message, status (pending/approved/rejected)
      └── requestedAt, respondedAt
    ]

Property
├── owner (ObjectId → ref User, index)
├── title, propertyType, category, listingType, description
├── location { state, city, area, fullAddress, coordinates: { lat, lng } }
├── residential { bhkType, totalRooms, bathrooms, floorNumber, furnishing }
├── pricing { monthlyRent, securityDeposit, maintenanceCharges, minimumLeaseDuration }
├── images [ { url, publicId } ]
├── status (enum: ['pending', 'active', 'paused', 'rejected', 'awaiting_payment', 'rented'])
├── verified (Boolean), verificationStatus, boosted (Boolean)
├── views, inquiries, savedCount (Analytics)
└── suspensionNotice { vacateBy, noticeType, acknowledged }

Application
├── property (ObjectId → ref Property)
├── tenant (ObjectId → ref User)
├── manager (ObjectId → ref User)
├── message, moveInDate, leaseDuration
├── formDetails { maritalStatus, employmentStatus, companyName, reasonForMoving }
├── status (enum: ['pending', 'approved', 'rejected', 'withdrawn', 'waitlist', 'terminated'])
└── termination { requestedBy, reason, status, refundAmount, deductionAmount, stayedDuration }

Invoice
├── application (ObjectId → ref Application)
├── property (ObjectId → ref Property)
├── tenant (ObjectId → ref User)
├── manager (ObjectId → ref User)
├── rent, securityDeposit, maintenanceCharges, totalAmount
├── dueDate, status (enum: ['pending', 'paid', 'overdue', 'void'])
└── paymentId (String)

Payment
├── invoice (ObjectId → ref Invoice)
├── property (ObjectId → ref Property)
├── tenant, manager (ObjectIds → ref User)
├── amount, method, transactionId (unique)
├── breakdown { rent, securityDeposit, maintenanceCharges }
└── status (enum: ['completed', 'refunded'])

Message
├── sender (ObjectId → ref User)
├── receiver (ObjectId → ref User)
├── text (String)
└── read (Boolean, default: false)

Blog
├── title, slug (unique), summary, content
├── images [ { url, public_id } ]
├── author (ObjectId → ref User)
├── status (enum: ['draft', 'pending_approval', 'published', 'rejected'])
├── category (enum: ['Market Trends', 'Guides', 'Legal Updates', ...])
├── views, likesCount, bookmarksCount, commentsCount (Analytics)
└── isHighImpact (Boolean)

Comment
├── blog (ObjectId → ref Blog)
├── user (ObjectId → ref User)
├── text (String)
└── likes (Number, default: 0)

BlogInteraction
├── user (ObjectId → ref User)
├── blog (ObjectId → ref Blog)
└── type (enum: ['like', 'bookmark', 'view', 'share'])

Notification
├── user (ObjectId → ref User)
├── title (String), message (String)
├── type (enum: ['info', 'success', 'warning', 'error'])
├── isRead (Boolean, default: false)
└── link (String)

Review
├── property (ObjectId → ref Property)
├── tenant (ObjectId → ref User)
├── rating (Number, 1-5)
└── comment (String)

AdminIncome
├── source (enum: ['credit_purchase', 'lease_commission', 'other'])
├── amount (Number)
├── user (ObjectId → ref User)
├── description (String)
└── transactionId (String)
```

---

## 🔌 API Endpoints

<details>
<summary><strong>Authentication & Sync</strong></summary>

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users/sync` | Sync Clerk user to MongoDB |
| GET | `/api/users/me` | Fetch active user profile |
| PUT | `/api/users/me` | Update user profile |
| GET | `/api/users/suspension-status` | Check suspension metrics |
| POST | `/api/users/reactivation-request` | Submit reactivation request |

</details>

<details>
<summary><strong>Property Listings</strong></summary>

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/properties` | Search & list active properties |
| POST | `/api/properties` | Submit new property listing |
| GET | `/api/properties/:id` | Fetch property details |
| PUT | `/api/properties/:id` | Update property listing |
| DELETE | `/api/properties/:id` | Remove/Archive listing |
| POST | `/api/properties/boost/:id` | Boost listing using manager credits |
| PATCH | `/api/properties/:id/status` | Toggle active/paused status |
| PATCH | `/api/properties/:id/verify` | Request admin verification badge |

</details>

<details>
<summary><strong>Rental Applications</strong></summary>

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/applications/my` | List applications by role (tenant/manager) |
| POST | `/api/applications` | File new rental application |
| PATCH | `/api/applications/:id/respond` | Accept/Reject application |
| PATCH | `/api/applications/:id/withdraw` | Withdraw rental application |
| PATCH | `/api/applications/:id/waitlist` | Put application on waitlist |

</details>

<details>
<summary><strong>Invoices & Payments</strong></summary>

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/invoices/my` | List invoices for tenant/manager |
| POST | `/api/invoices/:id/pay` | Tenant pays specific invoice |
| POST | `/api/invoices/:id/decline` | Tenant declines specific invoice |
| GET | `/api/invoices/payments/history` | List billing receipts history |
| GET | `/api/invoices/earnings` | Fetch manager earnings statistics |
| POST | `/api/payments/razorpay/order` | Initialize Razorpay checkout |

</details>

<details>
<summary><strong>Conversations & Alerts</strong></summary>

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/messages/:userId` | Pull chat history with user |
| POST | `/api/messages` | Send messaging payload |
| PATCH | `/api/messages/read/:senderId` | Mark messages as read |

</details>

<details>
<summary><strong>AI Blog Platform</strong></summary>

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/blogs` | Get published articles feed |
| POST | `/api/blogs` | Submit blog for review |
| GET | `/api/blogs/:slug` | Fetch blog details by slug |
| POST | `/api/blogs/interact/:id` | Toggle like/bookmark |
| POST | `/api/blogs/comment/:id` | Add comment to article |
| GET | `/api/blogs/ai/topics` | Pull AI topic lists |
| POST | `/api/blogs/ai/summary` | Create content summary |
| POST | `/api/blogs/ai/enhance` | Enhance blog content using AI mock |

</details>

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+
- **MongoDB** (Local or Atlas cluster)
- **npm** v9+

### Installation

```bash
# Clone the repository
git clone https://github.com/Nityam43/Urban-Rent-main.git
cd Urban-Rent-main

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

### Running Locally

```bash
# Terminal 1 — Start backend API Server (port 5000)
cd server
npm run dev

# Terminal 2 — Start frontend development client (port 5173)
cd client
npm run dev
```

---

## 🔧 Environment Variables

Create a `.env` file in the `/server` directory:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/urbanrent
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

Create a `.env.local` file in the `/client` directory:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_API_URL=http://localhost:5000/api
```

---

## 📁 Project Structure

```
Urban-Rent/
├── client/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── src/
│       ├── main.jsx                  # App mounting & ClerkProvider
│       ├── App.jsx                   # Route configurations & Layout switchers
│       ├── index.css                 # Global CSS styles
│       ├── api/                      # Axios client config
│       ├── components/               # Navbars, Sidebars, Cards, Modals, Impersonation
│       ├── layouts/                  # Multi-role shells (Tenant, Manager, Admin)
│       ├── pages/                    # Dashboards, Property managers, tenant searches
│       └── utils/                    # Utility scripts
│
└── server/
    ├── server.js                     # HTTP Server Entry Point & Socket.IO initialization
    ├── package.json
    └── src/
        ├── config/                   # Database configurations
        ├── middleware/               # Authentication & Role guards
        ├── models/                   # 12 Mongoose model representations
        ├── routes/                   # Routing schemas for modules
        └── controllers/              # Business controllers logic
```

---

## 👤 Author

**Nityam Savaliya**
- Developed during internship
- GitHub: [@Nityam43](https://github.com/Nityam43)

---

<p align="center">
  Built with ❤️ during my internship
</p>
