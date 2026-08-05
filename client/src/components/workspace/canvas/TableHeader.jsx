import React, { memo } from "react";
import { Database, Trash2 } from "lucide-react";

function TableHeader({ name, count = 0, onDelete }) {
  return (
    <div className="bg-slate-950/90 px-4 py-3 border-b border-slate-800/80 flex items-center justify-between gap-3 select-none">
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shadow-inner flex-shrink-0">
          <Database className="w-4 h-4 stroke-[2]" />
        </div>
        <div className="truncate">
          <h3 className="font-semibold text-xs text-slate-100 tracking-tight truncate">
            {name || "Untitled Table"}
          </h3>
          <p className="text-[9px] text-slate-400 font-mono uppercase tracking-wider truncate">
            public schema
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1.5 flex-shrink-0">
        {count > 0 && (
          <span className="px-2 py-0.5 text-[10px] font-mono rounded-full bg-slate-800/90 text-slate-300 border border-slate-700/60 font-medium">
            {count} cols
          </span>
        )}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.();
          }}
          className="p-1 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-all cursor-pointer nodrag"
          title="Delete Table"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

export default memo(TableHeader);