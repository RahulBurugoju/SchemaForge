export default function restoreCanvas(project) {
  if (!project || !project.canvasData) {
    return {
      nodes: [],
      edges: [],
      viewport: { x: 0, y: 0, zoom: 1 },
    };
  }

  const { nodes, edges, viewport } = project.canvasData;

  const normalizedEdges = (Array.isArray(edges) ? edges : []).map((edge) => {
    let sourceHandle = edge.sourceHandle || "";
    let targetHandle = edge.targetHandle || "";

    if (sourceHandle && !sourceHandle.startsWith("source-")) {
      sourceHandle = `source-${sourceHandle}`;
    }
    if (targetHandle && !targetHandle.startsWith("target-")) {
      targetHandle = `target-${targetHandle}`;
    }

    return {
      ...edge,
      sourceHandle,
      targetHandle,
    };
  });

  return {
    nodes: Array.isArray(nodes) ? nodes : [],
    edges: normalizedEdges,
    viewport:
      viewport && typeof viewport === "object"
        ? viewport
        : { x: 0, y: 0, zoom: 1 },
  };
}

