# State Management Architecture

> This document defines the official state management architecture for SchemaForge Version 2.0.

---

# Purpose

This document establishes the rules, responsibilities, and structure for state management across the application.

It defines:

- Global State
- Local State
- Redux Store Architecture
- Slice Organization
- Async Data Flow
- Best Practices

The goal is to maintain a predictable, scalable, and maintainable state management system.

---

# Project Information

| Property | Value |
|----------|-------|
| Project | SchemaForge |
| Version | 2.0 |
| Status | Approved |
| State Management | Redux Toolkit |
| React Version | 19 |

---

# Why Redux Toolkit?

SchemaForge is a large-scale application with multiple independent modules that need to share state.

Examples:

- Authentication
- Dashboard
- Workspace
- Canvas
- Tables
- Relationships
- Export Center
- Project Settings

Redux Toolkit provides:

- Centralized state management
- Predictable updates
- Excellent DevTools support
- Scalable architecture
- Built-in async support
- Excellent debugging

---

# State Categories

SchemaForge uses two types of state.

## 1. Global State

Managed by Redux Toolkit.

Shared across multiple pages or features.

Examples:

- Logged-in user
- Authentication
- Current Project
- Canvas Data
- Selected Table
- Relationships
- Export Settings
- Theme

---

## 2. Local State

Managed using React hooks.

Examples:

- Modal visibility
- Input values
- Form validation
- Hover state
- Loading spinner for a single component

Rule:

If only one component needs it,
do NOT use Redux.

---

# Store Architecture

```
Redux Store

├── auth
├── dashboard
├── workspace
├── canvas
├── tables
├── relationships
├── export
├── settings
└── ui
```

Each feature owns its own slice.

---

# Slice Responsibilities

## auth

Stores

- Current User
- Login Status
- Access Token
- Permissions

---

## dashboard

Stores

- Project List
- Recent Projects
- Search Results

---

## workspace

Stores

- Active Project
- Open Tabs
- Workspace Settings

---

## canvas

Stores

- Zoom Level
- Canvas Position
- Selected Elements
- Grid Settings

---

## tables

Stores

- Tables
- Columns
- Constraints
- Data Types

---

## relationships

Stores

- Connections
- Relationship Types
- Foreign Keys

---

## export

Stores

- Selected Database
- Generated Code
- Export Settings

---

## settings

Stores

- User Preferences
- Theme
- Keyboard Shortcuts

---

## ui

Stores

- Sidebar State
- Dialog State
- Notifications
- Global Loading

---

# Redux Folder Structure

```
app/

store.js

features/

auth/
    authSlice.js

dashboard/
    dashboardSlice.js

workspace/
    workspaceSlice.js

canvas/
    canvasSlice.js

tables/
    tableSlice.js

relationships/
    relationshipSlice.js

export/
    exportSlice.js

settings/
    settingsSlice.js

ui/
    uiSlice.js
```

---

# State Ownership Rules

Each slice owns only its own data.

Example

Canvas Slice

Responsible for:

- Zoom
- Pan
- Selection

Not responsible for:

- Authentication
- Dashboard
- Export

---

# Communication Between Slices

Slices should remain independent.

If communication is needed:

```
React Component

↓

Dispatch Action

↓

Redux Store

↓

Other Slice Reads Updated State
```

Avoid directly coupling slices.

---

# Async Data Flow

API requests should follow this flow.

```
React Component

↓

Dispatch Async Action

↓

API Request

↓

Backend Response

↓

Redux Store Update

↓

React Re-render
```

---

# State Lifecycle

```
User Action

↓

Dispatch Action

↓

Reducer

↓

Store Update

↓

React Re-render
```

Every state change should be predictable.

---

# What Belongs in Redux?

Store only application state.

Examples

✅ User

✅ Current Project

✅ Canvas Data

✅ Export Configuration

✅ Theme

---

# What Does NOT Belong in Redux?

Avoid storing temporary UI state.

Examples

❌ Form Input

❌ Tooltip State

❌ Modal Animation

❌ Hover State

❌ Input Focus

These belong in React state.

---

# Naming Conventions

Slices

```
authSlice.js

tableSlice.js

workspaceSlice.js
```

Reducers

```
login()

logout()

addTable()

deleteTable()

renameColumn()
```

Selectors

```
selectCurrentUser()

selectProjects()

selectTables()
```

---

# Redux Best Practices

- One slice per feature.
- Keep reducers pure.
- Never mutate state directly.
- Use selectors instead of accessing state manually.
- Keep actions descriptive.
- Keep state normalized whenever possible.
- Avoid duplicate state.

---

# Future Enhancements

Possible additions after Version 2.0

- RTK Query
- Offline Synchronization
- Undo History Middleware
- State Persistence

These are optional enhancements.

---

# State Management Rules

- Redux is the single source of truth for global state.
- React manages local component state.
- Async logic goes through Redux.
- Components should remain as presentational as possible.
- Business logic should not be placed inside UI components.

---

# Status

Approved ✅

Version

2.0

Last Updated

Day 1