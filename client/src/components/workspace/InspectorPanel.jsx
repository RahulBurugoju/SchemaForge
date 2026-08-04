import React from 'react'
import { SlidersHorizontal, MousePointerClick, Table, Columns3, MapPin, Key, Hash, Layers, ArrowDownLeft, ArrowUpRight } from 'lucide-react'
import { useSelector } from 'react-redux'
import useCanvas from '../../hooks/useCanvas'

function InspectorPanel({ canvasState }) {
  const selectedNode = useSelector((state) => state.canvas.selectedNode)
  const fallbackCanvas = useCanvas()
  const edges = canvasState?.edges || fallbackCanvas.edges || []

  const tableName = selectedNode?.data?.name || 'Untitled Table'
  const columns = selectedNode?.data?.columns || []
  const posX = Math.round(selectedNode?.position?.x ?? 0)
  const posY = Math.round(selectedNode?.position?.y ?? 0)

  const incomingCount = selectedNode
    ? edges.filter((edge) => edge.target === selectedNode.id).length
    : 0
  const outgoingCount = selectedNode
    ? edges.filter((edge) => edge.source === selectedNode.id).length
    : 0

  return (
    <aside className="bg-zinc-950/90 border-l border-zinc-800/80 w-72 flex flex-col h-full font-sans text-xs select-none">
      {/* Panel Header */}
      <div className="p-3 border-b border-zinc-800/80 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-indigo-400" />
          <span className="font-semibold text-white tracking-tight uppercase text-xs">
            Inspector
          </span>
        </div>
        {selectedNode && (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            Node
          </span>
        )}
      </div>

      {/* Inspector Body */}
      {selectedNode ? (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Table Header Card */}
          <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800/80 rounded-2xl p-4 hover:border-zinc-700 transition-all duration-200 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  <Table className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm tracking-tight">
                    {tableName}
                  </h3>
                  <span className="text-[10px] text-zinc-500 font-mono">
                    ID: {selectedNode.id}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-800/60">
              <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-2.5 flex items-center gap-2">
                <Columns3 className="w-3.5 h-3.5 text-indigo-400" />
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">Columns</span>
                  <span className="font-semibold text-zinc-200">{columns.length}</span>
                </div>
              </div>

              <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-2.5 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">Position</span>
                  <span className="font-mono text-zinc-200 text-[11px]">{posX}, {posY}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Properties Form */}
          <div className="space-y-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Table Name
              </label>
              <input
                type="text"
                readOnly
                value={tableName}
                className="w-full px-3 py-2 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-100 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500/50 shadow-inner"
              />
            </div>

            {/* Relationships Count Section */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
                Relationships
              </label>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-2.5 flex flex-col gap-1.5 items-center justify-between">
                  <div className="flex items-center gap-1 text-zinc-400">
                    <ArrowDownLeft className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="text-xs font-medium text-zinc-300">Incoming</span>
                  </div> 
                  <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {incomingCount}
                  </span>
                </div>

                <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-2.5 flex flex-col gap-1.5  items-center justify-between">
                  <div className="flex items-center gap-1 text-zinc-400">
                    <ArrowUpRight className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    <span className="text-xs font-medium text-zinc-300">Outgoing</span>
                  </div>
                  
                  <span className="font-mono text-xs font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
                    {outgoingCount}
                  </span>
                </div>
              </div>
            </div>

            {/* Columns List Section */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
                  Columns ({columns.length})
                </label>
              </div>

              <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                {columns.map((col, index) => (
                  <div
                    key={col.id || index}
                    className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-2.5 flex items-center justify-between hover:border-zinc-700 transition-all"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <Hash className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                      <span className="font-medium text-zinc-200 truncate">{col.name}</span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="font-mono text-[10px] text-zinc-400 bg-zinc-950 px-1.5 py-0.5 rounded border border-zinc-800">
                        {col.type}
                      </span>
                      {col.isPk && (
                        <span className="bg-purple-500/10 text-purple-400 border border-purple-500/30 text-[9px] font-mono px-1.5 py-0.5 rounded font-bold">
                          PK
                        </span>
                      )}
                      {col.isFk && (
                        <span className="bg-sky-500/10 text-sky-400 border border-sky-500/30 text-[9px] font-mono px-1.5 py-0.5 rounded font-bold">
                          FK
                        </span>
                      )}
                    </div>
                  </div>
                ))}

                {columns.length === 0 && (
                  <div className="text-center py-4 text-zinc-500 text-xs border border-dashed border-zinc-800 rounded-xl">
                    No columns defined
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-3">
          <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-500 flex items-center justify-center shadow-inner">
            <MousePointerClick className="w-5 h-5 stroke-[1.8]" />
          </div>

          <div className="space-y-1">
            <h4 className="font-semibold text-white text-xs tracking-tight">
              Nothing Selected
            </h4>
            <p className="text-zinc-400 text-xs leading-relaxed max-w-[200px]">
              Select a table on the canvas to inspect and edit its properties.
            </p>
          </div>
        </div>
      )}
    </aside>
  )
}

export default InspectorPanel
