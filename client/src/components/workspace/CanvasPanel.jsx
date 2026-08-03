import React, { useState } from 'react'
import { Plus, Package, ZoomIn, ZoomOut, Maximize2, Grid } from 'lucide-react'

function CanvasPanel() {
  const [zoom, setZoom] = useState(100)

  return (
    <main className="flex-1 bg-[#08090D] relative overflow-hidden flex items-center justify-center font-sans select-none">
      {/* Background Radial Grid Dots */}
      <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      {/* Subtle Overhead Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-zinc-800/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Empty State ERD Canvas Card */}
      <div className="relative z-10 bg-zinc-950/80 backdrop-blur-xl border border-zinc-800/90 rounded-3xl p-8 max-w-sm text-center shadow-2xl shadow-black/80 space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 text-indigo-400 mx-auto flex items-center justify-center shadow-inner text-xl">
          <Package className="w-6 h-6 stroke-[1.8]" />
        </div>

        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-white tracking-tight">
            No tables created yet
          </h2>
          <p className="text-zinc-400 text-xs leading-relaxed">
            Start by creating your first table.
          </p>
        </div>

        <div className="pt-2">
          <button
            type="button"
            className="w-full py-2.5 px-4 bg-white text-black hover:bg-zinc-200 font-semibold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add Table</span>
          </button>
        </div>
      </div>

      {/* Floating Bottom Viewport Canvas Controls */}
      <div className="absolute bottom-4 left-4 z-20 bg-zinc-950/90 backdrop-blur-md border border-zinc-800/90 rounded-xl p-1 shadow-2xl flex items-center gap-1 font-mono text-[11px] text-zinc-400">
        <button
          type="button"
          onClick={() => setZoom((z) => Math.max(50, z - 10))}
          className="p-1.5 hover:text-white rounded-lg hover:bg-zinc-900 transition-all cursor-pointer"
          title="Zoom Out"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>

        <span className="px-2 font-medium text-zinc-300 min-w-[42px] text-center">
          {zoom}%
        </span>

        <button
          type="button"
          onClick={() => setZoom((z) => Math.min(200, z + 10))}
          className="p-1.5 hover:text-white rounded-lg hover:bg-zinc-900 transition-all cursor-pointer"
          title="Zoom In"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>

        <div className="h-3.5 w-px bg-zinc-800 my-auto" />

        <button
          type="button"
          onClick={() => setZoom(100)}
          className="p-1.5 hover:text-white rounded-lg hover:bg-zinc-900 transition-all cursor-pointer"
          title="Reset Zoom"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          className="p-1.5 text-indigo-400 hover:text-white rounded-lg hover:bg-zinc-900 transition-all cursor-pointer"
          title="Toggle Grid"
        >
          <Grid className="w-3.5 h-3.5" />
        </button>
      </div>
    </main>
  )
}

export default CanvasPanel