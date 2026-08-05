import React, { memo, useEffect, useMemo, useState } from "react";
import {
  SlidersHorizontal,
  MousePointerClick,
  Table,
  Columns3,
  MapPin,
  Key,
  Hash,
  Layers,
  ArrowDownLeft,
  ArrowUpRight,
  Copy,
  Trash2,
  Plus,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedNode } from "../../features/canvas/canvas.Slice";
import updateTableName from "../../utils/table/updateTableName";
import duplicateTable from "../../utils/table/duplicateTable";
import deleteTable from "../../utils/table/deleteTable";
import addColumn from "../../utils/table/addColumn";
import deleteColumn from "../../utils/table/deleteColumn";
import updateColumn from "../../utils/table/updateColumn";

function InspectorPanel({ canvasState }) {

  const dispatch = useDispatch();
  const selectedNode = useSelector((state) => state.canvas.selectedNode);
  const { nodes = [], edges = [], setNodes, setEdges } = canvasState || {};

  // Derive live node from canvasState.nodes so position & node data update in real time
  const liveSelectedNode = useMemo(
    () => nodes.find((n) => n.id === selectedNode?.id) || selectedNode,
    [nodes, selectedNode]
  );

  const tableName = liveSelectedNode?.data?.name || "Untitled Table";
  const columns = liveSelectedNode?.data?.columns || [];
  const posX = Math.round(liveSelectedNode?.position?.x ?? 0);
  const posY = Math.round(liveSelectedNode?.position?.y ?? 0);

  const [newName, setNewName] = useState(tableName);

  // Sync newName input state whenever selected node changes or table name updates
  useEffect(() => {
    setNewName(liveSelectedNode?.data?.name || "");
  }, [liveSelectedNode?.id, liveSelectedNode?.data?.name]);

  const incomingCount = useMemo(
    () =>
      liveSelectedNode
        ? edges.filter((edge) => edge.target === liveSelectedNode.id).length
        : 0,
    [edges, liveSelectedNode]
  );
  const outgoingCount = useMemo(
    () =>
      liveSelectedNode
        ? edges.filter((edge) => edge.source === liveSelectedNode.id).length
        : 0,
    [edges, liveSelectedNode]
  );

  const handleNameChange = (e) => {
    if (e) e.preventDefault();
    if (!liveSelectedNode?.id) return;

    const updatedNodes = updateTableName(nodes, liveSelectedNode.id, newName);
    setNodes(updatedNodes);

    // Keep Redux selectedNode in sync with updated node data
    const updatedNode = updatedNodes.find((n) => n.id === liveSelectedNode.id);
    if (updatedNode) {
      dispatch(setSelectedNode(updatedNode));
    }
  };

  const handleDuplicate = (e) => {
    if (e) e.preventDefault();
    if (!liveSelectedNode?.id) return;

    const newNodes = duplicateTable(nodes, liveSelectedNode.id);
    setNodes(newNodes);

    // Select the newly duplicated node automatically
    const duplicatedNode = newNodes[newNodes.length - 1];
    if (duplicatedNode && duplicatedNode.id !== liveSelectedNode.id) {
      dispatch(setSelectedNode(duplicatedNode));
    }
  };

  const handleDelete = (e) => {
    if (e) e.preventDefault();
    if (!liveSelectedNode?.id) return;

    const { nodes: updatedNodes, edges: updatedEdges } = deleteTable(
      nodes,
      edges,
      liveSelectedNode.id
    );

    setNodes(updatedNodes);
    setEdges(updatedEdges);

    // Clear Redux selectedNode so Inspector closes / shows empty state
    dispatch(setSelectedNode(null));
  };

  const handleAddColumn = (e) => {
    if (e) e.preventDefault();
    if (!liveSelectedNode?.id) return;

    const updatedNodes = addColumn(nodes, liveSelectedNode.id);
    setNodes(updatedNodes);

    const updatedNode = updatedNodes.find((n) => n.id === liveSelectedNode.id);
    if (updatedNode) {
      dispatch(setSelectedNode(updatedNode));
    }
  };

  const handleDeleteColumn = (columnId) => {
    if (!liveSelectedNode?.id) return;

    const { nodes: updatedNodes, edges: updatedEdges } = deleteColumn(
      nodes,
      edges,
      liveSelectedNode.id,
      columnId
    );

    setNodes(updatedNodes);
    setEdges(updatedEdges);

    const updatedNode = updatedNodes.find((n) => n.id === liveSelectedNode.id);
    if (updatedNode) {
      dispatch(setSelectedNode(updatedNode));
    }
  };

  const handleUpdateColumn = (columnId, updates) => {
    if (!liveSelectedNode?.id) return;

    const updatedNodes = updateColumn(
      nodes,
      liveSelectedNode.id,
      columnId,
      updates
    );

    setNodes(updatedNodes);

    const updatedNode = updatedNodes.find((n) => n.id === liveSelectedNode.id);
    if (updatedNode) {
      dispatch(setSelectedNode(updatedNode));
    }
  };

  return (
    <aside className="bg-zinc-950/90 border-l border-zinc-800/80 w-82 flex flex-col h-full font-sans text-xs select-none">
      {/* Panel Header */}
      <div className="p-3 border-b border-zinc-800/80 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-indigo-400" />
          <span className="font-semibold text-white tracking-tight uppercase text-xs">
            Inspector
          </span>
        </div>
        {liveSelectedNode && (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            Node
          </span>
        )}
      </div>

      {/* Inspector Body */}
      {liveSelectedNode ? (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Table Header Card */}
          <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800/80 rounded-2xl p-4 hover:border-zinc-700 transition-all duration-200 space-y-3">
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
                    ID: {liveSelectedNode.id}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={handleDuplicate}
                  title="Duplicate Table"
                  className="p-1.5 bg-zinc-800/80 hover:bg-indigo-600/30 text-zinc-400 hover:text-indigo-300 border border-zinc-700/60 hover:border-indigo-500/40 rounded-lg transition-all cursor-pointer active:scale-95 shadow-sm"
                >
                  <Copy className="w-3.5 h-3.5 stroke-[1.8]" />
                </button>

                <button
                  type="button"
                  onClick={handleDelete}
                  title="Delete Table"
                  className="p-1.5 bg-zinc-800/80 hover:bg-rose-600/30 text-zinc-400 hover:text-rose-400 border border-zinc-700/60 hover:border-rose-500/40 rounded-lg transition-all cursor-pointer active:scale-95 shadow-sm"
                >
                  <Trash2 className="w-3.5 h-3.5 stroke-[1.8]" />
                </button>
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-800/60">
              <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-2.5 flex items-center gap-2">
                <Columns3 className="w-3.5 h-3.5 text-indigo-400" />
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">
                    Columns
                  </span>
                  <span className="font-semibold text-zinc-200">
                    {columns.length}
                  </span>
                </div>
              </div>

              <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-2.5 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">
                    Position
                  </span>
                  <span className="font-mono text-zinc-200 text-[11px]">
                    {posX}, {posY}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Properties Form */}
          <form onSubmit={handleNameChange} className="space-y-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Table Name
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  onChange={(e) => setNewName(e.target.value)}
                  value={newName}
                  className="flex-1 px-3 py-2 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-100 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500/50 shadow-inner"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs rounded-xl shadow transition-all cursor-pointer active:scale-95"
                >
                  Save
                </button>
              </div>
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
                    <span className="text-xs font-medium text-zinc-300">
                      Incoming
                    </span>
                  </div>
                  <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {incomingCount}
                  </span>
                </div>

                <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-2.5 flex flex-col gap-1.5 items-center justify-between">
                  <div className="flex items-center gap-1 text-zinc-400">
                    <ArrowUpRight className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    <span className="text-xs font-medium text-zinc-300">
                      Outgoing
                    </span>
                  </div>

                  <span className="font-mono text-xs font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
                    {outgoingCount}
                  </span>
                </div>
              </div>
            </div>

            {/* Columns List Section */}
            <div >
              <div className="flex items-center justify-between  mb-2">
                <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
                  Columns ({columns.length})
                </label>
                <button
                  type="button"
                  onClick={handleAddColumn}
                  className="px-2 py-1 bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 border border-indigo-500/30 text-[10px] font-medium rounded-lg transition-all flex items-center gap-1 cursor-pointer active:scale-95 shadow-sm"
                >
                  <Plus className="w-3 h-3 stroke-[2]" />
                  <span>Add Column</span>
                </button>
              </div>

              <div className="space-y-2">
                {columns.map((col, index) => (
                  <div
                    key={col.id || index}
                    className=" bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-2.5 space-y-2 hover:border-zinc-700/80 transition-all group"
                  >
                    <div className="flex items-center gap-2">
                      <Hash className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      <input
                        type="text"
                        value={col.name || ""}
                        onChange={(e) =>
                          handleUpdateColumn(col.id, { name: e.target.value })
                        }
                        className="flex-1 min-w-0 bg-slate-950/70 border border-slate-800/80 rounded-lg px-2 py-1 text-slate-100 text-xs focus:outline-none focus:border-indigo-500/60 font-medium"
                        placeholder="column_name"
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteColumn(col.id)}
                        title="Delete Column"
                        className="p-1 text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5 stroke-[1.8]" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-1.5 border-t border-zinc-800/40">
                      {/* Data Type Selector */}
                      <select
                        value={col.type || "VARCHAR"}
                        onChange={(e) =>
                          handleUpdateColumn(col.id, { type: e.target.value })
                        }
                        className="bg-slate-950/70 border border-slate-800/80 rounded-lg px-2 py-0.5 text-[10px] font-mono text-zinc-300 focus:outline-none focus:border-indigo-500/60 cursor-pointer"
                      >
                        <option value="INT">INT</option>
                        <option value="BIGINT">BIGINT</option>
                        <option value="VARCHAR">VARCHAR</option>
                        <option value="TEXT">TEXT</option>
                        <option value="BOOLEAN">BOOLEAN</option>
                        <option value="DATE">DATE</option>
                        <option value="TIMESTAMP">TIMESTAMP</option>
                        <option value="UUID">UUID</option>
                      </select>

                      {/* Primary Key Toggle */}
                      <button
                        type="button"
                        onClick={() =>
                          handleUpdateColumn(col.id, { isPk: !col.isPk })
                        }
                        className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold transition-all cursor-pointer border ${
                          col.isPk || col.isPrimaryKey
                            ? "bg-purple-500/20 text-purple-300 border-purple-500/40 shadow-sm"
                            : "bg-zinc-950 text-zinc-500 border-zinc-800 hover:text-zinc-300"
                        }`}
                      >
                        PK
                      </button>
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
          </form>
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
  );
}

export default memo(InspectorPanel);

