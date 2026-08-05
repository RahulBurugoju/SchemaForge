export default function addColumn(nodes = [], nodeId) {
  return nodes.map((node) => {
    if (node.id !== nodeId) return node;

    const currentColumns = node.data?.columns || [];
    const colCount = currentColumns.length + 1;

    const newColumn = {
      id: `col_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      name: `column_${colCount}`,
      type: "VARCHAR",
      isPk: false,
      isFk: false,
    };

    return {
      ...node,
      data: {
        ...node.data,
        columns: [...currentColumns, newColumn],
      },
    };
  });
}
