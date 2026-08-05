export default function duplicateTable(nodes = [], nodeId) {
  const table = nodes.find((node) => node.id === nodeId);

  if (!table) {
    return nodes;
  }

  const uniqueNodeId =
    typeof window !== "undefined" && window.crypto?.randomUUID
      ? window.crypto.randomUUID()
      : `node_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  const duplicate = {
    ...table,
    id: uniqueNodeId,
    selected: false,
    position: {
      x: (table.position?.x ?? 0) + 60,
      y: (table.position?.y ?? 0) + 60,
    },
    data: {
      ...table.data,
      name: `${table.data?.name || "Table"} Copy`,
      columns: (table.data?.columns || []).map((column) => ({
        ...column,
        id: `col_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      })),
    },
  };

  return [...nodes, duplicate];
}