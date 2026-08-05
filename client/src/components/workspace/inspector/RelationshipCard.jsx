import React, { memo, useMemo } from "react";
import { useDispatch } from "react-redux";
import { GitFork, ArrowRight, Layers } from "lucide-react";
import { setSelectedEdge } from "../../../features/canvas/canvas.Slice";

function RelationshipCard({ nodeId, nodes = [], edges = [] }) {
  const dispatch = useDispatch();

  const relatedEdges = useMemo(() => {
    if (!nodeId) return [];
    return edges.filter((e) => e.source === nodeId || e.target === nodeId);
  }, [nodeId, edges]);

  const getTableAndColName = (nodeId, colId) => {
    const node = nodes.find((n) => n.id === nodeId);
    const tableName = node?.data?.name || "Table";
    const column = node?.data?.columns?.find(
      (c) => c.id === colId || c.name === colId
    );
    const colName = column?.name || colId || "column";
    return `${tableName}.${colName}`;
  };

  const labelMap = {
    "one-to-one": "1 : 1",
    "one-to-many": "1 : ∞",
    "many-to-many": "∞ : ∞",
  };

  return (
    <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800/80 rounded-2xl p-3.5 space-y-2.5">
      <div className="flex items-center justify-between border-b border-zinc-800/60 pb-2">
        <div className="flex items-center gap-1.5 text-zinc-300 font-semibold text-xs tracking-tight uppercase">
          <GitFork className="w-3.5 h-3.5 text-sky-400" />
          <span>Relationships ({relatedEdges.length})</span>
        </div>
      </div>

      <div className="space-y-2">
        {relatedEdges.map((edge) => {
          const sourcePath = getTableAndColName(
            edge.source,
            edge.data?.sourceColumnId
          );
          const targetPath = getTableAndColName(
            edge.target,
            edge.data?.targetColumnId
          );
          const relType = edge.data?.relationshipType || "one-to-many";
          const badgeText = labelMap[relType] || "1 : ∞";

          return (
            <div
              key={edge.id}
              onClick={() => dispatch(setSelectedEdge(edge))}
              className="bg-zinc-950/60 hover:bg-slate-900/80 border border-zinc-800/80 hover:border-sky-500/50 rounded-xl p-2.5 flex items-center justify-between gap-2 transition-all cursor-pointer group shadow-sm"
            >
              <div className="min-w-0 flex-1 flex items-center gap-1.5 text-[11px] font-mono">
                <span className="text-sky-300 truncate font-semibold">
                  {sourcePath}
                </span>
                <ArrowRight className="w-3 h-3 text-zinc-500 shrink-0 group-hover:text-sky-400 transition-colors" />
                <span className="text-indigo-300 truncate font-semibold">
                  {targetPath}
                </span>
              </div>

              <span className="bg-sky-500/10 text-sky-300 border border-sky-500/20 text-[9px] font-mono px-1.5 py-0.5 rounded font-bold shrink-0">
                {badgeText}
              </span>
            </div>
          );
        })}

        {relatedEdges.length === 0 && (
          <div className="text-center py-3 text-zinc-500 text-xs border border-dashed border-zinc-800/80 rounded-xl">
            No connected relationships
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(RelationshipCard);
