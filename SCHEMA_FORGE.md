# SchemaForge 🛠️⚡

**SchemaForge** is a full-stack, visual database schema design, entity-relationship (ER) modeling, and multi-database code generation platform. It empowers developers, data architects, and software engineers to visually model database schemas on an intuitive drag-and-drop canvas and instantly export production-ready DDL (Data Definition Language) scripts or ODM schemas for popular SQL and NoSQL database engines.

---

## 🚀 Key Features

- **🎨 Interactive Visual Canvas**: Built on `@xyflow/react` (React Flow v12), enabling smooth table creation, field manipulation, pan & zoom, custom node rendering, and dynamic connection edges.
- **⚡ Multi-Database Code Generation Engine (`exportENG`)**: Convert visual ER diagrams on the fly into clean, formatted DDL scripts or ODM models for:
  - **PostgreSQL** (Data types, Foreign Keys, Indexing, Constraints)
  - **MySQL** (Data types, AUTO_INCREMENT, FK Constraints, Engine options)
  - **SQLite** (Embedded SQL constraints, PRAGMA foreign_keys, type mapping)
  - **Microsoft SQL Server** (MSSQL T-SQL DDL syntax, IDENTITY, FKs)
  - **MongoDB / Mongoose ODM** (Mongoose Schema definitions, field types, ref populations)
- **🔍 Real-Time Schema Inspector & Explorer**:
  - Edit table names, column data types, primary keys, nullability, default values, auto-increments, and unique constraints.
  - Configure foreign keys and relationship cardinalities (**1:1**, **1:N**, **N:M**) with real-time visual feedback.
  - Search and navigate tables via the Explorer Panel.
- **💾 Automatic Cloud Persistence & Auto-Save**: Seamlessly saves canvas state (nodes, edges, viewport position) to a MongoDB backend using custom React auto-save hooks (`useAutoSave`).
- **🛡️ Secure Authentication & Profile Management**: JWT-based authentication with HttpOnly cookies (`accessToken` & `refreshToken`), password hashing via `bcrypt`, session refresh flow, and user profile management.
- **📥 Code Export & Validation**: Built-in AST-like schema validator (`validateSchema`) that verifies schema integrity, table references, and column types before generating downloadable SQL/Mongoose scripts or raw JSON configurations.

---

## 📐 Technology Stack

### **Frontend (`/client`)**
| Tech | Purpose |
| :--- | :--- |
| **React 19** | Modern UI view layer |
| **Vite 8** | High-performance build tool and dev server |
| **Tailwind CSS v4** | Utility-first styling framework with modern dark theme |
| **@xyflow/react (React Flow v12)** | Interactive node-based ERD canvas rendering |
| **Redux Toolkit & React-Redux** | Global state management (`auth`, `project`, `canvas`) |
| **React Router v7** | Single Page Application (SPA) client-side routing |
| **Lucide React** | Modern iconography |
| **Axios** | HTTP client for backend REST API calls |

### **Backend (`/server`)**
| Tech | Purpose |
| :--- | :--- |
| **Node.js & Express 5** | High-performance backend web server framework |
| **MongoDB & Mongoose 9** | NoSQL database & ODM for storing users and project canvas state |
| **JSONWebToken (JWT)** | Token-based authentication (Access & Refresh tokens) |
| **Bcrypt** | Secure password hashing |
| **Cookie-Parser & CORS** | Secure cookie handling and cross-origin resource sharing |

---

## 📁 Repository Structure

```
SchemaForge/
├── client/                     # React + Vite Frontend Application
│   ├── public/                 # Static public assets
│   └── src/
│       ├── app/                # Redux Store Configuration (`store.js`)
│       ├── components/         # React Components
│       │   ├── auth/           # Login / Register Form Components
│       │   ├── common/         # Buttons, Inputs, Loaders, UI wrappers
│       │   ├── dashboard/      # Project Cards & Grid views
│       │   ├── export/         # Code Viewer, Database Selector, Preview Modals
│       │   ├── modal/          # Reusable Modal dialogs
│       │   ├── project/        # Create/Edit project components
│       │   └── workspace/      # ERD Canvas, Explorer, Inspector & Toolbar
│       │       ├── canvas/     # TableNode, ColumnItem, TableHeader
│       │       └── edges/      # Relationship connection lines
│       ├── constants/          # Global UI & app constants
│       ├── exportENG/          # Core Code Generation Engine
│       │   ├── generators/     # Dialect Generators (MySQL, PostgreSQL, SQLite, SQLServer, MongoDB)
│       │   └── helpers/        # Identifier escaping, formatters, schema validators
│       ├── features/           # Redux Slices & Async Thunks (`auth`, `project`, `canvas`)
│       ├── hooks/              # Custom Hooks (`useCanvas`, `useAutoSave`, `useExport`)
│       ├── layouts/            # Page & Workspace Root Layouts
│       ├── pages/              # Landing, Dashboard, Workspace, Export, Profile pages
│       ├── routes/             # App Router, Protected & Public Route guards
│       ├── services/           # API integration services (`auth`, `project`, `export`)
│       └── utils/              # Canvas restoration, clipboard, download helpers
└── server/                     # Node.js + Express + Mongoose Backend
    ├── config/                 # DB Connection setup (`db.js`)
    ├── controllers/            # Controller logic (`auth.controller.js`, `project.controllers.js`)
    ├── middlewares/            # Auth guard (`auth.middleware.js`), Error handling, 404 handler
    ├── models/                 # Mongoose Models (`user.model.js`, `project.model.js`)
    ├── routes/                 # API Routes (`auth.route.js`, `project.route.js`)
    ├── services/               # Core Business Logic (`auth.service.js`, `project.service.js`)
    ├── utils/                  # `ApiError`, `ApiResponse`, `asyncHandler` helpers
    └── app.js & server.js      # Express app setup and server entry point
```

---

## ⚡ Export Engine (`exportENG`)

At the heart of SchemaForge is its extensible client-side Code Generation Engine (`exportENG`).

1. **Schema Validation**: Checks canvas nodes for missing table names, duplicate column names, unselected data types, or invalid foreign key linkages.
2. **Dependency Sorting**: Resolves table dependencies so created SQL tables follow foreign key constraints order (`sortTables`).
3. **Dialect Generators**:
   - `mysql`: Generates `CREATE TABLE` syntax, engine declarations (`ENGINE=InnoDB`), indexes, and `ALTER TABLE ADD CONSTRAINT` foreign keys.
   - `postgresql`: Generates `CREATE TABLE` with PostgreSQL data types, `REFERENCES`, and constraint rules.
   - `sqlite`: Outputs SQLite-compatible DDL handling embedded table constraints.
   - `sqlserver`: Outputs T-SQL syntax with `IDENTITY(1,1)` and brackets `[...]` for identifier escaping.
   - `mongodb`: Generates complete JavaScript ES Module files importing `mongoose` with `new mongoose.Schema({...})` definitions.

---

## 🗄️ Database Models Overview

### **User Model (`server/models/user.model.js`)**
- `userName`: String (Required, Unique, Lowercase)
- `email`: String (Required, Unique, Lowercase)
- `fullName`: String (Required)
- `password`: Hashed String (Required)
- `refreshToken`: String (JWT Refresh Token)

### **Project Model (`server/models/project.model.js`)**
- `projectName`: String (Required)
- `description`: String
- `owner`: ObjectId (Reference to `User`)
- `databaseType`: Enum (`"mysql"`, `"postgresql"`, `"mongodb"`, `"sqlite"`, `"sqlserver"`)
- `canvasData`: Object
  - `nodes`: Array (Table definitions, columns, canvas positions)
  - `edges`: Array (Relationship links, foreign keys, cardinality)
  - `viewport`: `{ x, y, zoom }`
- `isArchived`: Boolean

---

## 🔌 API Endpoints Summary

### **Authentication (`/api/v1/auth`)**
- `POST /register` – Create a new user account.
- `POST /login` – Authenticate user and issue HttpOnly access & refresh cookies.
- `POST /refresh-token` – Renew access token using refresh token.
- `POST /logout` – Clear auth cookies and invalidate refresh token.
- `GET /me` – Retrieve current user profile (Protected).
- `PUT /update-profile` – Update profile details (Protected).

### **Projects (`/api/v1/projects`)**
- `POST /` – Create a new schema design project (Protected).
- `GET /` – Fetch all projects for the logged-in user (Protected).
- `GET /:id` – Fetch a specific project by ID (Protected).
- `PUT /:id` – Update project details & canvas state (Protected).
- `DELETE /:id` – Delete a project by ID (Protected).

---

## ⚙️ Local Development Setup

### 1. Prerequisites
- **Node.js**: v18+ installed
- **MongoDB**: Local instance running or MongoDB Atlas Connection URI

### 2. Backend Setup
```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory:
```env
PORT=8000
MONGODB_URI=mongodb://localhost:27017/schemaforge
CORS_ORIGIN=http://localhost:5173
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=10d
NODE_ENV=development
```

Start the backend server:
```bash
npm run server
```

### 3. Frontend Setup
```bash
cd client
npm install
```

Start Vite development server:
```bash
npm run dev
```

Open `http://localhost:5173` in your browser to start building database schemas! 🚀
