# Technology Stack

> This document defines the official technology stack for SchemaForge Version 2.0.

---

# Purpose

This document serves as the single source of truth for all technologies used throughout the project.

It defines:

- Programming languages
- Frontend technologies
- Backend technologies
- Development tools
- Libraries
- Project architecture

No technology should be introduced into the project without first updating this document.

---

# Project Information

| Property | Value |
|----------|-------|
| Project | SchemaForge |
| Version | 2.0 |
| Status | Approved |
| Development Method | Sprint-Based Development |
| Architecture | Feature-Based Architecture |

---

# Frontend Stack

## Core Framework

| Technology | Purpose |
|------------|---------|
| React | User Interface |
| Vite | Development Environment |

---

## Styling

| Technology | Purpose |
|------------|---------|
| Tailwind CSS | UI Styling |

---

## Routing

| Technology | Purpose |
|------------|---------|
| React Router | Client-side Routing |

---

## State Management

| Technology | Purpose |
|------------|---------|
| Redux Toolkit | Global State Management |
| React Redux | React Integration |

---

## Canvas & Visualization

| Technology | Purpose |
|------------|---------|
| React Flow | Interactive Canvas |

---

## Icons

| Technology | Purpose |
|------------|---------|
| Lucide React | Icon Library |

---

## HTTP Client

| Technology | Purpose |
|------------|---------|
| Axios | API Communication |

---

# Backend Stack

## Runtime

| Technology | Purpose |
|------------|---------|
| Node.js | JavaScript Runtime |

---

## Framework

| Technology | Purpose |
|------------|---------|
| Express.js | REST API Development |

---

## Database

| Technology | Purpose |
|------------|---------|
| MongoDB | Database |
| Mongoose | ODM |

---

## Authentication

| Technology | Purpose |
|------------|---------|
| JWT | Authentication |
| bcrypt | Password Hashing |

---

## File Upload

| Technology | Purpose |
|------------|---------|
| Multer | File Upload Middleware |

---

## Cloud Storage

| Technology | Purpose |
|------------|---------|
| Cloudinary | Asset Storage |

---

# Development Tools

| Tool | Purpose |
|------|---------|
| Git | Version Control |
| GitHub | Repository Hosting |
| VS Code | Development Environment |
| Postman | API Testing |

---

# Documentation

Project documentation is maintained using Markdown.

Documentation includes:

- Project
- Architecture
- Backend
- Frontend
- Database
- Export Engine
- Sprint Tracking
- AI Context

---

# Supported Export Targets

Version 2.0 supports exporting to:

- MySQL
- PostgreSQL
- SQLite
- MongoDB (Mongoose)
- JSON

Future versions may include:

- Prisma
- Drizzle ORM
- Sequelize
- TypeORM

---

# Development Principles

The project follows:

- Feature-Based Architecture
- Component Reusability
- Documentation-First Development
- Sprint-Based Development
- Modular Design
- Clean Code Principles

---

# Technologies Considered but Not Selected

| Technology | Reason |
|------------|--------|
| Zustand | Redux Toolkit better suits project scale and interview preparation |
| Next.js | A client/server separation with React + Express better aligns with project goals |
| Firebase | Custom backend required for learning and flexibility |

---

# Dependency Installation Policy

Dependencies should be installed only when required by the current sprint.

Avoid installing unnecessary packages early in development.

---

# Technology Change Policy

Technology changes are allowed only when:

- A critical limitation is discovered.
- A security issue requires replacement.
- A major architectural decision is approved.

Changing technologies for personal preference is discouraged once development begins.

---

# Approved Stack Summary

Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Redux Toolkit
- React Flow
- Axios
- Lucide React

Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Multer
- Cloudinary

Development

- Git
- GitHub
- VS Code
- Postman

---

Status

Approved ✅

Version

2.0

Last Updated

Day 1