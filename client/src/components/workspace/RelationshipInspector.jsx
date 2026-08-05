import React, { memo, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GitFork,
  ArrowRight,
  Trash2,
  ShieldAlert,
  Layers,
  Table,
} from "lucide-react";
import { setSelectedEdge } from "../../features/canvas/canvas.Slice";
import {
  RELATIONSHIP_TYPES,
  REFERENTIAL_ACTIONS,
} from "../../constants/relationshipTypes";

function RelationshipInspector({ canvasState }) {
  const dispatch = useDispatch();
  const selectedEdge = useSelector((state) => state.canvas.selectedEdge);
  const { nodes = [], edges = [], setEdges } = canvasState || {};

  // Derive live edge from canvasState.edges
  const liveSelectedEdge = useMemo(
    () => edges.find((e) => e.id === selectedEdge?.id) || selectedEdge,
    [edges, selectedEdge]
  );

  // Helper lookup for source and target table and column names
  const sourceNode = useMemo(
    () => nodes.find((n) => n.id === liveSelectedEdge?.source),
    [nodes, liveSelectedEdge?.source]
  );
  const targetNode = useMemo(
    () => nodes.find((n) => n.id === liveSelectedEdge?.target),
    [nodes, liveSelectedEdge?.target]
  );

  const sourceColumn = useMemo(() => {
    const colId = liveSelectedEdge?.data?.sourceColumnId;
    return (
      sourceNode?.data?.columns?.find((c) => c.id === colId || c.name === colId)
    );
  }, [sourceNode, liveSelectedEdge?.data?.sourceColumnId]);

  const targetColumn = useMemo(() => {
    const colId = liveSelectedEdge?.data?.targetColumnId;
    return (
      targetNode?.data?.columns?.find((c) => c.id === colId || c.name === colId)
    );
  }, [targetNode, liveSelectedEdge?.data?.targetColumnId]);

  const handleUpdateEdgeData = (updates) => {
    if (!liveSelectedEdge?.id) return;

    const updatedEdges = edges.map((e) => {
      if (e.id !== liveSelectedEdge.id) return e;
      return {
        ...e,
        data: {
          ...e.data,
          ...updates,
        },
      };
    });

    setEdges(updatedEdges);

    const updatedEdge = updatedEdges.find((e) => e.id === liveSelectedEdge.id);
    if (updatedEdge) {
      dispatch(setSelectedEdge(updatedEdge));
    }
  };

  const handleDeleteEdge = () => {
    if (!liveSelectedEdge?.id) return;

    const updatedEdges = edges.filter((e) => e.id !== liveSelectedEdge.id);
    setEdges(updatedEdges);
    dispatch(setSelectedEdge(null));
  };

  if (!liveSelectedEdge) return null;

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-xs">
      {/* Header Info Card */}
      <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800/80 rounded-2xl p-4 hover:border-zinc-700 transition-all space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400">
              <GitFork className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm tracking-tight">
                Relationship
              </h3>
              <span className="text-[10px] text-zinc-500 font-mono block truncate max-w-[140px]">
                ID: {liveSelectedEdge.id}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleDeleteEdge}
            title="Delete Relationship"
            className="p-1.5 bg-zinc-800/80 hover:bg-rose-600/30 text-zinc-400 hover:text-rose-400 border border-zinc-700/60 hover:border-rose-500/40 rounded-lg transition-all cursor-pointer active:scale-95 shadow-sm shrink-0"
          >
            <Trash2 className="w-3.5 h-3.5 stroke-[1.8]" />
          </button>
        </div>

        {/* Connection Flow Visualization */}
        <div className="bg-zinc-950/70 border border-zinc-800/80 rounded-xl p-3 flex items-center justify-between gap-2">
          <div className="min-w-0 flex-1 space-y-0.5">
            <span className="text-[10px] text-zinc-500 block truncate">
              {sourceNode?.data?.name || "Source Table"}
            </span>
            <span className="font-semibold text-sky-300 block truncate">
              {sourceColumn?.name || "Column"}
            </span>
          </div>

          <ArrowRight className="w-4 h-4 text-zinc-500 shrink-0" />

          <div className="min-w-0 flex-1 space-y-0.5 text-right">
            <span className="text-[10px] text-zinc-500 block truncate">
              {targetNode?.data?.name || "Target Table"}
            </span>
            <span className="font-semibold text-indigo-300 block truncate">
              {targetColumn?.name || "Column"}
            </span>
          </div>
        </div>
      </div>

      {/* Properties Form */}
      <div className="space-y-4">
        {/* Relationship Type Select */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-sky-400" />
            <span>Relationship Type</span>
          </label>
          <select
            value={liveSelectedEdge?.data?.relationshipType || "one-to-many"}
            onChange={(e) =>
              handleUpdateEdgeData({ relationshipType: e.target.value })
            }
            className="w-full px-3 py-2 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-100 text-xs focus:outline-none focus:ring-1 focus:ring-sky-500/50 shadow-inner cursor-pointer"
          >
            {RELATIONSHIP_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Referential Actions Section */}
        <div className="space-y-3 pt-2 border-t border-zinc-800/60">
          <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            <span>Referential Integrity</span>
          </label>

          {/* On Delete */}
          <div className="space-y-1">
            <label className="block text-[10px] text-zinc-400 uppercase tracking-wide">
              On Delete
            </label>
            <select
              value={liveSelectedEdge?.data?.onDelete || "CASCADE"}
              onChange={(e) => handleUpdateEdgeData({ onDelete: e.target.value })}
              className="w-full px-3 py-2 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-100 text-xs focus:outline-none focus:ring-1 focus:ring-sky-500/50 shadow-inner cursor-pointer"
            >
              {REFERENTIAL_ACTIONS.map((action) => (
                <option key={action} value={action}>
                  {action}
                </option>
              ))}
            </select>
          </div>

          {/* On Update */}
          <div className="space-y-1">
            <label className="block text-[10px] text-zinc-400 uppercase tracking-wide">
              On Update
            </label>
            <select
              value={liveSelectedEdge?.data?.onUpdate || "CASCADE"}
              onChange={(e) => handleUpdateEdgeData({ onUpdate: e.target.value })}
              className="w-full px-3 py-2 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-100 text-xs focus:outline-none focus:ring-1 focus:ring-sky-500/50 shadow-inner cursor-pointer"
            >
              {REFERENTIAL_ACTIONS.map((action) => (
                <option key={action} value={action}>
                  {action}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(RelationshipInspector);
