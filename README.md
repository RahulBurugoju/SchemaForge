# ⚡ SchemaForge — Visual Database Modeling & DDL Generator

SchemaForge is a powerful, full-stack visual database modeling platform and DDL code generator built for modern developers, software architects, and database engineers. Design interactive entity-relationship (ER) diagrams and collections visually, define fields, types, constraints, and relationships, and instantly generate production-ready DDL scripts and ODM schemas across 5 major database engines.

---

## 🌟 Key Features

- 🎨 **Interactive Visual ER Canvas**:
  - Drag-and-drop table and collection node creation using `@xyflow/react` (React Flow).
  - Define fields, data types, primary keys, foreign keys, auto-increments, unique constraints, and nullable attributes.
  - Establish visual relationships: **1:1**, **1:N**, and **N:M** connections between tables.
  - Interactive canvas controls: zoom, pan, grid view, mini-map, and auto-layout options.

- ⚙️ **Multi-Database DDL & ODM Generator**:
  - **MySQL**: Full SQL `CREATE TABLE` DDL generation with foreign key constraints, indexes, and primary key definitions.
  - **PostgreSQL**: Postgres-specific DDL syntax with `SERIAL` auto-incrementing keys and relational constraints.
  - **MongoDB**: Generates production-ready Mongoose JavaScript models and schemas.
  - **SQLite**: Lightweight SQL definitions tailored for embedded and client-side database deployments.
  - **SQL Server (T-SQL)**: Standard T-SQL statements with `IDENTITY` columns and constraint blocks.

- 📁 **Project Dashboard & Workspace**:
  - Create, manage, duplicate, archive, and delete data modeling projects.
  - Persistent canvas state (nodes, edges, viewport settings) stored securely in MongoDB.
  - Search, filter, and switch active database types dynamically per project.

- 📐 **Pre-configured Architecture Templates**:
  - **Blank Schema**: Fresh canvas for custom schema creation.
  - **E-Commerce System**: Users, Products, Orders, Categories, Cart Items, and Payment records.
  - **Social Network**: User profiles, Posts, Comments, Likes, and Follower relationships.
  - **YouTube Backend Infrastructure**: Users, Videos, Playlists, Channels, Subscriptions, and Comments.
  - **School Management System**: Students, Teachers, Courses, Classes, and Enrollment records.
  - **Hospital Management System**: Patients, Doctors, Appointments, Departments, and Prescriptions.
  - **Blog / CMS**: Authors, Posts, Tags, Categories, and Comments.

- 🔒 **Full Stack Authentication & Security**:
  - JWT Authentication using dual Access and Refresh Token flow.
  - Secure storage with HTTP-only cookies and bcrypt password hashing.
  - Centralized error handling and standard API responses (`ApiResponse`, `ApiError`).

---

## 🛠️ Tech Stack

### **Frontend (`/client`)**
- **Framework & Build Tool**: React 19, Vite 8
- **State Management**: Redux Toolkit (`@reduxjs/toolkit`), React Redux
- **Routing**: React Router v7 (`react-router-dom`)
- **Canvas Rendering**: `@xyflow/react` (React Flow)
- **Styling & UI**: Tailwind CSS v4, Lucide React Icons
- **HTTP Client**: Axios

### **Backend (`/server`)**
- **Runtime & Framework**: Node.js, Express 5
- **Database**: MongoDB with Mongoose 9
- **Authentication**: JSON Web Token (`jsonwebtoken`), `bcrypt`
- **FileUpload & Storage**: Multer, Cloudinary
- **Middleware & Security**: `cors`, `cookie-parser`, `dotenv`

---

## 📂 Project Architecture

```
DModeling_codeBase/
├── client/                      # Frontend Application (React + Vite)
│   ├── src/
│   │   ├── app/                 # Redux Store Configuration
│   │   ├── components/          # Reusable UI Components
│   │   │   ├── auth/            # Auth modal & form components
│   │   │   ├── dashboard/       # Project cards, header, search filters
│   │   │   ├── export/          # Export modal, syntax preview, action buttons
│   │   │   └── workspace/       # Explorer panel, Inspector panel, Toolbar, Canvas
│   │   ├── constants/           # Database types & relationship definitions
│   │   ├── exportENG/           # Code Generation Engine
│   │   │   ├── generators/      # MySQL, PostgreSQL, MongoDB, SQLite, SQL Server generators
│   │   │   └── helpers/         # Schema validation helpers
│   │   ├── features/            # Redux Slices & Async Thunks (auth, canvas, project, templates)
│   │   ├── hooks/               # Custom React hooks (useExport, useCanvas, etc.)
│   │   ├── pages/               # LandingPage, DashboardPage, WorkspacePage, ExportPage, ProfilePage
│   │   ├── routes/              # App router & protected routes
│   │   └── services/            # Axios API service callers
│   ├── package.json
│   └── vite.config.js
│
├── server/                      # Backend REST API (Node.js + Express)
│   ├── config/                  # Database connection setup (Mongoose)
│   ├── controllers/             # Request handlers (auth.controller.js, project.controllers.js)
│   ├── middlewares/             # Auth JWT verification, Error handling, 404 middleware
│   ├── models/                  # Mongoose Schemas (user.model.js, project.model.js)
│   ├── routes/                  # Express routes (auth.route.js, project.route.js)
│   ├── services/                # Business logic & Database queries
│   ├── utils/                   # ApiError, ApiResponse, asyncHandler helpers
│   ├── validators/              # Input validation rules
│   ├── app.js                   # Express application setup
│   ├── server.js                # Server entry point
│   └── package.json
└── README.md
```

---

## ⚙️ Environment Variables

### **Server Environment (`server/.env`)**

Create a `.env` file inside the `server/` directory:

```env
PORT=8000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net
DB_NAME=schemaforge
CORS_ORIGIN=http://localhost:5173
ACCESS_TOKEN_SECRET=your_access_token_secret_key
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_refresh_token_secret_key
REFRESH_TOKEN_EXPIRY=10d
```

### **Client Environment (`client/.env`)**

Create a `.env` file inside the `client/` directory:

```env
VITE_API_URL=http://localhost:8000/api/v1
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js** (v18.x or higher recommended)
- **npm** (v9.x or higher)
- **MongoDB** (Local instance or MongoDB Atlas URI)

---

### 📥 Step 1: Clone the Repository

```bash
git clone https://github.com/RahulBurugoju/SchemaForge.git
cd DModeling_codeBase
```

---

### 🖥️ Step 2: Setup and Start the Backend Server

1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables in `server/.env` (refer to [Environment Variables](#-environment-variables)).
4. Start the server in development mode:
   ```bash
   npm run server
   ```
   *The backend server will run on `http://localhost:8000` (or specified `PORT`).*

---

### 💻 Step 3: Setup and Start the Frontend Application

1. Open a new terminal window and navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables in `client/.env`.
4. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The client app will run on `http://localhost:5173`.*

---

## 📡 API Endpoints Reference

### **Authentication Routes (`/api/v1/auth`)**

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/v1/auth/register` | Register a new user | ❌ |
| `POST` | `/api/v1/auth/login` | Log in user and set JWT cookies | ❌ |
| `GET` | `/api/v1/auth/me` | Fetch current logged-in user profile | ✅ |
| `PATCH` | `/api/v1/auth/profile` | Update user details / profile | ✅ |
| `POST` | `/api/v1/auth/logout` | Logout user & invalidate refresh token | ✅ |
| `POST` | `/api/v1/auth/refresh-token` | Refresh Access Token using Refresh Token | ❌ |

---

### **Project & Canvas Routes (`/api/v1/projects`)**

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/v1/projects/create-project` | Create a new modeling project | ✅ |
| `GET` | `/api/v1/projects/get-projects` | Retrieve all projects owned by user | ✅ |
| `GET` | `/api/v1/projects/get-project/:id` | Get project by ID (includes canvas data) | ✅ |
| `PATCH` | `/api/v1/projects/update-project/:id` | Save/Update project & canvas layout | ✅ |
| `DELETE` | `/api/v1/projects/delete-project/:id` | Delete project by ID | ✅ |

---

## 📄 Export Engine Code Generation

SchemaForge features an extensible export engine capable of parsing visual nodes and edge relationships into standard database schemas:

- **SQL Dialects** (`MySQL`, `PostgreSQL`, `SQLite`, `SQL Server`):
  - Converts table nodes to `CREATE TABLE` queries.
  - Automatically translates data types (e.g., `VARCHAR`, `INTEGER`, `BOOLEAN`, `TIMESTAMP`, `SERIAL`).
  - Formats primary key definitions and foreign key constraints based on visual relationships.
- **MongoDB / Mongoose**:
  - Generates Mongoose schema files (`new mongoose.Schema({...})`).
  - Infers embedded schemas or reference references (`mongoose.Schema.Types.ObjectId`).
- **JSON Schema**:
  - Exports complete visual graph state (nodes, edges, positions, configurations) for seamless backup and re-import.

---

## 🤝 Contributing

Contributions are welcome! If you'd like to improve SchemaForge:

1. **Fork** the Repository.
2. Create a new Feature Branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the Branch: `git push origin feature/AmazingFeature`
5. Open a **Pull Request**.

---

## 📜 License

Distributed under the **ISC License**. See `LICENSE` for more details.
