import generateTables from "./generateTables.js";
import generateColumns from "./generateColumns.js";
import generateRelationships from "./generateRelationships.js";
import generateIndexes from "./generateIndexes.js";
import generateConstraints from "./generateConstraints.js";

export {
  generateTables,
  generateColumns,
  generateRelationships,
  generateIndexes,
  generateConstraints,
};

/**
 * Generates PostgreSQL DDL SQL script from canvas data.
 * 
 * @param {Object} canvasData - Object containing { nodes, edges }
 * @returns {string} Full PostgreSQL DDL string
 */
export const generatePostgreSQL = (canvasData = {}) => {
  const { nodes = [], edges = [] } = canvasData;

  return nodes.map((node) => generateTables(node, edges, nodes)).join("\n\n");
};

export default generatePostgreSQL;
