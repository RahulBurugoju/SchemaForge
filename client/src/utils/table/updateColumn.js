export default function updateColumn(nodes = [], nodeId, columnId, updates = {}) {
  return nodes.map((node) => {
    if (node.id !== nodeId) return node;

    const currentColumns = node.data?.columns || [];
    const updatedColumns = currentColumns.map((col) => {
      if (col.id !== columnId) return col;
      return {
        ...col,
        ...updates,
      };
    });

    return {
      ...node,
      data: {
        ...node.data,
        columns: updatedColumns,
      },
    };
  });
}
