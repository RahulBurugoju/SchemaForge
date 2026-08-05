import { addEdge, useEdgesState, useNodesState } from "@xyflow/react";
import { useCallback, useEffect, useState } from "react";
import createTableNode from "../utils/createTableNode";
import validateConnection from "../utils/validateConnection";
import { useSelector } from "react-redux";

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
    if (currentProject) {
      const canvasData = currentProject.canvasData;
      setNodes(canvasData?.nodes || []);
      setEdges(canvasData?.edges || []);
      setViewport(
        canvasData?.viewport || {
          x: 0,
          y: 0,
          zoom: 1,
        }
      );
    } else {
      setNodes([]);
      setEdges([]);
      setViewport({
        x: 0,
        y: 0,
        zoom: 1,
      });
    }
  }, [currentProject?._id, setNodes, setEdges]);

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

        return addEdge(
          {
            ...params,
            animated: true,
            style: { stroke: "#38BDF8", strokeWidth: 2 },
          },
          eds
        );
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

  const getCanvasSnapshot = () => ({
    nodes,
    edges,
    viewport,
  });

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