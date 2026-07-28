# Folder Structure

> This document defines the official folder structure for SchemaForge Version 2.0.

---

# Purpose

The folder structure provides a consistent organization for the entire codebase.

Its goals are to:

- Improve maintainability
- Improve scalability
- Make navigation easier
- Reduce code duplication
- Keep related code together

Every contributor should follow this structure.

---

# Project Structure

```
SchemaForge/

├── client/
├── server/
└── doc/
```

Each directory has a single responsibility.

---

# Client

The client contains the complete frontend application.

```
client/

src/

public/

package.json

vite.config.js
```

---

# Client Source Structure

```
src/

app/

assets/

components/

constants/

features/

hooks/

layouts/

pages/

routes/

services/

styles/

utils/

App.jsx

main.jsx
```

---

# Directory Responsibilities

## app/

Application configuration.

Contains:

- Redux Store
- Global Providers
- App Configuration

---

## assets/

Static assets.

Examples

- Images
- Icons
- Fonts
- SVG Files

---

## components/

Reusable UI components.

Examples

- Buttons
- Inputs
- Modals
- Cards
- Dialogs

Components in this folder should be reusable across multiple features.

---

## constants/

Application constants.

Examples

- Routes
- Colors
- Export Types
- Default Values
- Configuration Constants

---

## features/

The heart of the frontend.

Each feature owns its:

- Components
- Redux Slice
- Hooks
- Services
- Utilities

Example

```
features/

authentication/

dashboard/

workspace/

canvas/

tables/

relationships/

export/

settings/
```

This project follows Feature-Based Architecture.

---

## hooks/

Reusable custom hooks.

Examples

```
useDebounce()

useOutsideClick()

useLocalStorage()
```

Feature-specific hooks should remain inside their respective feature folder.

---

## layouts/

Application layouts.

Examples

```
AuthLayout

DashboardLayout

WorkspaceLayout
```

---

## pages/

Route-level pages.

Examples

```
Login

Register

Dashboard

Workspace

Settings
```

Pages should assemble components rather than contain complex business logic.

---

## routes/

Routing configuration.

Examples

```
AppRouter

ProtectedRoute

Route Constants
```

---

## services/

API communication.

Responsibilities

- Axios Configuration
- API Clients
- HTTP Utilities

Business logic should not be placed here.

---

## styles/

Global styling.

Examples

```
globals.css

variables.css

animations.css
```

---

## utils/

Reusable helper functions.

Examples

```
formatDate()

generateId()

downloadFile()

copyToClipboard()
```

Utilities should be pure functions without UI dependencies.

---

# Backend Structure

```
server/

src/

package.json

.env

server.js
```

---

# Backend Source Structure

```
src/

config/

controllers/

middlewares/

models/

routes/

services/

utils/

validators/

app.js
```

---

# Backend Directory Responsibilities

## config/

Application configuration.

Examples

- Database
- Environment
- Cloudinary

---

## controllers/

Request handlers.

Responsibilities

- Receive Request
- Validate Input
- Call Service
- Return Response

Controllers should remain thin.

---

## middlewares/

Express middleware.

Examples

- Authentication
- Error Handling
- Validation
- Logging

---

## models/

Database models.

Contains

- Mongoose Schemas

Models should not contain business logic.

---

## routes/

Application endpoints.

Each route file should represent one resource.

Example

```
auth.routes.js

project.routes.js

export.routes.js
```

---

## services/

Business logic.

Examples

- Authentication Service
- Export Service
- Project Service

Complex logic belongs here.

---

## utils/

Reusable helper functions.

Examples

- Token Utilities
- File Helpers
- Response Helpers

---

## validators/

Input validation.

Examples

- Login Validation
- Registration Validation
- Project Validation

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

# Folder Organization Rules

## Rule 1

Organize by feature instead of file type whenever possible.

---

## Rule 2

Keep files small.

A file should have one responsibility.

---

## Rule 3

Avoid deep nesting.

Prefer

```
feature/components/TableCard.jsx
```

instead of

```
feature/ui/components/cards/table/TableCard.jsx
```

---

## Rule 4

Shared code belongs in shared folders.

Feature-specific code stays inside the feature.

---

## Rule 5

Business logic belongs in services.

UI logic belongs in components.

State belongs in Redux.

Persistence belongs in the backend.

---

# Naming Conventions

Folders

```
authentication

dashboard

workspace
```

Files

```
LoginPage.jsx

ProjectCard.jsx

AuthService.js

workspaceSlice.js
```

Components

PascalCase

```
ProjectCard.jsx
```

Hooks

camelCase

```
useProjects.js
```

Redux Slices

camelCase

```
authSlice.js

projectSlice.js
```

---

# Files That Should Never Exist

Avoid folders such as

```
misc/

temp/

new/

random/

test2/

copy/
```

Every folder should have a clear purpose.

---

# Future Expansion

The folder structure should support future modules without requiring major restructuring.

Examples

```
collaboration/

plugins/

ai/

notifications/
```

These can be added inside the features directory when Version 3.0 begins.

---

# Folder Structure Rules

- One responsibility per folder.
- Feature-first organization.
- Reusable components remain shared.
- Avoid duplicated utilities.
- Keep imports predictable.

---

# Status

Approved ✅

Version

2.0

Last Updated

Day 1