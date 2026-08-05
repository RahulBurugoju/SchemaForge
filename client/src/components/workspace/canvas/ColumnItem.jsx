import React, { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import { Key, Link } from "lucide-react";

function ColumnItem({ column }) {
  const isPk = column?.isPk || column?.isPrimaryKey || column?.name?.toLowerCase() === "id";
  const isFk = column?.isFk || column?.isForeignKey || (column?.name && column.name.endsWith("_id"));

  return (
    <div className="relative px-3.5 py-2 flex items-center justify-between text-xs hover:bg-slate-800/50 transition-colors group select-none">
      {/* Target Handle on Left */}
      <Handle
        type="target"
        position={Position.Left}
        id={`target-${column.id || column.name}`}
        className="!w-2.5 !h-2.5 !bg-sky-400 !border-2 !border-slate-950 !-left-1.5 transition-transform hover:scale-125 cursor-crosshair"
      />

      <div className="flex items-center gap-2 text-slate-200 min-w-0 pr-2">
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

      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider pl-2 flex-shrink-0">
        {column?.type}
      </span>

      {/* Source Handle on Right */}
      <Handle
        type="source"
        position={Position.Right}
        id={`source-${column.id || column.name}`}
        className="!w-2.5 !h-2.5 !bg-indigo-400 !border-2 !border-slate-950 !-right-1.5 transition-transform hover:scale-125 cursor-crosshair"
      />
    </div>
  );
}

export default memo(ColumnItem);
