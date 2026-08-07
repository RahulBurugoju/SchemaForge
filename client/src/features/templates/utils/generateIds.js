/**
 * Generates fresh unique IDs for template nodes and edges when cloning a starter template.
 * Updates edge source/target references and handle IDs accordingly.
 * 
 * @param {Object} template - Cloned template object
 * @returns {Object} Template object with unique node & edge IDs
 */
export default function generateIds(template) {
  if (!template || !template.canvasData) return template;

  const { nodes = [], edges = [], viewport } = template.canvasData;
  if (nodes.length === 0) return template;

  const idMap = new Map();

  const newNodes = nodes.map((node, index) => {
    const newId = `node_${Date.now()}_${index}_${Math.random().toString(36).substring(2, 6)}`;
    idMap.set(node.id, newId);

    return {
      ...node,
      id: newId,
    };
  });

  const newEdges = edges.map((edge, index) => {
    const newEdgeId = `edge_${Date.now()}_${index}_${Math.random().toString(36).substring(2, 6)}`;
    const newSource = idMap.get(edge.source) || edge.source;
    const newTarget = idMap.get(edge.target) || edge.target;

    let newSourceHandle = edge.sourceHandle || "";
    let newTargetHandle = edge.targetHandle || "";

    if (newSourceHandle && !newSourceHandle.startsWith("source-")) {
      newSourceHandle = `source-${newSourceHandle}`;
    }
    if (newTargetHandle && !newTargetHandle.startsWith("target-")) {
      newTargetHandle = `target-${newTargetHandle}`;
    }

    if (newSourceHandle && idMap.has(edge.source)) {
      newSourceHandle = newSourceHandle.replace(edge.source, newSource);
    }

    if (newTargetHandle && idMap.has(edge.target)) {
      newTargetHandle = newTargetHandle.replace(edge.target, newTarget);
    }

    return {
      ...edge,
      id: newEdgeId,
      source: newSource,
      target: newTarget,
      sourceHandle: newSourceHandle,
      targetHandle: newTargetHandle,
    };
  });

  return {
    ...template,
    canvasData: {
      nodes: newNodes,
      edges: newEdges,
      viewport: viewport || { x: 0, y: 0, zoom: 1 },
    },
  };
}
