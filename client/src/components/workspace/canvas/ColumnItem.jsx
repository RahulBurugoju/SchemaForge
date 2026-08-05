import React, { memo } from "react";
import { Handle, Position } from "@xyflow/react";

function ColumnItem({ column, nodeId }) {
  const isPk = column?.isPk || column?.isPrimaryKey;
  const isFk = column?.isFk || column?.isForeignKey;
  const isUq = !!column?.unique;
  const isNn = column?.nullable === false;
  const isAi = !!column?.autoIncrement;

  const displayType = column?.length
    ? `${column?.type || ""}(${column.length})`
    : column?.type || "";

  const colId = column?.id || column?.name;
  const safeNodeId = nodeId || "node";
  const targetHandleId = `target-${safeNodeId}-${colId}`;
  const sourceHandleId = `source-${safeNodeId}-${colId}`;

  return (
    <div className="relative px-3.5 py-2 flex items-center justify-between text-xs hover:bg-slate-800/50 transition-colors group select-none gap-2">
      {/* Target Handle on Left (Sky Blue) */}
      <Handle
        type="target"
        position={Position.Left}
        id={targetHandleId}
        className="w-4 h-4 !bg-sky-400 !border-2 !border-slate  transition-transform hover:!bg-sky-300 hover:!scale-150 cursor-crosshair z-20 shadow-md"
      />

      {/* Column Name */}
      <div className="flex items-center gap-1.5 text-slate-200 min-w-0 flex-1">
        <span
          className={`font-medium tracking-tight text-xs truncate ${
            isPk
              ? "text-purple-200 font-semibold"
              : isFk
              ? "text-sky-200 font-semibold"
              : "text-slate-300 group-hover:text-white"
          }`}
        >
          {column?.name}
        </span>
      </div>

      {/* Type & Constraint Badges */}
      <div className="flex items-center gap-1 shrink-0">
        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
          {displayType}
        </span>

        {isPk && (
          <span className="bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[9px] font-mono px-1 rounded font-bold">
            PK
          </span>
        )}
        {isFk && (
          <span className="bg-sky-500/20 text-sky-300 border border-sky-500/30 text-[9px] font-mono px-1 rounded font-bold">
            FK
          </span>
        )}
        {isUq && (
          <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[9px] font-mono px-1 rounded font-bold">
            UQ
          </span>
        )}
        {isNn && (
          <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[9px] font-mono px-1 rounded font-bold">
            NN
          </span>
        )}
        {isAi && (
          <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[9px] font-mono px-1 rounded font-bold">
            AI
          </span>
        )}
      </div>

      {/* Source Handle on Right (Indigo) */}
      <Handle
        type="source"
        position={Position.Right}
        id={sourceHandleId}
        className="w-4 h-4 !bg-white !border-2 !border-slate  transition-transform hover:!bg-indigo-300 hover:!scale-150 cursor-crosshair z-20 shadow-md"
      />
    </div>
  );
}

export default memo(ColumnItem);
