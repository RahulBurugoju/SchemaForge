# Routing Architecture

> This document defines the official routing architecture for SchemaForge Version 2.0.

---

# Purpose

This document defines the application's routing strategy.

It specifies:

- Route hierarchy
- Public routes
- Protected routes
- Nested layouts
- Navigation flow
- Route naming conventions
- Access control

The goal is to create a scalable and maintainable routing system.

---

# Project Information

| Property | Value |
|----------|-------|
| Project | SchemaForge |
| Version | 2.0 |
| Status | Approved |
| Routing Library | React Router |
| Pattern | Nested Routing |

---

# Routing Principles

SchemaForge follows these routing principles:

- URL should describe the page.
- Related pages should share layouts.
- Protected pages require authentication.
- Route names should be readable.
- Avoid deeply nested URLs.

---

# High Level Navigation

```
Landing Page
      │
      ▼
Authentication
      │
      ▼
Dashboard
      │
      ▼
Workspace
      │
      ▼
Export Center
```

---

# Route Structure

```
/

├── login

├── register

├── dashboard

├── project/:projectId

│      ├── workspace

│      ├── export

│      └── settings

├── profile

├── settings

└── *
```

---

# Public Routes

Accessible without login.

| Route | Description |
|--------|-------------|
| / | Landing Page |
| /login | User Login |
| /register | User Registration |
| /404 | Not Found |

---

# Protected Routes

Require authentication.

| Route | Description |
|--------|-------------|
| /dashboard | Project Dashboard |
| /project/:projectId/workspace | Database Designer |
| /project/:projectId/export | Export Center |
| /project/:projectId/settings | Project Settings |
| /profile | User Profile |
| /settings | Application Settings |

---

# Route Hierarchy

```
Root Layout

│

├── Landing

├── Login

├── Register

│

└── Protected Layout

        │

        ├── Dashboard

        │

        └── Workspace Layout

                │

                ├── Workspace

                ├── Export

                └── Settings
```

---

# Layout Architecture

SchemaForge uses multiple layouts.

## Root Layout

Responsibilities

- Global Providers
- Toast Container
- Theme Provider

---

## Auth Layout

Used for

- Login
- Register

Responsibilities

- Authentication UI
- Centered Layout

---

## Dashboard Layout

Used for

- Dashboard
- Projects

Responsibilities

- Sidebar
- Header
- Navigation

---

## Workspace Layout

Used for

- Canvas
- Export
- Project Settings

Responsibilities

- Toolbar
- Explorer
- Canvas
- Inspector
- Status Bar

---

# Navigation Flow

User Journey

```
Landing

↓

Login

↓

Dashboard

↓

Create Project

↓

Workspace

↓

Design Schema

↓

Export

↓

Download
```

---

# Route Protection

Protected routes use an authentication guard.

```
User

↓

Protected Route

↓

Authenticated?

├── Yes → Render Page

└── No → Redirect Login
```

---

# Route Parameters

Project Workspace

```
/project/:projectId/workspace
```

Example

```
/project/64ab123/workspace
```

Project Export

```
/project/:projectId/export
```

---

# Route Constants

Instead of hardcoding URLs, use constants.

Example

```
ROUTES = {

HOME: "/",

LOGIN: "/login",

REGISTER: "/register",

DASHBOARD: "/dashboard"

}
```

Benefits

- Prevents typos
- Easier maintenance
- Centralized route management

---

# Breadcrumb Flow

Workspace

```
Dashboard

↓

Project

↓

Workspace
```

Export

```
Dashboard

↓

Project

↓

Export
```

---

# Error Handling

Unknown routes

↓

404 Page

Unauthorized access

↓

Redirect Login

Server failure

↓

Error Boundary

---

# Lazy Loading Strategy

Pages should be lazy loaded.

Examples

- Dashboard
- Workspace
- Export Center
- Settings

Benefits

- Faster initial load
- Better performance
- Smaller bundles

---

# Routing Best Practices

- Use nested layouts.
- Keep route components lightweight.
- Separate layouts from pages.
- Protect private routes.
- Use route constants.
- Lazy load major pages.

---

# Future Expansion

Future routes may include

```
/team

/plugins

/templates

/ai

/help
```

These should integrate without changing the existing routing structure.

---

# Routing Rules

- Every page must have a single purpose.
- Every protected page requires authentication.
- URLs should remain stable.
- Navigation should always be predictable.
- Avoid duplicate routes.

---

# Status

Approved ✅

Version

2.0

Last Updated

Day 1