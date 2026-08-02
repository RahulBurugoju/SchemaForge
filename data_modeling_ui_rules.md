# Data Modeling UI Design Rules & Color Standards

This document defines the visual standards, color palettes, and interface guidelines for the **Data Modeling** platform to ensure maximum readability, clear visual hierarchy, and intuitive node graph interaction.

---

## 🎨 Recommended Color Palettes

### 1. Deep Developer Dark *(Recommended Default)*
Optimized for long sessions, node-based flowcharts, and complex Entity-Relationship Diagrams (ERD).

| Element | Color Name | Hex Code |
| :--- | :--- | :--- |
| **Canvas Background** | Slate 900 | `#0F172A` |
| **Panels & Cards** | Slate 800 | `#1E293B` |
| **Borders & Dividers** | Slate 700 | `#334155` |
| **Primary Accent (Nodes/Actions)** | Sky 400 | `#38BDF8` |
| **Secondary Accent (Data Flow/Alert)** | Rose 500 | `#F43F5E` |

---

### 2. Cyber Synth (High Contrast)
Designed for real-time streaming data transformations and complex execution graphs.

| Element | Color Name | Hex Code |
| :--- | :--- | :--- |
| **Canvas Background** | Obsidian | `#0D0E15` |
| **Panels & Cards** | Midnight | `#161B26` |
| **Primary Accent** | Indigo | `#6366F1` |
| **Secondary Accent** | Emerald (Success) | `#10B981` |

---

### 3. Clean Modern Light
Ideal for executive dashboards, schema summaries, and documentation views.

| Element | Color Name | Hex Code |
| :--- | :--- | :--- |
| **Canvas Background** | Slate 50 | `#F8FAFC` |
| **Panels & Cards** | Pure White | `#FFFFFF` |
| **Primary Accent** | Royal Blue | `#2563EB` |
| **Secondary Accent** | Amber (Warning) | `#D97706` |

---

### 4. Monochrome Slate + Electric Neon
Suited for deep ETL pipelines, SQL queries, and database relationship visualizations.

| Element | Color Name | Hex Code |
| :--- | :--- | :--- |
| **Canvas Background** | Zinc 900 | `#18181B` |
| **Panels & Cards** | Zinc 800 | `#27272A` |
| **Primary Accent** | Purple | `#A855F7` |
| **Secondary Accent** | Neon Green | `#22C55E` |

---

## 📐 Core UI & Canvas Rules

### 1. Canvas vs. Node Styling
* **Grid Background:** Use subtle, desaturated background colors (`#0F172A` or `#F8FAFC`) with a subtle grid pattern (`1px` dot or line grid at 10% opacity).
* **Card Isolation:** Ensure node containers stand out from the canvas using standard border definitions:
  ```css
  background-color: #1E293B;
  border: 1px solid #334155;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
  ```

### 2. Semantic Color Assignments
To prevent visual confusion, vibrant accent colors are restricted to semantic feedback and data types:
* **Success / Healthy Pipeline:** `#10B981` *(Emerald Green)*
* **Warning / Pending Schema Change:** `#F59E0B` *(Amber)*
* **Error / Broken Connection:** `#EF4444` *(Red)*
* **Primary Key / Unique ID:** `#A855F7` *(Purple)*
* **Foreign Key / Relation:** `#38BDF8` *(Sky Blue)*

### 3. Connection Lines (Edges)
* **Default Relationship Path:** Low-contrast muted color (`#64748B`, stroke width `2px`).
* **Active / Selected Connection:** High-contrast accent color (`#38BDF8`, stroke width `3px`, optional glow filter).
* **Hover State:** Highlighted path (`#F43F5E`, stroke width `2.5px`).
