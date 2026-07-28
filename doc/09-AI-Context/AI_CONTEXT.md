# AI Context

> This document provides the complete technical and project context required for any AI assistant working on SchemaForge.

---

# Purpose

This document acts as the onboarding guide for AI assistants.

Before generating code, reviewing architecture, or suggesting changes, every AI should read this document to understand the project's goals, architecture, standards, and current progress.

This document should be updated whenever major architectural or planning decisions are made.

---

# Project Overview

Project Name

SchemaForge

Version

2.0

Project Type

Full Stack Web Application

Primary Goal

Build a professional visual database modeling platform capable of exporting schemas to multiple database technologies from a single internal schema representation.

---

# Core Concept

The application allows users to visually design database schemas.

Instead of generating SQL directly, SchemaForge maintains an Internal Schema Model.

All export engines generate output from this internal model.

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

This architecture is one of the project's most important design decisions.

---

# Technology Stack

Frontend

- React
- Redux Toolkit
- React Router
- React Flow
- Tailwind CSS
- Axios

Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Cloudinary

Development

- Git
- GitHub
- VS Code
- Postman

---

# Architecture Summary

Frontend

Responsible for

- UI
- Routing
- State
- Canvas
- User Interaction

Backend

Responsible for

- Authentication
- Business Logic
- Export Engine
- Database Access

Database

Stores

- Users
- Projects
- Diagrams
- Templates

Export Engine

Converts the Internal Schema into database-specific outputs.

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

# Development Methodology

SchemaForge follows Sprint-Based Development.

Each sprint includes:

1. Planning
2. Documentation
3. Development
4. Testing
5. Documentation Update
6. Git Commit

---

# Current Development Phase

Current Phase

Sprint 00A

Current Focus

Documentation System

Status

In Progress

---

# Completed Documents

Project

- README
- VISION
- FEATURES
- ROADMAP
- TECH_STACK

Architecture

- SYSTEM_ARCHITECTURE
- FOLDER_STRUCTURE
- STATE_MANAGEMENT
- ROUTING
- CODING_STANDARDS

---

# Pending Documents

AI Context

- AI_RULES.md
- PROJECT_STATUS.md
- CURRENT_SPRINT.md

Sprint

- SPRINT_00A.md

---

# Architecture Decisions

The following decisions are finalized.

## Frontend

- React
- Redux Toolkit
- React Router

---

## Backend

- Express.js
- MongoDB
- Mongoose

---

## State Management

Redux Toolkit is the only global state solution.

---

## Export System

Every export target uses the Internal Schema.

The canvas never generates SQL directly.

---

## Folder Structure

Feature-Based Architecture.

---

## Development

Documentation-first development.

---

# Coding Principles

- Single Responsibility Principle
- Feature-Based Organization
- Clean Architecture
- Modular Design
- Reusable Components
- Predictable State Management

---

# AI Responsibilities

When assisting with this project, the AI should:

- Follow approved architecture.
- Respect coding standards.
- Avoid introducing unapproved libraries.
- Keep code modular.
- Update documentation when features change.
- Explain architectural decisions when appropriate.

---

# Things AI Must Never Do

- Change the architecture without approval.
- Introduce new dependencies without justification.
- Ignore coding standards.
- Generate undocumented features.
- Break the feature-based folder structure.
- Suggest replacing Redux Toolkit.

---

# Definition of Success

An AI response is considered successful if it:

- Aligns with project architecture.
- Produces maintainable code.
- Preserves consistency.
- Follows project documentation.
- Keeps future scalability in mind.

---

# Last Updated

Day 1