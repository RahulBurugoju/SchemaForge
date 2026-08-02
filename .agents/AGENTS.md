# Frontend UI & CSS Styling Guidelines

When creating or styling React frontend UI components, enforce the following Tailwind CSS design system:

### 1. Theme & Color Palette
- **Backgrounds**: Deep dark background (`bg-slate-950`) with ambient radial gradient glows (`bg-indigo-600/20`, `bg-purple-600/20` with `blur-3xl`).
- **Cards & Containers**: Glassmorphism aesthetic (`bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl shadow-indigo-950/50`).
- **Card Hover Effects**: Smooth border highlights (`transition-all duration-300 hover:border-slate-700/80`).

### 2. Typography & Headers
- **Gradient Headings**: Bold gradient clip text (`text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 tracking-tight`).
- **Form Labels**: Sleek uppercase labels (`block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5`).

### 3. Inputs & Form Controls
- **Inputs**: `w-full px-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-200 hover:border-slate-700 text-sm shadow-inner`.

### 4. Buttons & Interactive Elements
- **Primary Buttons**: Vibrant gradient buttons with hover glow and press feedback (`w-full py-3.5 px-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 active:scale-[0.99] transition-all duration-200 cursor-pointer text-sm tracking-wide`).

### 5. Linear Bento Hybrid Aesthetic (Default Dashboard Theme)
- **Canvas & Atmosphere**: Pitch black background (`bg-black text-zinc-100 min-h-screen relative font-sans`) with a subtle overhead radial light source (`bg-zinc-800/10 blur-[150px]`).
- **Bento Cards**: Asymmetric grid layout (`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`). Matte surface cards with Vercel precision 1px borders (`bg-zinc-900/40 backdrop-blur-md border border-zinc-800/80 rounded-2xl p-5 hover:border-zinc-700 hover:bg-zinc-900/70 hover:-translate-y-0.5 transition-all duration-200`).
- **Typography & Buttons**: Crisp white headings (`text-white font-semibold tracking-tight`), solid white primary buttons (`bg-white text-black hover:bg-zinc-200 font-medium rounded-lg px-4 py-2.5 shadow-sm active:scale-[0.98] transition-all text-sm flex items-center gap-2`).
- **Status Pills & Filter Controls**: Monochrome status badges (`bg-zinc-800/80 text-zinc-300 border border-zinc-700/60 text-[11px] rounded-full px-2.5 py-0.5`), live pulse green indicators (`w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse`), and precision 1px input filter bars with solid white active filter pills.

# Data Modeling UI & Node Graph Standards

### 1. Semantic Color Assignments
To prevent visual clutter, vibrant accent colors are strictly reserved for semantic feedback, data types, and relationship paths:
- **Success / Healthy Pipeline**: `#10B981` (Emerald Green)
- **Warning / Pending Schema Change**: `#F59E0B` (Amber)
- **Error / Broken Connection**: `#EF4444` (Red)
- **Primary Key / Unique ID**: `#A855F7` (Purple)
- **Foreign Key / Relation**: `#38BDF8` (Sky Blue)

### 2. Canvas & Node Rules
- **Canvas Background**: Deep Slate (`#0F172A`) or Obsidian (`#0D0E15`) with a subtle grid pattern at 10% opacity.
- **Card Isolation**: Ensure node containers stand out from the canvas:
  ```css
  background-color: #1E293B;
  border: 1px solid #334155;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
  ```

### 3. Connection Lines (Edges)
- **Default Relationship Path**: Low-contrast muted color (`#64748B`, stroke width `2px`).
- **Active / Selected Connection**: High-contrast accent color (`#38BDF8`, stroke width `3px`, optional glow filter).
- **Hover State**: Highlighted path (`#F43F5E`, stroke width `2.5px`).

