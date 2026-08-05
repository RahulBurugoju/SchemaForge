import React, { memo, useCallback, useState } from "react";
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { nodeTypes } from "./nodeTypes";
import { edgeTypes } from "../edges/edgeTypes";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedNode, setSelectedEdge } from "../../../features/canvas/canvas.Slice";
import useKeyboardShortcuts from "../../../hooks/useKeyboardShortcuts";
import TableContextMenu from "../contextMenu/TableContextMenu";
import addColumn from "../../../utils/table/addColumn";
import duplicateTable from "../../../utils/table/duplicateTable";
import deleteTable from "../../../utils/table/deleteTable";

function CanvasPanel({ canvasState }) {
  const dispatch = useDispatch();
  useKeyboardShortcuts({ canvasState });

  const [menu, setMenu] = useState(null);

  const selectedNode = useSelector((state) => state.canvas.selectedNode);
  const selectedEdge = useSelector((state) => state.canvas.selectedEdge);
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    isValidConnection,
    setNodes,
    setEdges,
    setViewport,
  } = canvasState || {};

  const onNodeClick = useCallback(
    (_, node) => {
      dispatch(setSelectedNode(node));
    },
    [dispatch]
  );

  const onEdgeClick = useCallback(
    (_, edge) => {
      dispatch(setSelectedEdge(edge));
    },
    [dispatch]
  );

  const onPanelClick = useCallback(() => {
    dispatch(setSelectedNode(null));
    dispatch(setSelectedEdge(null));
    setMenu(null);
  }, [dispatch]);

  const onNodeContextMenu = useCallback(
    (e, node) => {
      e.preventDefault();
      dispatch(setSelectedNode(node));
      setMenu({
        x: e.clientX,
        y: e.clientY,
        node,
      });
    },
    [dispatch]
  );

  const handleAddColumn = useCallback(
    (node) => {
      if (!node?.id) return;
      const updatedNodes = addColumn(nodes, node.id);
      setNodes?.(updatedNodes);
    },
    [nodes, setNodes]
  );

  const handleDuplicate = useCallback(
    (node) => {
      if (!node?.id) return;
      const updatedNodes = duplicateTable(nodes, node.id);
      setNodes?.(updatedNodes);
      const duplicated = updatedNodes[updatedNodes.length - 1];
      if (duplicated) dispatch(setSelectedNode(duplicated));
    },
    [nodes, setNodes, dispatch]
  );

  const handleDelete = useCallback(
    (node) => {
      if (!node?.id) return;
      const { nodes: updatedNodes, edges: updatedEdges } = deleteTable(
        nodes,
        edges,
        node.id
      );
      setNodes?.(updatedNodes);
      setEdges?.(updatedEdges);
      dispatch(setSelectedNode(null));
    },
    [nodes, edges, setNodes, setEdges, dispatch]
  );

  const handleMoveEnd = useCallback(
    (_, vp) => {
      setViewport?.(vp);
    },
    [setViewport]
  );

  return (
    <div className="w-full h-full bg-[#090A0F] relative overflow-hidden flex flex-col font-sans select-none border border-slate-800/80  shadow-2xl">
      {/* Main ReactFlow Canvas */}
      <div className="flex-1 w-full h-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          isValidConnection={isValidConnection}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodeClick={onNodeClick}
          onEdgeClick={onEdgeClick}
          onPaneClick={onPanelClick}
          onNodeContextMenu={onNodeContextMenu}
          onMoveEnd={handleMoveEnd}
          fitView
          colorMode="dark"
        >
          <Background
            gap={28}
            size={1.5}
            color="#334155"
            style={{ opacity: 0.35 }}
          />
          <Controls
            className="!bg-slate-900/90 !border !border-slate-800 !rounded-xl !p-1 !shadow-2xl !text-slate-300 backdrop-blur-md"
            showInteractive={false}
          />
          <MiniMap
            nodeColor="#1E293B"
            maskColor="rgba(9, 10, 15, 0.85)"
            className="!bg-slate-900/90 !border !border-slate-800 !rounded-xl !overflow-hidden shadow-2xl backdrop-blur-md"
          />
        </ReactFlow>

        {menu && (
          <TableContextMenu
            x={menu.x}
            y={menu.y}
            node={menu.node}
            onClose={() => setMenu(null)}
            onRename={(n) => dispatch(setSelectedNode(n))}
            onAddColumn={handleAddColumn}
            onDuplicate={handleDuplicate}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}

export default memo(CanvasPanel);
