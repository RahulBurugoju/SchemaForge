import { addEdge, useEdgesState, useNodesState } from "@xyflow/react";
import { useCallback, useEffect, useState } from "react";
import createTableNode from "../utils/table/createTableNode";
import validateConnection from "../utils/validateConnection";
import { useSelector } from "react-redux";

import createRelationship from "../utils/relationship/createRelationship";
import serializeCanvas from "../utils/canvas/serializeCanvas";
import restoreCanvas from "../utils/canvas/restoreCanvas";

function useCanvas() {
  const { currentProject } = useSelector((state) => state.project);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [viewport, setViewport] = useState({
    x: 0,
    y: 0,
    zoom: 1,
  });

  useEffect(() => {
    const restored = restoreCanvas(currentProject);
    setNodes(restored.nodes);
    setEdges(restored.edges);
    setViewport(restored.viewport);
  }, [currentProject?._id, currentProject?.canvasData, setNodes, setEdges, setViewport]);

  const isValidConnection = useCallback(
    (connection) => validateConnection(connection, edges),
    [edges]
  );

  const onConnect = useCallback(
    (params) => {
      setEdges((eds) => {
        if (!validateConnection(params, eds)) {
          return eds;
        }

        const newRelationship = createRelationship(params);
        return [...eds, newRelationship];
      });
    },
    [setEdges]
  );

  const addTable = useCallback(() => {
    const node = createTableNode({
      x: 100 + (nodes.length % 3) * 300,
      y: 100 + Math.floor(nodes.length / 3) * 200,
    });

    setNodes((prev) => [...prev, node]);
  }, [nodes.length, setNodes]);

  const getCanvasSnapshot = useCallback(
    () => serializeCanvas(nodes, edges, viewport),
    [nodes, edges, viewport]
  );

  return {
    nodes,
    setNodes,
    edges,
    setEdges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    isValidConnection,
    addTable,
    viewport,
    setViewport,
    getCanvasSnapshot,
  };
}

export default useCanvas;