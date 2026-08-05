import React, { memo } from "react";
import { MousePointerClick, Plus } from "lucide-react";

function EmptyInspector({ onAddTable }) {
  return (
    <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-4 font-sans select-none">
      <div className="w-12 h-12 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-zinc-400 flex items-center justify-center shadow-xl shadow-slate-950/50">
        <MousePointerClick className="w-6 h-6 stroke-[1.8]" />
      </div>

      <div className="space-y-1.5 max-w-[210px]">
        <h4 className="font-bold text-white text-xs tracking-tight uppercase">
          Nothing Selected
        </h4>
        <p className="text-zinc-400 text-xs leading-relaxed">
          Select a table or relationship on the canvas to inspect and edit its properties.
        </p>
      </div>

      {onAddTable && (
        <button
          type="button"
          onClick={onAddTable}
          className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium rounded-xl text-xs shadow-lg shadow-indigo-500/25 transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Add Table</span>
        </button>
      )}
    </div>
  );
}

export default memo(EmptyInspector);
