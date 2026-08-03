import React from 'react'
import { useSelector } from 'react-redux'
import { Database } from 'lucide-react'

function StatusBar() {
  const { currentProject } = useSelector((state) => state.project)

  const projectName = currentProject?.projectName || currentProject?.name || "Inventory System"
  const databaseType = currentProject?.databaseType || "PostgreSQL"
  const tableCount = currentProject?.tables?.length || 0

  return (
    <div className="bg-zinc-950 border-t border-zinc-800/80 px-4 py-1.5 flex items-center justify-between font-mono text-[11px] text-zinc-400 select-none">
      {/* Left Metadata: Project & Database */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <span className="text-zinc-500">Project:</span>
          <span className="text-zinc-200 font-sans font-medium">{projectName}</span>
        </div>

        <div className="h-3 w-px bg-zinc-800" />

        <div className="flex items-center gap-1.5">
          <span className="text-zinc-500">Database:</span>
          <div className="flex items-center gap-1 text-indigo-400 capitalize font-sans font-medium">
            <Database className="w-3 h-3 shrink-0" />
            <span>{databaseType}</span>
          </div>
        </div>
      </div>

      {/* Right Stats: Zoom & Tables */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <span className="text-zinc-500">Zoom:</span>
          <span className="text-zinc-300">100%</span>
        </div>

        <div className="h-3 w-px bg-zinc-800" />

        <div className="flex items-center gap-1">
          <span className="text-zinc-500">Tables:</span>
          <span className="text-zinc-300">{tableCount}</span>
        </div>
      </div>
    </div>
  )
}

export default StatusBar