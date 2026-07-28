# AI Development Rules

> This document defines the mandatory rules every AI assistant must follow while contributing to SchemaForge.

---

# Purpose

This document ensures that all AI assistants produce consistent, maintainable, and architecture-compliant code.

These rules apply to:

- ChatGPT
- OpenAI Codex
- Claude
- Gemini
- GitHub Copilot
- Any future AI assistant

If an AI suggestion conflicts with these rules, the rules take precedence.

---

# Project Information

| Property | Value |
|----------|-------|
| Project | SchemaForge |
| Version | 2.0 |
| Status | Active |
| Methodology | Documentation-First Development |

---

# AI Primary Responsibilities

Every AI assistant should:

- Understand the project before writing code.
- Follow the approved architecture.
- Respect the existing folder structure.
- Produce clean and maintainable code.
- Explain important technical decisions.
- Keep the project consistent.

---

# Mandatory Reading Order

Before generating any code, the AI should read these documents.

```
README.md

↓

VISION.md

↓

SYSTEM_ARCHITECTURE.md

↓

FOLDER_STRUCTURE.md

↓

STATE_MANAGEMENT.md

↓

CODING_STANDARDS.md

↓

CURRENT_SPRINT.md

↓

PROJECT_STATUS.md
```

Code should never be generated without understanding the current project state.

---

# Documentation Rule

Every completed feature must include:

- Updated documentation
- Updated sprint progress
- Updated project status
- Updated AI context (if architecture changed)

Documentation is part of the implementation.

---

# Architecture Rules

The following decisions are locked.

Frontend

- React
- Redux Toolkit
- React Router
- React Flow

Backend

- Node.js
- Express.js

Database

- MongoDB
- Mongoose

Export

- Internal Schema Model

These choices must not be replaced without explicit approval.

---

# State Management Rules

Redux Toolkit is the only global state manager.

Use React state for:

- Forms
- Modals
- Temporary UI

Use Redux for:

- Authentication
- Projects
- Workspace
- Canvas
- Tables
- Relationships
- Export

Never introduce another global state library.

---

# Component Rules

Components should:

- Have a single responsibility.
- Remain small and readable.
- Be reusable whenever possible.
- Avoid business logic.

Complex logic should be extracted into hooks or services.

---

# Backend Rules

Controllers should:

- Receive requests.
- Validate input.
- Call services.
- Return responses.

Business logic belongs in services.

Models should contain schema definitions, not application logic.

---

# Export Engine Rules

The canvas must never generate SQL directly.

Required flow:

```
Canvas

↓

Internal Schema

↓

Export Generator

↓

Generated Code
```

Every export target must use the Internal Schema.

---

# Feature Development Rules

Before implementing a feature:

1. Verify it exists in FEATURES.md.
2. Check the assigned sprint.
3. Review the architecture.
4. Implement only the planned scope.
5. Update documentation after completion.

---

# AI Communication Style

AI responses should:

- Be technically accurate.
- Explain architectural reasoning.
- Avoid unnecessary complexity.
- Prefer clarity over cleverness.
- Follow existing project terminology.

---

# Code Generation Rules

Generated code should:

- Compile successfully.
- Follow project naming conventions.
- Match the folder structure.
- Avoid duplication.
- Include appropriate error handling.
- Be production-ready.

Placeholder code should be avoided unless explicitly requested.

---

# Library Rules

Do not introduce new libraries unless:

- The requirement cannot be fulfilled with the existing stack.
- The benefits clearly outweigh the added complexity.
- The change is approved.

Avoid adding dependencies for convenience.

---

# Refactoring Rules

Refactoring is allowed only when it:

- Improves readability.
- Reduces duplication.
- Simplifies maintenance.
- Does not change feature behavior.

Large architectural refactors require approval.

---

# Testing Rules

AI-generated code should be written with testing in mind.

Features should:

- Handle errors gracefully.
- Validate inputs.
- Avoid hidden side effects.
- Support future automated testing.

---

# Documentation Rules

When architecture changes:

- Update SYSTEM_ARCHITECTURE.md
- Update FEATURES.md (if applicable)
- Update ROADMAP.md (if scope changes)
- Update AI_CONTEXT.md
- Update PROJECT_STATUS.md

Never leave documentation outdated.

---

# Git Rules

AI should recommend meaningful commit messages.

Examples:

```
feat(canvas): add drag and zoom support

feat(export): implement MySQL generator

fix(auth): resolve JWT refresh issue

docs(ai): update AI development rules
```

---

# Forbidden Actions

AI must never:

- Change architecture without approval.
- Replace Redux Toolkit.
- Replace React Router.
- Bypass the Internal Schema.
- Mix business logic into components.
- Create undocumented features.
- Ignore coding standards.
- Introduce breaking changes silently.

---

# Decision Hierarchy

When conflicts occur, follow this priority.

```
User Instructions

↓

Project Vision

↓

Architecture Documents

↓

Coding Standards

↓

Current Sprint

↓

Implementation
```

Higher-level decisions always override lower-level ones.

---

# AI Success Criteria

An AI contribution is successful if it:

- Solves the requested problem.
- Follows project architecture.
- Matches coding standards.
- Preserves maintainability.
- Updates documentation when required.

---

# Final Rule

Every AI assistant should behave like a senior software engineer working on a long-term production project—not like a code generator completing isolated tasks.

Consistency is more important than speed.

---

Status

Approved ✅

Version

2.0

Last Updated

Day 1