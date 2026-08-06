import generateCollections from "./generateCollections.js";
import generateFields from "./generateFields.js";
import generateRelationships from "./generateRelationships.js";

export {
  generateCollections,
  generateFields,
  generateRelationships,
};

/**
 * Generates MongoDB Mongoose schema code from canvas data.
 * 
 * @param {Object} canvasData - Object containing { nodes, edges }
 * @returns {string} Full Mongoose schema file content string
 */
export const generateMongoDB = (canvasData = {}) => {
  const { nodes = [], edges = [] } = canvasData;

  const collectionBlocks = nodes.map((node) =>
    generateCollections(node, edges, nodes)
  );

  return `import mongoose from "mongoose";\n\n` + collectionBlocks.join("\n\n");
};

export default generateMongoDB;
