import React from 'react'
import { FolderKanban, Plus } from 'lucide-react'

function EmptyProjects({ onCreate }) {
  return (
    <div className="bg-zinc-900/20 backdrop-blur-md border border-zinc-800/80 border-dashed rounded-3xl p-12 text-center my-8 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background glow ambient highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-zinc-800/10 blur-3xl rounded-full pointer-events-none" />

      {/* Folder Icon Badge */}
      <div className="p-4 rounded-2xl bg-zinc-900/90 text-zinc-300 border border-zinc-800 mb-4 shadow-inner relative z-10">
        <FolderKanban className="w-8 h-8 stroke-[1.5] text-zinc-200" />
      </div>

      {/* Main Content */}
      <h3 className="text-xl font-semibold text-white tracking-tight relative z-10">
        No Projects Yet
      </h3>
      <p className="text-zinc-400 text-sm mt-1.5 max-w-md relative z-10 leading-relaxed font-normal">
        Create your first database model.
      </p>

      {/* Action Button */}
      {onCreate && (
        <button
          onClick={onCreate}
          className="mt-6 bg-white text-black hover:bg-zinc-200 font-medium rounded-xl px-5 py-2.5 shadow-sm active:scale-[0.98] transition-all text-sm flex items-center gap-2 cursor-pointer relative z-10"
        >
          <Plus className="w-4 h-4 stroke-[2.2]" />
          <span>Create Project</span>
        </button>
      )}
    </div>
  )
}

export default EmptyProjects