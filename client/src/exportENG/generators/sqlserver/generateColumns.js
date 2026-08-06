const SQLSERVER_TYPES = {
  VARCHAR: "NVARCHAR(255)",
  CHAR: "NVARCHAR(255)",
  TEXT: "NVARCHAR(MAX)",
  INT: "INT",
  INTEGER: "INT",
  BIGINT: "BIGINT",
  BOOLEAN: "BIT",
  DECIMAL: "DECIMAL(18,2)",
  FLOAT: "FLOAT",
  DOUBLE: "FLOAT",
  DATE: "DATE",
  DATETIME: "DATETIME2",
  JSON: "NVARCHAR(MAX)",
};

/**
 * Generates SQL Server (T-SQL) column definition SQL strings.
 * Uses square brackets ([]) for identifier escaping and IDENTITY(1,1) for auto-increment.
 * 
 * @param {Array} columns - Array of column objects
 * @returns {Array<string>} Array of column definition SQL strings
 */
export const generateColumns = (columns = []) => {
  return columns.map((col) => {
    const colName = `[${String(col.name).replace(/\]/g, "]]")}]`;
    const rawType = (col.type || "VARCHAR").toUpperCase().replace(/\(.*\)/, "");
    const dataType = SQLSERVER_TYPES[rawType] || rawType;

    let parts = [`${colName} ${dataType}`];

    if (col.isPk) parts.push("PRIMARY KEY");
    if (col.autoIncrement) parts.push("IDENTITY(1,1)");

    if (col.nullable === true) {
      parts.push("NULL");
    } else if (col.notNull || col.nullable === false) {
      parts.push("NOT NULL");
    }

    if (col.unique) parts.push("UNIQUE");
    if (col.defaultValue) parts.push(`DEFAULT ${col.defaultValue}`);

    return parts.join(" ");
  });
};

export default generateColumns;
