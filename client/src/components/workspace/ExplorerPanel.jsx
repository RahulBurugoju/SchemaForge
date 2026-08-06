import React, { memo, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  FolderKanban,
  Search,
  Table,
  Database,
  Plus,
  ChevronDown,
  ChevronRight,
  Key,
  Link2,
  Trash2,
  Layers,
  Link as LinkIcon,
  X,
} from "lucide-react";
import { setSelectedNode, setSelectedEdge } from "../../features/canvas/canvas.Slice";
import deleteTable from "../../utils/table/deleteTable";

function ExplorerPanel({ canvasState }) {
  const dispatch = useDispatch();
  const { currentProject } = useSelector((state) => state.project || {});
  const selectedNode = useSelector((state) => state.canvas.selectedNode);
  const selectedEdge = useSelector((state) => state.canvas.selectedEdge);

  const { nodes = [], edges = [], setNodes, setEdges, addTable } = canvasState || {};

  const [searchQuery, setSearchQuery] = useState("");
  const [expandedNodes, setExpandedNodes] = useState({});

  const projectName = currentProject?.projectName || currentProject?.name || "Untitled Model";
  const databaseType = currentProject?.databaseType || "PostgreSQL";

  // Filter tables by name or column name
  const filteredNodes = useMemo(() => {
    if (!searchQuery.trim()) return nodes;
    const q = searchQuery.toLowerCase();
    return nodes.filter((node) => {
      const tableName = (node.data?.name || "").toLowerCase();
      const hasMatchingCol = (node.data?.columns || []).some((col) =>
        (col.name || "").toLowerCase().includes(q)
      );
      return tableName.includes(q) || hasMatchingCol;
    });
  }, [nodes, searchQuery]);

  // Aggregate statistics
  const totalColumns = useMemo(() => {
    return nodes.reduce((acc, n) => acc + (n.data?.columns?.length || 0), 0);
  }, [nodes]);

  const toggleExpand = (nodeId, e) => {
    if (e) e.stopPropagation();
    setExpandedNodes((prev) => ({
      ...prev,
      [nodeId]: !prev[nodeId],
    }));
  };

  const handleSelectTable = (node) => {
    dispatch(setSelectedEdge(null));
    dispatch(setSelectedNode(node));
  };

  const handleSelectEdge = (edge) => {
    dispatch(setSelectedNode(null));
    dispatch(setSelectedEdge(edge));
  };

  const handleDeleteTable = (nodeId, e) => {
    if (e) e.stopPropagation();
    if (!setNodes || !setEdges) return;

    const { nodes: updatedNodes, edges: updatedEdges } = deleteTable(
      nodes,
      edges,
      nodeId
    );
    setNodes(updatedNodes);
    setEdges(updatedEdges);

    if (selectedNode?.id === nodeId) {
      dispatch(setSelectedNode(null));
    }
  };

  return (
    <aside className="bg-zinc-950/90 border-r border-zinc-800/80 w-72 flex flex-col h-full font-sans text-xs select-none">
      {/* Panel Header */}
      <div className="p-3.5 border-b border-zinc-800/80 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <FolderKanban className="w-4 h-4 text-indigo-400" />
          <span className="font-semibold text-white tracking-tight uppercase text-xs">
            Explorer
          </span>
        </div>
        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-zinc-900 text-zinc-400 border border-zinc-800">
          {nodes.length} {nodes.length === 1 ? "Entity" : "Entities"}
        </span>
      </div>

      {/* Project & Database Metadata Summary */}
      <div className="p-3.5 space-y-2 bg-zinc-900/30 shrink-0 border-b border-zinc-800/60">
        <div>
          <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider block mb-0.5">
            Project
          </span>
          <p className="font-medium text-white tracking-tight text-xs truncate" title={projectName}>
            {projectName}
          </p>
        </div>

        <div className="flex items-center justify-between pt-1 text-[11px]">
          <div className="flex items-center gap-1.5 text-indigo-400 font-mono">
            <Database className="w-3.5 h-3.5 shrink-0" />
            <span className="capitalize">{databaseType}</span>
          </div>

          <span className="text-zinc-500 font-mono text-[10px]">
            {totalColumns} Cols • {edges.length} Rels
          </span>
        </div>
      </div>

      {/* Tables Section Header + Add Table Action */}
      <div className="p-3.5 pb-2 flex items-center justify-between shrink-0">
        <span className="font-semibold text-zinc-400 uppercase tracking-wider text-[11px]">
          Entities ({filteredNodes.length})
        </span>

        {addTable && (
          <button
            type="button"
            onClick={addTable}
            className="px-2 py-1 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 rounded-lg text-[10px] font-medium flex items-center gap-1 transition-all cursor-pointer active:scale-95 shadow-sm"
            title="Add New Table"
          >
            <Plus className="w-3 h-3 stroke-[2.5]" />
            <span>Table</span>
          </button>
        )}
      </div>

      {/* Search Input for Tables */}
      <div className="px-3.5 pb-3 shrink-0">
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter entities & columns..."
            className="w-full bg-black/60 border border-zinc-800 rounded-lg pl-8 pr-7 py-1.5 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-700 text-xs transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Tables Content Tree Area */}
      <div className="flex-1 px-3.5 overflow-y-auto space-y-1 pb-4">
        {filteredNodes.length > 0 ? (
          filteredNodes.map((node) => {
            const isSelected = selectedNode?.id === node.id;
            const isExpanded = Boolean(expandedNodes[node.id]);
            const columns = node.data?.columns || [];
            const pkCount = columns.filter((c) => c.isPk).length;

            return (
              <div key={node.id} className="space-y-0.5">
                {/* Table Item Bar */}
                <div
                  onClick={() => handleSelectTable(node)}
                  className={`group flex items-center justify-between px-2.5 py-1.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-indigo-600/20 border-indigo-500/60 text-white shadow-sm"
                      : "bg-zinc-900/40 hover:bg-zinc-900 border-zinc-800/80 hover:border-zinc-700 text-zinc-300"
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <button
                      type="button"
                      onClick={(e) => toggleExpand(node.id, e)}
                      className="text-zinc-500 hover:text-zinc-300 cursor-pointer shrink-0"
                    >
                      {isExpanded ? (
                        <ChevronDown className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5" />
                      )}
                    </button>

                    <Table className={`w-3.5 h-3.5 shrink-0 ${isSelected ? "text-indigo-400" : "text-zinc-400"}`} />
                    <span className="font-medium text-xs truncate font-mono">
                      {node.data?.name || "Untitled"}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    {pkCount > 0 && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-purple-500/10 text-purple-300 border border-purple-500/20">
                        {pkCount} PK
                      </span>
                    )}
                    <span className="text-[10px] text-zinc-500 font-mono">
                      {columns.length}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => handleDeleteTable(node.id, e)}
                      className="opacity-0 group-hover:opacity-100 p-1 text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 rounded transition-all cursor-pointer ml-1"
                      title="Delete Table"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Expanded Columns Tree List */}
                {isExpanded && columns.length > 0 && (
                  <div className="pl-6 pr-1 py-1 space-y-1 border-l border-zinc-800/80 ml-4">
                    {columns.map((col, idx) => (
                      <div
                        key={col.id || idx}
                        className="flex items-center justify-between px-2 py-1 rounded-lg text-[11px] font-mono text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60 transition-colors"
                      >
                        <span className="flex items-center gap-1.5 truncate">
                          {col.isPk ? (
                            <Key className="w-3 h-3 text-purple-400 shrink-0" />
                          ) : col.isFk ? (
                            <Link2 className="w-3 h-3 text-sky-400 shrink-0" />
                          ) : (
                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 shrink-0" />
                          )}
                          <span className={col.isPk ? "text-slate-100 font-semibold" : ""}>
                            {col.name}
                          </span>
                        </span>
                        <span className="text-[9px] text-zinc-500 uppercase shrink-0">
                          {col.type}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        ) : nodes.length === 0 ? (
          /* Empty Canvas State */
          <div className="py-6 px-3 border border-dashed border-zinc-800/80 rounded-xl text-center space-y-3 bg-zinc-900/20 my-2">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 mx-auto flex items-center justify-center text-indigo-400">
              <Table className="w-4 h-4" />
            </div>
            <p className="text-zinc-400 text-xs font-mono">No tables in canvas</p>
            {addTable && (
              <button
                type="button"
                onClick={addTable}
                className="w-full py-2 px-3 bg-white text-black hover:bg-zinc-200 font-medium rounded-lg text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.98] transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Add First Table</span>
              </button>
            )}
          </div>
        ) : (
          /* Empty Search Filter State */
          <div className="py-6 px-3 text-center space-y-2 text-zinc-500 font-mono text-xs">
            <p>No matching entities for "{searchQuery}"</p>
          </div>
        )}

        {/* Relationships Summary Section */}
        {edges.length > 0 && (
          <div className="pt-4 space-y-2">
            <div className="flex items-center justify-between text-zinc-500 text-[10px] uppercase font-semibold tracking-wider pt-2 border-t border-zinc-800/80">
              <span>Relationships ({edges.length})</span>
            </div>

            <div className="space-y-1">
              {edges.map((edge) => {
                const sourceNode = nodes.find((n) => n.id === edge.source);
                const targetNode = nodes.find((n) => n.id === edge.target);
                const isSelected = selectedEdge?.id === edge.id;

                return (
                  <div
                    key={edge.id}
                    onClick={() => handleSelectEdge(edge)}
                    className={`flex items-center justify-between px-2.5 py-1.5 rounded-xl border text-[11px] font-mono cursor-pointer transition-all ${
                      isSelected
                        ? "bg-sky-500/20 border-sky-500/60 text-sky-200"
                        : "bg-zinc-900/30 hover:bg-zinc-900 border-zinc-800/60 text-zinc-400"
                    }`}
                  >
                    <span className="truncate">
                      {sourceNode?.data?.name || "Source"} → {targetNode?.data?.name || "Target"}
                    </span>
                    <LinkIcon className="w-3 h-3 text-sky-400 shrink-0 ml-1" />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

export default memo(ExplorerPanel);
