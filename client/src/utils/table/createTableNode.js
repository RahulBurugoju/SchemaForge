let count = 1;

export default function createTableNode(position) {
  const uniqueId = typeof window !== 'undefined' && window.crypto?.randomUUID 
    ? window.crypto.randomUUID() 
    : `node_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  return {
    id: uniqueId,
    type: "tableNode",
    position,
    data: {
      name: `NewTable_${count++}`,
      columns: [
        {
          id: `id_${Date.now()}`,
          name: "id",
          type: "INT",
          isPk: true,
        }
      ],
    },

     nullable: false,

    unique: false,

    isPk: false,

    isFk: false,

    defaultValue: null
  };
}