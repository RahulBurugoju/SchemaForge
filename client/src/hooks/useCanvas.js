import { addEdge, useEdgesState, useNodesState } from "@xyflow/react";
import initialNodes from "../components/workspace/data/initialNodes";
import initialEdges from "../components/workspace/data/initialEdges";
import { useCallback } from "react";
import createTableNode from "../utils/createTableNode";
import validateConnection from "../utils/validateConnection";

function useCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

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

  return {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    isValidConnection,
    addTable,
  };
}

export default useCanvas;