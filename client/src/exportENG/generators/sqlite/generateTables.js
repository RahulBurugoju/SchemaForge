import generateColumns from "./generateColumns.js";
import generateRelationships from "./generateRelationships.js";
import { formatCreateTableSQL } from "../../helpers/formatSQL.js";

/**
 * Generates CREATE TABLE statement for SQLite.
 * Uses double quotes (") for table and column escaping.
 * 
 * @param {Object} node - Table node
 * @param {Array} edges - Array of edges
 * @param {Array} nodes - Array of nodes
 * @param {string} quoteChar - Quoting character (default: ")
 * @returns {string} Formatted CREATE TABLE SQL string
 */
const generateTables = (node, edges = [], nodes = [], quoteChar = '"') => {
  const tableName = node?.data?.name;
  const columns = node?.data?.columns || [];

  const generatedColumns = generateColumns(columns, quoteChar);
  const foreignKeys = generateRelationships(node, edges, nodes, quoteChar);

  const definitions = [...generatedColumns, ...foreignKeys];

  return formatCreateTableSQL(tableName, definitions, quoteChar);
};

export default generateTables;
