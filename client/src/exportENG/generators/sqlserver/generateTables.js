import generateColumns from "./generateColumns.js";
import generateRelationships from "./generateRelationships.js";
import indentSQL from "../../helpers/indentSQL.js";

/**
 * Generates CREATE TABLE statement for SQL Server.
 * Uses square brackets ([]) for table and column escaping.
 * 
 * @param {Object} node - Table node
 * @param {Array} edges - Array of edges
 * @param {Array} nodes - Array of nodes
 * @returns {string} Formatted CREATE TABLE SQL string
 */
const generateTables = (node, edges = [], nodes = []) => {
  const rawTableName = node?.data?.name || "Table";
  const tableName = `[${String(rawTableName).replace(/\]/g, "]]")}]`;
  const columns = node?.data?.columns || [];

  const generatedColumns = generateColumns(columns);
  const foreignKeys = generateRelationships(node, edges, nodes);

  const definitions = [...generatedColumns, ...foreignKeys];
  const commaSeparated = definitions.map((def, idx) => {
    const isLast = idx === definitions.length - 1;
    return `${def}${isLast ? "" : ","}`;
  });

  const indentedBody = indentSQL(commaSeparated);

  return `CREATE TABLE ${tableName} (\n${indentedBody}\n);`;
};

export default generateTables;
