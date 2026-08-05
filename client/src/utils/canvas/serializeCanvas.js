export default function serializeCanvas(
  nodes = [],
  edges = [],
  viewport = { x: 0, y: 0, zoom: 1 }
) {
  return {
    nodes: Array.isArray(nodes) ? nodes : [],
    edges: Array.isArray(edges) ? edges : [],
    viewport: viewport || { x: 0, y: 0, zoom: 1 },
  };
}
