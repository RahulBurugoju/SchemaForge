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
