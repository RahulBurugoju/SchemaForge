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
 * Generates SQL Server (T-SQL) DDL script from canvas data.
 * 
 * @param {Object} canvasData - Object containing { nodes, edges }
 * @returns {string} Full SQL Server DDL string
 */
export const generateSQLServer = (canvasData = {}) => {
  const { nodes = [], edges = [] } = canvasData;

  return nodes.map((node) => generateTables(node, edges, nodes)).join("\n\n");
};

export default generateSQLServer;
