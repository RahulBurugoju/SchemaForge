import React from 'react'
import { SlidersHorizontal, MousePointerClick } from 'lucide-react'

function InspectorPanel() {
  return (
    <aside className="bg-zinc-950/90 border-l border-zinc-800/80 w-72 flex flex-col h-full font-sans text-xs select-none">
      {/* Panel Header */}
      <div className="p-3 border-b border-zinc-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-indigo-400" />
          <span className="font-semibold text-white tracking-tight uppercase text-xs">
            Inspector
          </span>
        </div>
      </div>

      {/* Inspector Body / Empty State */}
      <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-3">
        <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-500 flex items-center justify-center shadow-inner">
          <MousePointerClick className="w-5 h-5 stroke-[1.8]" />
        </div>

        <div className="space-y-1">
          <h4 className="font-semibold text-white text-xs tracking-tight">
            Nothing Selected
          </h4>
          <p className="text-zinc-400 text-xs leading-relaxed max-w-[200px]">
            Select a table or relationship to edit its properties.
          </p>
        </div>
      </div>
    </aside>
  )
}

export default InspectorPanel