

function updateTableName(nodes, nodeId, newName) {  
 return  nodes.map((node) =>
    node.id === nodeId
      ? {
          ...node,
          data: {
            ...node.data,
            name: newName,
          },
        }
      : node,
  );
}

export default updateTableName;