import indentSQL from './indentSQL.js';
import escapeIdentifier from './escapeIdentifier.js';

/**
 * Centralizes SQL formatting for table creation.
 * Formats column definitions and constraints into a clean, indented, comma-separated CREATE TABLE statement.
 * 
 * @param {string} tableName - Name of the table
 * @param {string[]} definitions - Array of column and foreign key definitions
 * @param {string} quoteChar - Quote character for table name escaping (default `)
 * @returns {string} Formatted CREATE TABLE SQL
 */
export const formatCreateTableSQL = (tableName, definitions = [], quoteChar = '`') => {
  const escapedTableName = escapeIdentifier(tableName, quoteChar);
  
  const commaSeparated = definitions.map((def, idx) => {
    const isLast = idx === definitions.length - 1;
    return `${def}${isLast ? '' : ','}`;
  });

  const indentedBody = indentSQL(commaSeparated);

  return `CREATE TABLE ${escapedTableName} (\n${indentedBody}\n);`;
};

/**
 * Formats an array of SQL definition strings with comma separation and indentation.
 * 
 * @param {string[]} definitions - Array of SQL definition strings
 * @param {string} indentStr - Indentation prefix
 * @returns {string} Formatted SQL string
 */
export const formatSQL = (definitions, indentStr = '    ') => {
  if (!Array.isArray(definitions)) return String(definitions || '');

  return definitions
    .map((def, idx) => {
      const isLast = idx === definitions.length - 1;
      return `${indentStr}${def}${isLast ? '' : ','}`;
    })
    .join('\n');
};

export default formatCreateTableSQL;
