import React, { memo } from "react";
import TableHeader from "./TableHeader";
import ColumnItem from "./ColumnItem";
import { Plus } from "lucide-react";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedNode } from "../../../features/canvas/canvas.Slice";

function TableNode({ id, data, selected }) {
  const columns = data?.columns || [];
  const { setNodes, deleteElements } = useReactFlow();
  const dispatch = useDispatch();
  const selectedNode = useSelector((state) => state.canvas.selectedNode);

  const handleDelete = () => {
    if (typeof deleteElements === "function") {
      deleteElements({ nodes: [{ id }] });
    } else if (typeof setNodes === "function") {
      setNodes((nds) => nds.filter((node) => node.id !== id));
    }

    if (selectedNode?.id === id) {
      dispatch(setSelectedNode(null));
    }
  };

  return (
    <div
      className={`relative min-w-[260px] max-w-[320px] bg-slate-900/95 backdrop-blur-xl border transition-all duration-200 rounded-2xl shadow-2xl shadow-slate-950/80 overflow-hidden ${
        selected
          ? "border-indigo-500 ring-2 ring-indigo-500/40 shadow-indigo-950/60"
          : "border-slate-800/90 hover:border-slate-700/90"
      }`}
    >
      {/* Left Target Connection Handle */}
      <Handle
        type="target"
        position={Position.Left}
        className="!w-3 !h-3 !bg-slate-950 !border-2 !border-indigo-500 hover:!bg-indigo-500 transition-colors shadow-md"
      />

      {/* Table Header */}
      <TableHeader name={data?.name} count={columns.length} onDelete={handleDelete} />

      {/* Column Items */}
      <div className="py-1 divide-y divide-slate-800/40">
        {columns.length > 0 ? (
          columns.map((column, index) => (
            <ColumnItem key={column.id || column.name || index} column={column} />
          ))
        ) : (
          <div className="px-4 py-3 text-center text-xs text-slate-500 italic">
            No columns defined
          </div>
        )}
      </div>

      {/* Add Column Action Button */}
      <div className="px-4 py-2.5 bg-slate-950/40 border-t border-slate-800/60 hover:bg-slate-800/40 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-all flex items-center justify-center gap-1.5 cursor-pointer group select-none">
        <Plus className="w-3.5 h-3.5 stroke-[2.5] group-hover:scale-110 transition-transform" />
        <span>Add Column</span>
      </div>

      {/* Right Source Connection Handle */}
      <Handle
        type="source"
        position={Position.Right}
        className="!w-3 !h-3 !bg-slate-950 !border-2 !border-sky-400 hover:!bg-sky-400 transition-colors shadow-md"
      />
    </div>
  );
}

export default memo(TableNode);
