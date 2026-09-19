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

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
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

### 🔐 Authentication & Onboarding
- **Clerk Identity Authentication**: Multi-mode login and registration using the latest Clerk React SDK.
- **Strict Onboarding Interceptors**: Global client router protection to redirect users without an assigned role to role selection pages.
- **Admin Diagnostic Impersonation**: Administrative diagnostics panel allowing session impersonation of Tenant or Manager accounts.

### 🗺️ Geographic Property Search
- **Leaflet Maps Integration**: Geolocation pin-drop references and interactive map rendering for property searches.
- **Dynamic Property Filtering**: Categorization, BHHK filtering, search scopes, and customized amenity matching.
- **Cloudinary Image Pipes**: Multi-image property documentation upload with Multer and Cloudinary CDN storage.

### 💬 Real-Time Communications
- **Socket.IO Chat Engine**: Direct messaging channel between tenants and managers with delivery flags.
- **Smart Toaster System**: Real-time push alert system to display high-impact news or listing updates directly to users.
- **Bell Notification Center**: Live counts and badge updates for billing, applications, and general notifications.

### 💰 Billing & Razorpay Payments
- **Rent & Security Invoicing**: Automatic invoice generation with itemized rent, deposits, and maintenance calculations.
- **Razorpay Integration**: End-to-end payment processing with card/UPI checks.
- **PDF-friendly Invoices**: Clean transaction tracking with printable receipt viewports.
- **Pro-Rata Lease Terminations**: Auto-calculated stayed duration deductions and refund settlements on early termination requests.

### 📝 AI-Enhanced Knowledge Base
- **Mock AI Article Editor**: Blog creation workflows with automated topic generation, text summarizing, and readability enhancers.
- **Reader Analytics**: Dynamic metrics tracking likes, views, bookmarks, and thread comments per blog.
- **Moderation Workflow**: Manager articles submit to `pending_approval` for Admin reviews before publishing.

### 🗑️ Soft Delete & Security Sanctions
- **User Suspension System**: Complete suspension and recovery flows with dedicated admin review panels.
- **Soft Delete Management**: Soft delete wrappers on listings and applications allowing recovery before permanent erasure.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, Vite, Tailwind CSS 3 |
| **Authentication** | Clerk Identity Management with verified server tokens and MongoDB-managed roles |
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
│  ┌─────────┐  ┌──────────┐  ┌───────────┐  ┌─────────┐   │
│  │  Pages  │→ │Components│→ │Context/State│→ │  API  │   │
│  └─────────┘  └──────────┘  └───────────┘  └────┬────┘   │
│                                                  │       │
│  ┌──────────────────────────────────────────────┐│       │
│  │     Axios client (JWTs, Clerk session)       ││       │
│  └──────────────────────────────────────────┬───┘│       │
└─────────────────────────────────────────────┼────┘       │
                                              │ HTTP/REST  │
┌─────────────────────────────────────────────┼────────────┘
│                   SERVER (Express)          │          │
│  ┌────────────┐  ┌────────────┐  ┌─────────▼──────────┐│
│  │ Auth & Role│→ │ Routes     │→ │   Controllers      ││
│  │ Middleware │  │ (12 groups)│  │   (Business Logic) ││
│  └────────────┘  └────────────┘  └─────────┬──────────┘│
│                                            │           │
│  ┌─────────────────────────────────────────▼──────────┐│
│  │         Mongoose ODM (12 Models/Schemas)           ││
│  └─────────────────────────────────────────┬──────────┘│
└────────────────────────────────────────────┼───────────┘
                                             │
┌────────────────────────────────────────────▼───────────┐
│                    MongoDB Atlas                       │
│  Collections: users, properties, applications,         │
│               invoices, payments, messages, blogs      │
└────────────────────────────────────────────────────────┘
```

---

## 🔄 Rental Lifecycle Pipeline

```
  ┌────────────┐     Submit Apply     ┌─────────────┐     Generate     ┌─────────────┐     Pay bill      ┌────────────┐
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
| **Auth & Sync**| Role Select, Dashboard | 2 endpoints | Verified Clerk tokens, server-managed role sync |
| **Properties** | 6 pages / lists | 12 endpoints | CRUD, Leaflet integration, status cascades, image pipes |
| **Applications**| 4 pages | 8 endpoints | Create, Accept/Reject, early termination offsets |
| **Invoices**   | 3 views | 4 endpoints | Generation, due calculations, payment relations |
| **Payments**   | Receipts, History | 3 endpoints | Razorpay transactions, pro-rata breakdowns |
| **Conversations**| Messaging interface| 4 endpoints | Chat history, unread counters, Socket.IO channels |
| **AI Blogs**   | 5 pages / editor | 10 endpoints | CRUD, approval chains, AI text enhancers, views |
| **Admin Panel**| Diagnostic panel, users| 8 endpoints | User suspension, review requests, diagnostics |

---

## 🗄️ Database Schema

### Core Models

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

</details>

<details>
<summary><strong>Rental Applications</strong></summary>

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/applications` | List applications by role |
| POST | `/api/applications` | File new rental application |
| GET | `/api/applications/:id` | Fetch application details |
| PATCH | `/api/applications/status/:id` | Accept/Reject application |
| POST | `/api/applications/terminate/:id` | File early lease termination |

</details>

<details>
<summary><strong>Invoices & Payments</strong></summary>

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/invoices` | List invoices for tenant/manager |
| GET | `/api/invoices/:id` | Fetch specific invoice |
| POST | `/api/payments/checkout` | Initialize Razorpay checkout |
| POST | `/api/payments/verify` | Verify signature and complete payment |
| GET | `/api/payments/history` | List billing receipts history |

</details>

<details>
<summary><strong>Conversations & Socket Alerts</strong></summary>

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/messages/:userId` | Pull chat history with user |
| POST | `/api/messages` | Send message |
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
ADMIN_ACCESS_CODE=your_admin_access_code
ADMIN_SESSION_SECRET=long_random_server_secret
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
│       ├── App.jsx                   # Route configurations
│       ├── index.css                 # Global CSS styles
│       ├── api/                      # Axios clients & instances
│       ├── components/               # Navbars, Sidebars, Cards, Modals
│       ├── layouts/                  # Tenant, Manager, Admin shells
│       ├── pages/                    # Home views, editor panels, dashboards
│       └── utils/                    # Impersonation diagnostic toolsets
│
└── server/
    ├── server.js                     # Server entry point & Socket configuration
    ├── package.json
    └── src/
        ├── config/                   # DB connection setup
        ├── middleware/               # Auth guarantees & RBAC guards
        ├── models/                   # 12 Mongoose models
        ├── routes/                   # Route routing definitions
        └── controllers/              # Business controllers logic
```

---

## 👤 Author

**Nityam Savaliya**
- GitHub: [@Nityam43](https://github.com/Nityam43)

