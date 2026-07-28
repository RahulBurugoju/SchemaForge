# Coding Standards

> This document defines the official coding standards for SchemaForge Version 2.0.

---

# Purpose

This document establishes the coding standards for the entire project.

Its objectives are to:

- Maintain consistency
- Improve readability
- Simplify maintenance
- Reduce bugs
- Improve collaboration
- Make AI-assisted development predictable

Every source file should follow these standards.

---

# Project Information

| Property | Value |
|----------|-------|
| Project | SchemaForge |
| Version | 2.0 |
| Status | Approved |

---

# General Principles

Every piece of code should be:

- Readable
- Reusable
- Predictable
- Testable
- Scalable
- Documented

Code is written for humans first, computers second.

---

# Folder Organization

Organize code by feature.

Example

```
features/

authentication/

dashboard/

workspace/

tables/

relationships/
```

Avoid creating folders with unclear purposes.

---

# File Naming

## React Components

Use PascalCase.

✅

```
ProjectCard.jsx

ExportModal.jsx

WorkspaceToolbar.jsx
```

❌

```
projectCard.jsx

project_card.jsx

PROJECTCARD.jsx
```

---

## Hooks

Use camelCase and begin with "use".

✅

```
useProjects.js

useCanvas.js

useKeyboardShortcuts.js
```

---

## Redux Files

Use camelCase.

```
authSlice.js

workspaceSlice.js

tableSlice.js
```

---

## Services

```
AuthService.js

ProjectService.js

ExportService.js
```

---

## Utility Files

```
dateFormatter.js

downloadFile.js

generateId.js
```

---

# Component Standards

Each component should have a single responsibility.

Preferred structure

```
function ProjectCard() {

    ...

    return (...)

}

export default ProjectCard;
```

Avoid components larger than approximately 300 lines.

If a component becomes too large:

- Extract smaller components.
- Move logic into custom hooks.
- Move reusable functions into utilities.

---

# Props Guidelines

Pass only the required props.

Avoid prop drilling through many levels.

When state must be shared globally, use Redux Toolkit.

---

# React Standards

Prefer:

- Functional Components
- React Hooks
- Composition over inheritance

Avoid:

- Class Components
- Direct DOM manipulation
- Unnecessary re-renders

---

# State Management Rules

## Local State

Use

```
useState()

useReducer()
```

Examples

- Modal visibility
- Form input
- Dropdown state

---

## Global State

Use Redux Toolkit.

Examples

- User
- Projects
- Tables
- Relationships
- Export settings

---

# Redux Standards

Each slice should contain:

```
Initial State

Reducers

Actions

Selectors
```

Avoid putting business logic inside components.

---

# API Standards

Components should never call Axios directly.

Correct flow

```
Component

↓

Redux Action

↓

Service

↓

API

↓

Backend
```

This keeps components clean and easier to test.

---

# Backend Standards

Controllers should:

- Receive request
- Validate input
- Call service
- Return response

Controllers should not contain complex business logic.

Business logic belongs in services.

---

# Database Standards

Each model should represent a single entity.

Example

```
User

Project

Table

Relationship
```

Avoid storing unrelated data in the same document.

---

# Error Handling

Never ignore errors.

Every async function should use:

```
try {

}

catch {

}
```

or the project's async error handler.

Always return meaningful error messages.

---

# Async/Await

Always prefer

```
async/await
```

Avoid deeply nested Promise chains.

---

# Import Order

Follow this order.

```
1. React

2. Third-party packages

3. Internal modules

4. Components

5. Hooks

6. Utilities

7. Styles
```

Example

```javascript
import React from "react";

import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import ProjectCard from "../components/ProjectCard";

import useProjects from "../hooks/useProjects";

import { formatDate } from "../utils/dateFormatter";

import "./Dashboard.css";
```

---

# Comments

Write comments only when they explain **why**, not **what**.

Good

```javascript
// Cache schema to avoid unnecessary regeneration
```

Avoid

```javascript
// Increment i
i++;
```

The code already explains that.

---

# Constants

Avoid magic values.

Instead of

```javascript
if (zoom > 1.5)
```

Prefer

```javascript
const MAX_ZOOM = 1.5;

if (zoom > MAX_ZOOM)
```

---

# Environment Variables

Never hardcode:

- API URLs
- Secrets
- Tokens
- Keys

Always use environment variables.

---

# Documentation Rule

Every major feature must update:

- Feature documentation
- Sprint documentation
- AI Context
- Project status

Code without documentation is considered incomplete.

---

# Git Commit Convention

Use clear commit messages.

Examples

```
feat(auth): implement JWT authentication

fix(export): resolve PostgreSQL generator issue

refactor(canvas): simplify node rendering

docs(roadmap): update sprint timeline
```

Avoid messages like

```
update

fix

changes

done

final
```

---

# Pull Request Checklist

Before merging:

- Code compiles
- No console errors
- Documentation updated
- No unused imports
- No dead code
- Naming conventions followed
- Feature tested

---

# Performance Guidelines

- Avoid unnecessary renders.
- Memoize expensive calculations.
- Lazy load large pages.
- Keep Redux state normalized.
- Avoid duplicate API requests.

---

# Security Guidelines

- Validate all user input.
- Sanitize data before saving.
- Hash passwords.
- Never expose secrets.
- Verify JWT on protected routes.
- Implement proper authorization checks.

---

# Definition of Clean Code

Clean code should:

- Be easy to read
- Be easy to modify
- Have minimal duplication
- Follow naming conventions
- Be logically organized
- Have a single responsibility

---

# Coding Rules Summary

- One responsibility per file.
- One responsibility per component.
- Keep functions small.
- Prefer composition.
- Prefer reusable code.
- Keep business logic out of UI.
- Document architectural decisions.
- Follow feature-based organization.

---

# Status

Approved ✅

Version

2.0

Last Updated

Day 1