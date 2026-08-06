/**
 * Generates Mongoose schema ObjectId reference relationship strings.
 * 
 * Example output:
 *   user: {
 *     type: mongoose.Schema.Types.ObjectId,
 *     ref: "Users"
 *   }
 * 
 * @param {Object} node - Target table/collection node
 * @param {Array} edges - Array of canvas edges
 * @param {Array} nodes - Array of all canvas nodes
 * @returns {Array<string>} Array of Mongoose reference field strings
 */
export const generateRelationships = (node, edges = [], nodes = []) => {
  const targetNode = node;

  const findNode = (idOrName) => {
    if (!idOrName) return null;
    const str = String(idOrName).toLowerCase();
    return nodes.find(
      (n) =>
        String(n.id).toLowerCase() === str ||
        String(n.data?.name || "").toLowerCase() === str
    );
  };

  const getColumnName = (currNode, handleId, dataColId) => {
    if (dataColId && currNode?.data?.columns) {
      const match = currNode.data.columns.find(
        (c) => c.id === dataColId || c.name === dataColId
      );
      if (match) return match.name;
    }

    if (!handleId) return "";

    let cleaned = String(handleId).replace(/^(source|target)-/, "");

    if (currNode) {
      if (currNode.id && cleaned.startsWith(`${currNode.id}-`)) {
        cleaned = cleaned.slice(currNode.id.length + 1);
      }
      if (
        currNode.data?.name &&
        cleaned.toLowerCase().startsWith(`${currNode.data.name.toLowerCase()}-`)
      ) {
        cleaned = cleaned.slice(currNode.data.name.length + 1);
      }
    }

    if (currNode?.data?.columns) {
      const match = currNode.data.columns.find(
        (c) => c.id === cleaned || c.name === cleaned
      );
      if (match) return match.name;
    }

    return cleaned;
  };

  const relevantEdges = targetNode
    ? edges.filter((e) => {
        const tNode = findNode(e.target);
        return (
          e.target === targetNode.id ||
          e.target === targetNode.data?.name ||
          tNode === targetNode
        );
      })
    : edges;

  return relevantEdges.map((edge) => {
    const srcNode = findNode(edge.source);
    const tgtNode = findNode(edge.target);

    const sourceCollectionName = srcNode?.data?.name || edge.source;
    const rawTargetCol = getColumnName(tgtNode, edge.targetHandle, edge.data?.targetColumnId);
    
    const fieldName = rawTargetCol || `${sourceCollectionName.toLowerCase()}_id`;

    return `  ${fieldName}: {\n    type: mongoose.Schema.Types.ObjectId,\n    ref: "${sourceCollectionName}"\n  }`;
  });
};

export default generateRelationships;
