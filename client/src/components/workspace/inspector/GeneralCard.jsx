import React, { memo } from "react";
import { Table, Copy, Trash2, MapPin, Database } from "lucide-react";

function GeneralCard({
  tableName,
  newName,
  setNewName,
  nodeId,
  dbKey,
  posX,
  posY,
  onNameChange,
  onDuplicate,
  onDelete,
}) {
  return (
    <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800/80 rounded-2xl p-4 hover:border-zinc-700 transition-all duration-200 space-y-3">
      {/* Header Info */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <div className="p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shrink-0">
            <Table className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-white text-sm tracking-tight truncate">
              {tableName}
            </h3>
            <span className="text-[10px] text-zinc-500 font-mono block truncate">
              ID: {nodeId}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={onDuplicate}
            title="Duplicate Table"
            className="p-1.5 bg-zinc-800/80 hover:bg-indigo-600/30 text-zinc-400 hover:text-indigo-300 border border-zinc-700/60 hover:border-indigo-500/40 rounded-lg transition-all cursor-pointer active:scale-95 shadow-sm"
          >
            <Copy className="w-3.5 h-3.5 stroke-[1.8]" />
          </button>

          <button
            type="button"
            onClick={onDelete}
            title="Delete Table"
            className="p-1.5 bg-zinc-800/80 hover:bg-rose-600/30 text-zinc-400 hover:text-rose-400 border border-zinc-700/60 hover:border-rose-500/40 rounded-lg transition-all cursor-pointer active:scale-95 shadow-sm"
          >
            <Trash2 className="w-3.5 h-3.5 stroke-[1.8]" />
          </button>
        </div>
      </div>

      {/* Editable Name Form */}
      <form onSubmit={onNameChange} className="space-y-1.5">
        <label className="block text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
          Table Name
        </label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onBlur={onNameChange}
            placeholder="table_name"
            className="flex-1 px-3 py-1.5 bg-slate-950/70 border border-slate-800 rounded-xl text-slate-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500/60 transition-all text-xs font-mono shadow-inner"
          />
          <button
            type="submit"
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl text-xs transition-colors cursor-pointer shrink-0 shadow-sm active:scale-95"
          >
            Save
          </button>
        </div>
      </form>

      {/* Database & Position Tags */}
      <div className="pt-2 border-t border-zinc-800/40 flex items-center justify-between gap-2 text-[10px] font-mono text-zinc-400">
        <div className="flex items-center gap-1 bg-zinc-950/50 px-2 py-0.5 rounded-md border border-zinc-800/60">
          <Database className="w-3 h-3 text-indigo-400" />
          <span className="uppercase">{dbKey}</span>
        </div>

        <div className="flex items-center gap-1 bg-zinc-950/50 px-2 py-0.5 rounded-md border border-zinc-800/60">
          <MapPin className="w-3 h-3 text-slate-400" />
          <span>
            {posX}, {posY}
          </span>
        </div>
      </div>
    </div>
  );
}

export default memo(GeneralCard);
