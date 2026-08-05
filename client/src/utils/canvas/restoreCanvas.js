export default function restoreCanvas(project) {
  if (!project || !project.canvasData) {
    return {
      nodes: [],
      edges: [],
      viewport: { x: 0, y: 0, zoom: 1 },
    };
  }

  const { nodes, edges, viewport } = project.canvasData;

  return {
    nodes: Array.isArray(nodes) ? nodes : [],
    edges: Array.isArray(edges) ? edges : [],
    viewport:
      viewport && typeof viewport === "object"
        ? viewport
        : { x: 0, y: 0, zoom: 1 },
  };
}
