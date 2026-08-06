/**
 * Validates canvas schema data before generating SQL.
 * Checks for:
 * - Empty table names
 * - Duplicate table names across the canvas
 * - Empty column names
 * - Duplicate column names within a table
 * - Tables without primary keys (warning)
 * - Tables without columns (warning)
 * 
 * @param {Object} canvasData - Object containing { nodes, edges }
 * @returns {{ valid: boolean, errors: string[], warnings: string[] }}
 */
export const validateSchema = (canvasData = {}) => {
  const errors = [];
  const warnings = [];

  const nodes = canvasData?.nodes || [];

  if (!nodes || nodes.length === 0) {
    errors.push("Canvas is empty. No tables found to export.");
    return { valid: false, errors, warnings };
  }

  const tableNamesSeen = new Set();

  nodes.forEach((node, nodeIdx) => {
    const rawName = node?.data?.name || node?.data?.tableName || "";
    const tableName = String(rawName).trim();

    if (!tableName) {
      errors.push(`Table at position #${nodeIdx + 1} has an empty name.`);
    } else {
      const lowerTableName = tableName.toLowerCase();
      if (tableNamesSeen.has(lowerTableName)) {
        errors.push(`Duplicate table name found: '${tableName}'`);
      } else {
        tableNamesSeen.add(lowerTableName);
      }
    }

    const columns = node?.data?.columns || [];
    if (columns.length === 0 && tableName) {
      warnings.push(`Table '${tableName}' has no columns.`);
    }

    const columnNamesSeen = new Set();
    let hasPrimaryKey = false;

    columns.forEach((col, colIdx) => {
      const colName = String(col?.name || "").trim();
      const displayName = tableName || `Table #${nodeIdx + 1}`;

      if (!colName) {
        errors.push(`Column at position #${colIdx + 1} in '${displayName}' has an empty name.`);
      } else {
        const lowerColName = colName.toLowerCase();
        if (columnNamesSeen.has(lowerColName)) {
          errors.push(`Duplicate column name '${colName}' found in table '${displayName}'.`);
        } else {
          columnNamesSeen.add(lowerColName);
        }
      }

      if (col.isPk) {
        hasPrimaryKey = true;
      }
    });

    if (tableName && columns.length > 0 && !hasPrimaryKey) {
      warnings.push(`Table '${tableName}' does not have a Primary Key defined.`);
    }
  });

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
};

export default validateSchema;
