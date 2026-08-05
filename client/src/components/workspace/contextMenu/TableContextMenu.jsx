import React, { memo, useEffect } from "react";
import { Edit3, Plus, Copy, Trash2 } from "lucide-react";

function TableContextMenu({
  x,
  y,
  node,
  onClose,
  onRename,
  onAddColumn,
  onDuplicate,
  onDelete,
}) {
  useEffect(() => {
    const handleOutsideClick = () => {
      onClose?.();
    };
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, [onClose]);

  if (!node) return null;

  return (
    <div
      style={{ top: y, left: x }}
      className="fixed z-50 bg-zinc-900/95 backdrop-blur-xl border border-zinc-800 rounded-xl shadow-2xl p-1 min-w-[160px] font-sans text-xs select-none space-y-0.5"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="px-2.5 py-1.5 border-b border-zinc-800/80 mb-1">
        <span className="font-bold text-white block truncate max-w-[130px]">
          {node.data?.name || "Table"}
        </span>
        <span className="text-[9px] font-mono text-zinc-500 block">
          ID: {node.id}
        </span>
      </div>

      <button
        type="button"
        onClick={() => {
          onRename?.(node);
          onClose?.();
        }}
        className="w-full flex items-center gap-2 px-2.5 py-1.5 text-zinc-300 hover:text-white hover:bg-zinc-800/80 rounded-lg transition-colors cursor-pointer text-left"
      >
        <Edit3 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
        <span>Rename Table</span>
      </button>

      <button
        type="button"
        onClick={() => {
          onAddColumn?.(node);
          onClose?.();
        }}
        className="w-full flex items-center gap-2 px-2.5 py-1.5 text-zinc-300 hover:text-white hover:bg-zinc-800/80 rounded-lg transition-colors cursor-pointer text-left"
      >
        <Plus className="w-3.5 h-3.5 text-sky-400 shrink-0" />
        <span>Add Column</span>
      </button>

      <button
        type="button"
        onClick={() => {
          onDuplicate?.(node);
          onClose?.();
        }}
        className="w-full flex items-center gap-2 px-2.5 py-1.5 text-zinc-300 hover:text-white hover:bg-zinc-800/80 rounded-lg transition-colors cursor-pointer text-left"
      >
        <Copy className="w-3.5 h-3.5 text-purple-400 shrink-0" />
        <span>Duplicate</span>
      </button>

      <div className="border-t border-zinc-800/80 pt-0.5">
        <button
          type="button"
          onClick={() => {
            onDelete?.(node);
            onClose?.();
          }}
          className="w-full flex items-center gap-2 px-2.5 py-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer text-left"
        >
          <Trash2 className="w-3.5 h-3.5 stroke-[1.8] shrink-0" />
          <span>Delete Table</span>
        </button>
      </div>
    </div>
  );
}

export default memo(TableContextMenu);
