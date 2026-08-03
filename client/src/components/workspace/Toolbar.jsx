import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Plus,
  Link2,
  Undo2,
  Redo2,
  Save,
  Download,
  Database,
  Layers
} from 'lucide-react'

function Toolbar() {
  const navigate = useNavigate()
  const { currentProject } = useSelector((state) => state.project)

  const projectName = currentProject?.projectName || currentProject?.name || "Inventory System"
  const databaseType = currentProject?.databaseType || "PostgreSQL"

  return (
    <header className="bg-zinc-950 border-b border-zinc-800/80 px-4 py-2 flex items-center justify-between gap-4 font-sans text-xs select-none">
      {/* Left: Back to Dashboard & Project Title */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 border border-zinc-800/80 transition-all cursor-pointer"
          title="Return to Dashboard"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="font-medium">Dashboard</span>
        </button>

        <div className="h-4 w-px bg-zinc-800" />

        <div className="flex items-center gap-2">
          <div className="p-1 rounded bg-zinc-900 text-indigo-400 border border-zinc-800">
            <Layers className="w-3.5 h-3.5" />
          </div>
          <span className="font-semibold text-white tracking-tight max-w-[200px] truncate">
            {projectName}
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono uppercase bg-zinc-900 text-zinc-400 border border-zinc-800">
            <Database className="w-3 h-3 text-indigo-400" />
            {databaseType}
          </span>
        </div>
      </div>

      {/* Right: IDE Action Toolbar Controls */}
      <div className="flex items-center gap-2">
        {/* Undo / Redo */}
        <div className="flex items-center bg-zinc-900/80 border border-zinc-800/80 rounded-lg p-0.5">
          <button
            type="button"
            className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-zinc-800 transition-all cursor-pointer"
            title="Undo"
          >
            <Undo2 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-zinc-800 transition-all cursor-pointer"
            title="Redo"
          >
            <Redo2 className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="h-4 w-px bg-zinc-800" />

        {/* Table & Relation Buttons */}
        <button
          type="button"
          className="bg-white text-black hover:bg-zinc-200 font-semibold rounded-lg px-3 py-1.5 flex items-center gap-1.5 shadow-sm active:scale-[0.98] transition-all cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Table</span>
        </button>

        <button
          type="button"
          className="bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 rounded-lg px-3 py-1.5 font-medium flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <Link2 className="w-3.5 h-3.5" />
          <span>Relation</span>
        </button>

        <div className="h-4 w-px bg-zinc-800" />

        {/* Export & Save */}
        <button
          type="button"
          className="bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 rounded-lg px-3 py-1.5 font-medium flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export</span>
        </button>

        <button
          type="button"
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg px-3 py-1.5 flex items-center gap-1.5 shadow-sm active:scale-[0.98] transition-all cursor-pointer"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Save</span>
        </button>
      </div>
    </header>
  )
}

export default Toolbar