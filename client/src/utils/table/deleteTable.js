export default function deleteTable(
  nodes = [],
  edges = [],
  nodeId
) {
  const updatedNodes = nodes.filter(
    (node) => node.id !== nodeId
  );

  const updatedEdges = edges.filter(
    (edge) =>
      edge.source !== nodeId &&
      edge.target !== nodeId
  );

  return {
    nodes: updatedNodes,
    edges: updatedEdges,
  };
}