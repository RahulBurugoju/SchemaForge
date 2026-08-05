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
import RelationshipInspector from "./RelationshipInspector";
import GeneralCard from "./inspector/GeneralCard";
import StatisticsCard from "./inspector/StatisticsCard";
import RelationshipCard from "./inspector/RelationshipCard";
import EmptyInspector from "./inspector/EmptyInspector";
import { DATABASE_TYPES } from "../../constants/databaseTypes";

function InspectorPanel({ canvasState }) {
  const dispatch = useDispatch();
  const selectedNode = useSelector((state) => state.canvas.selectedNode);
  const selectedEdge = useSelector((state) => state.canvas.selectedEdge);
  const { nodes = [], edges = [], setNodes, setEdges, addTable } = canvasState || {};
  const currentProject = useSelector((state) => state.project.currentProject);

  const dbKey = currentProject?.databaseType?.toLowerCase() || "mysql";
  const isMongo = dbKey === "mongodb";
  const supportsLength = !isMongo;
  const supportsAutoIncrement = dbKey === "mysql" || dbKey === "sqlserver";

  const availableTypes =
    DATABASE_TYPES[dbKey] ?? DATABASE_TYPES.mysql;

  // Derive live node from canvasState.nodes so position & node data update in real time
  const liveSelectedNode = useMemo(
    () => nodes.find((n) => n.id === selectedNode?.id) || selectedNode,
    [nodes, selectedNode],
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
      liveSelectedNode.id,
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
      columnId,
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
      updates,
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
        {selectedEdge ? (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-sky-500/10 text-sky-400 border border-sky-500/20">
            Relationship
          </span>
        ) : liveSelectedNode ? (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            Node
          </span>
        ) : null}
      </div>

      {/* Inspector Body */}
      {selectedEdge ? (
        <RelationshipInspector canvasState={canvasState} />
      ) : liveSelectedNode ? (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* General Table Settings Card */}
          <GeneralCard
            tableName={tableName}
            newName={newName}
            setNewName={setNewName}
            nodeId={liveSelectedNode.id}
            dbKey={dbKey}
            posX={posX}
            posY={posY}
            onNameChange={handleNameChange}
            onDuplicate={handleDuplicate}
            onDelete={handleDelete}
          />

          {/* Table Metrics Statistics Card */}
          <StatisticsCard columns={columns} />

          {/* Relationships Summary Card */}
          <RelationshipCard
            nodeId={liveSelectedNode.id}
            nodes={nodes}
            edges={edges}
          />

          {/* Columns List Section */}
          <div>
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
                  className="bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-2.5 space-y-2 hover:border-zinc-700/80 transition-all group"
                >
                  {/* Name + Delete */}
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

                  {/* Type, Length & Default Value */}
                  <div className={`grid ${supportsLength ? "grid-cols-3" : "grid-cols-2"} gap-1.5 pt-1.5 border-t border-zinc-800/40`}>
                    <select
                      value={col.type || availableTypes[0]}
                      onChange={(e) =>
                        handleUpdateColumn(col.id, { type: e.target.value })
                      }
                      className="bg-slate-950/70 border border-slate-800/80 rounded-lg px-1.5 py-1 text-[10px] font-mono text-zinc-300 focus:outline-none focus:border-indigo-500/60 cursor-pointer col-span-1 truncate"
                    >
                      {availableTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>

                    {supportsLength && (
                      <input
                        type="text"
                        value={col.length ?? ""}
                        onChange={(e) =>
                          handleUpdateColumn(col.id, { length: e.target.value })
                        }
                        placeholder="Len"
                        className="bg-slate-950/70 border border-slate-800/80 rounded-lg px-1.5 py-1 text-[10px] font-mono text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-indigo-500/60 w-full"
                      />
                    )}

                    <input
                      type="text"
                      value={col.defaultValue ?? ""}
                      onChange={(e) =>
                        handleUpdateColumn(col.id, { defaultValue: e.target.value })
                      }
                      placeholder="Default"
                      className="bg-slate-950/70 border border-slate-800/80 rounded-lg px-1.5 py-1 text-[10px] font-mono text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-indigo-500/60 w-full"
                    />
                  </div>

                  {/* Constraint Toggles */}
                  <div className="flex items-center gap-1 flex-wrap pt-1">
                    {/* PK */}
                    <button
                      type="button"
                      onClick={() =>
                        handleUpdateColumn(col.id, { isPk: !col.isPk })
                      }
                      title="Primary Key"
                      className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold transition-all cursor-pointer border ${
                        col.isPk || col.isPrimaryKey
                          ? "bg-purple-500/20 text-purple-300 border-purple-500/40 shadow-sm"
                          : "bg-zinc-950 text-zinc-500 border-zinc-800 hover:text-zinc-300"
                      }`}
                    >
                      PK
                    </button>

                    {/* FK */}
                    <button
                      type="button"
                      onClick={() =>
                        handleUpdateColumn(col.id, { isFk: !col.isFk })
                      }
                      title="Foreign Key"
                      className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold transition-all cursor-pointer border ${
                        col.isFk || col.isForeignKey
                          ? "bg-sky-500/20 text-sky-300 border-sky-500/40 shadow-sm"
                          : "bg-zinc-950 text-zinc-500 border-zinc-800 hover:text-zinc-300"
                      }`}
                    >
                      FK
                    </button>

                    {/* Nullable */}
                    <button
                      type="button"
                      onClick={() =>
                        handleUpdateColumn(col.id, { nullable: !(col.nullable ?? true) })
                      }
                      title="Nullable / Not Null"
                      className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold transition-all cursor-pointer border ${
                        col.nullable === false
                          ? "bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm"
                          : "bg-zinc-950 text-zinc-500 border-zinc-800 hover:text-zinc-300"
                      }`}
                    >
                      {col.nullable === false ? "NN" : "NULL"}
                    </button>

                    {/* Unique */}
                    <button
                      type="button"
                      onClick={() =>
                        handleUpdateColumn(col.id, { unique: !col.unique })
                      }
                      title="Unique Constraint"
                      className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold transition-all cursor-pointer border ${
                        col.unique
                          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm"
                          : "bg-zinc-950 text-zinc-500 border-zinc-800 hover:text-zinc-300"
                      }`}
                    >
                      UQ
                    </button>

                    {/* Auto Increment */}
                    {supportsAutoIncrement && (
                      <button
                        type="button"
                        onClick={() =>
                          handleUpdateColumn(col.id, { autoIncrement: !col.autoIncrement })
                        }
                        title="Auto Increment"
                        className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold transition-all cursor-pointer border ${
                          col.autoIncrement
                            ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/40 shadow-sm"
                            : "bg-zinc-950 text-zinc-500 border-zinc-800 hover:text-zinc-300"
                        }`}
                      >
                        AI
                      </button>
                    )}
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
        </div>
      ) : (
        /* Empty State */
        <EmptyInspector onAddTable={addTable} />
      )}
    </aside>
  );
}

export default memo(InspectorPanel);
