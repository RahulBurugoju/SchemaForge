import React from "react";
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { nodeTypes } from "./nodeTypes";
import useCanvas from "../../../hooks/useCanvas";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedNode } from "../../../features/canvas/canvas.Slice";

function CanvasPanel({ canvasState }) {
  const dispatch = useDispatch()
    const selectedNode = useSelector(state=> state.canvas.selectedNode)
  const fallbackCanvas = useCanvas();
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, isValidConnection,viewport, setViewport,getCanvasSnapshot } = canvasState || fallbackCanvas;

  const onNodeClick = (_,node)=>{
    // console.log(node)
      dispatch(setSelectedNode(node))
  }

  const onPanelClick = ()=>{
      dispatch(setSelectedNode(null))

  }



  // {console.log(getCanvasSnapshot())}
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
          onNodeClick={onNodeClick}
          onPaneClick={onPanelClick}
          onMoveEnd={(_,viewport)=>{
            setViewport(viewport )
          }}
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
      </div>
    </div>
  );
}

export default CanvasPanel;
