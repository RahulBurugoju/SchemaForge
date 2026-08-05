export default function addColumn(nodes = [], nodeId) {
  return nodes.map((node) => {
    if (node.id !== nodeId) return node;

    const currentColumns = node.data?.columns || [];
    const colCount = currentColumns.length + 1;

    const uniqueId =
      typeof window !== "undefined" && window.crypto?.randomUUID
        ? window.crypto.randomUUID()
        : `col_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;

    const newColumn = {
      id: uniqueId,
      name: `column_${colCount}`,
      type: "VARCHAR",

      isPk: false,
      isFk: false,

      nullable: true,
      unique: false,
      autoIncrement: false,

      defaultValue: "",
      length: null,
      comment: "",
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
