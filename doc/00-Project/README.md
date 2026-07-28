# SchemaForge

> A modern visual database modeling platform that allows developers to design database schemas visually and export them to multiple database technologies from a single source of truth.

---

# Project Overview

SchemaForge is a full-stack web application that enables developers to visually create database schemas using a drag-and-drop interface. Instead of manually writing SQL or NoSQL schema definitions, users can design their database visually and generate production-ready code for multiple database systems.

The application is designed to be database-independent by maintaining an internal schema model. Export engines transform this internal representation into technology-specific outputs.

---

# Project Objectives

- Build an intuitive visual database designer.
- Support multiple database technologies.
- Maintain a single internal schema representation.
- Provide clean and extensible architecture.
- Demonstrate enterprise-level software engineering practices.
- Serve as a flagship portfolio project.

---

# Core Features

- User Authentication
- Project Dashboard
- Visual Canvas
- Table Designer
- Relationship Designer
- Property Inspector
- Multi-Database Export
- Import Existing Schemas
- Auto Save
- Undo / Redo
- Project Templates
- Keyboard Shortcuts

---

# Supported Export Targets

## SQL

- MySQL
- PostgreSQL
- SQLite

## NoSQL

- MongoDB (Mongoose)

## Generic

- JSON

Future versions may include:

- Prisma
- Drizzle ORM
- TypeORM
- Sequelize
- SQL Server

---

# Development Philosophy

This project follows professional software engineering practices.

Every feature must include:

- Documentation
- Implementation
- Testing
- Code Review
- Sprint Review

No feature is considered complete until all documentation has been updated.

---

# Documentation Structure

```
doc/

00-Project/
01-Architecture/
02-Sprints/
03-Backend/
04-Frontend/
05-Database/
06-Export-Engine/
07-UI-UX/
08-Decisions/
09-AI-Context/
10-Meeting-Notes/
11-Templates/
```

---

# Project Workflow

```
Plan
    ↓
Document
    ↓
Develop
    ↓
Test
    ↓
Review
    ↓
Update Documentation
    ↓
Commit
    ↓
Next Sprint
```

---

# Technology Stack

Frontend

- React
- Redux Toolkit
- React Router
- React Flow
- Tailwind CSS

Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

Future Services

- Cloudinary
- JWT Authentication

---

# Current Status

Current Phase

Project Documentation

Current Sprint

Sprint 00A

Status

🟡 In Progress

---

# Repository Structure

```
client/
server/
doc/
```

---

# Documentation Rule

Documentation is treated as part of the source code.

Every sprint updates:

- Documentation
- AI Context
- Sprint Progress
- Project Status

---

# License

This project is being developed as an educational and portfolio project.

---

Last Updated

Day 1