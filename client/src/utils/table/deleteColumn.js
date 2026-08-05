export default function deleteColumn(nodes = [], edges = [], nodeId, columnId) {
  const updatedNodes = nodes.map((node) => {
    if (node.id !== nodeId) return node;

    const currentColumns = node.data?.columns || [];
    return {
      ...node,
      data: {
        ...node.data,
        columns: currentColumns.filter((col) => col.id !== columnId),
      },
    };
  });

  const updatedEdges = edges.filter(
    (edge) =>
      edge.sourceHandle !== `${nodeId}-${columnId}` &&
      edge.targetHandle !== `${nodeId}-${columnId}`
  );

  return {
    nodes: updatedNodes,
    edges: updatedEdges,
  };
}
