import React, { memo, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Database, CheckCircle2, Loader2, AlertCircle, Clock } from 'lucide-react'

function StatusBar({ saveStatus }) {
  const { currentProject } = useSelector((state) => state.project)

  const projectName = currentProject?.projectName || currentProject?.name || "Inventory System"
  const databaseType = currentProject?.databaseType || "PostgreSQL"
  const tableCount = currentProject?.tables?.length || 0

  const statusBadge = useMemo(() => {
    switch (saveStatus) {
      case 'saving':
        return (
          <div className="flex items-center gap-1.5 text-indigo-400 font-sans font-medium">
            <Loader2 className="w-3 h-3 animate-spin shrink-0" />
            <span>Saving...</span>
          </div>
        )
      case 'unsaved':
        return (
          <div className="flex items-center gap-1.5 text-amber-400 font-sans font-medium">
            <Clock className="w-3 h-3 shrink-0" />
            <span>Unsaved changes</span>
          </div>
        )
      case 'error':
        return (
          <div className="flex items-center gap-1.5 text-rose-400 font-sans font-medium">
            <AlertCircle className="w-3 h-3 shrink-0" />
            <span>Save error</span>
          </div>
        )
      case 'saved':
      default:
        return (
          <div className="flex items-center gap-1.5 text-emerald-400 font-sans font-medium">
            <CheckCircle2 className="w-3 h-3 shrink-0" />
            <span>Saved</span>
          </div>
        )
    }
  }, [saveStatus])

  return (
    <div className="bg-zinc-950 border-t border-zinc-800/80 px-4 py-1.5 flex items-center justify-between font-mono text-[11px] text-zinc-400 select-none">
      {/* Left Metadata: Project, Database & Save Status */}
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

        <div className="h-3 w-px bg-zinc-800" />

        <div className="flex items-center gap-1.5">
          <span className="text-zinc-500">Status:</span>
          {statusBadge}
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

export default memo(StatusBar)
