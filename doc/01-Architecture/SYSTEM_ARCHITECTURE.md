# System Architecture

> This document defines the high-level architecture of SchemaForge Version 2.0.

---

# Purpose

The purpose of this document is to describe how every part of the application interacts.

It defines:

- Overall system architecture
- Frontend architecture
- Backend architecture
- Database architecture
- Export architecture
- Data flow
- Communication flow

This document serves as the architectural blueprint for the entire project.

---

# Project Information

| Property | Value |
|----------|-------|
| Project | SchemaForge |
| Version | 2.0 |
| Status | Approved |
| Architecture | Feature-Based |
| Pattern | Client–Server |

---

# High-Level Architecture

```
                   User
                     │
                     ▼
            React Frontend
                     │
             REST API (Axios)
                     │
                     ▼
            Express Backend
                     │
             Mongoose ODM
                     │
                     ▼
                MongoDB
```

---

# System Components

SchemaForge consists of five major systems.

```
Frontend

↓

Backend

↓

Database

↓

Export Engine

↓

Documentation System
```

Each system has a clear responsibility.

---

# Frontend Responsibilities

The frontend is responsible for:

- User Interface
- Canvas Rendering
- User Interaction
- State Management
- Routing
- API Communication

Technologies

- React
- Redux Toolkit
- React Router
- React Flow
- Tailwind CSS

---

# Backend Responsibilities

The backend is responsible for:

- Authentication
- Business Logic
- Project Management
- Export Generation
- Database Operations
- Validation

Technologies

- Express
- MongoDB
- Mongoose

---

# Database Responsibilities

MongoDB stores:

- Users
- Projects
- Diagrams
- Templates

MongoDB stores project data.

It does **not** store generated SQL.

Generated exports are created on demand.

---

# Internal Schema Architecture

This is the heart of SchemaForge.

Instead of directly generating SQL while designing, the application maintains an internal schema representation.

```
Canvas

↓

Internal Schema

↓

Export Engine

↓

MySQL

PostgreSQL

SQLite

MongoDB

JSON
```

This architecture allows one design to support multiple export targets.

---

# Export Engine

Each export target is isolated.

```
Export Engine

├── MySQL Generator

├── PostgreSQL Generator

├── SQLite Generator

├── MongoDB Generator

└── JSON Generator
```

Adding a new export target should not require changes to the canvas.

---

# Data Flow

User actions follow this flow.

```
User

↓

React Component

↓

Redux Action

↓

Redux Store

↓

API Request

↓

Express Controller

↓

Service

↓

Database

↓

Response

↓

Redux Store

↓

React UI
```

---

# Authentication Flow

```
Login

↓

Backend Validation

↓

JWT Generation

↓

Token Storage

↓

Authenticated Requests
```

---

# Project Flow

```
Create Project

↓

Database

↓

Dashboard

↓

Open Workspace

↓

Edit Diagram

↓

Save

↓

Export
```

---

# Canvas Flow

```
User Action

↓

Canvas

↓

Redux Store

↓

Internal Schema

↓

Canvas Update
```

---

# Save Flow

```
Workspace

↓

Internal Schema

↓

API

↓

MongoDB
```

---

# Export Flow

```
Internal Schema

↓

Generator

↓

Database Language

↓

Preview

↓

Download
```

---

# Design Principles

The architecture follows these principles:

- Single Responsibility
- Separation of Concerns
- Modular Design
- Reusability
- Scalability
- Maintainability
- Documentation First

---

# System Boundaries

Frontend

Responsible for:

- Rendering
- User Interaction
- State

Backend

Responsible for:

- Logic
- Validation
- Persistence

Database

Responsible for:

- Storage

Export Engine

Responsible for:

- Code Generation

---

# Future Expansion

The architecture supports future additions such as:

- AI-assisted schema generation
- Real-time collaboration
- Plugin system
- ORM generation
- Cloud synchronization

These features should be added without changing the core architecture.

---

# Architecture Rules

The following rules are mandatory.

- Frontend never accesses MongoDB directly.
- Business logic belongs in the backend.
- Database-specific code belongs only in the Export Engine.
- Canvas never generates SQL directly.
- Every export uses the Internal Schema.
- Redux Toolkit is the single source of truth for global state.

---

# Architecture Status

Status

Approved ✅

Version

2.0

Last Updated

Day 1