import escapeIdentifier from "../../helpers/escapeIdentifier.js";

const SQLITE_TYPES = {
  VARCHAR: "TEXT",
  CHAR: "TEXT",
  TEXT: "TEXT",
  INT: "INTEGER",
  INTEGER: "INTEGER",
  BIGINT: "INTEGER",
  BOOLEAN: "INTEGER",
  DECIMAL: "REAL",
  FLOAT: "REAL",
  DOUBLE: "REAL",
  DATE: "TEXT",
  DATETIME: "TEXT",
  JSON: "TEXT",
};

/**
 * Generates SQLite column definition SQL strings.
 * Uses double quotes (") for column escaping and INTEGER PRIMARY KEY AUTOINCREMENT.
 * 
 * @param {Array} columns - Array of column objects
 * @param {string} quoteChar - Quoting character (default: ")
 * @returns {Array<string>} Array of column definition SQL strings
 */
export const generateColumns = (columns = [], quoteChar = '"') => {
  return columns.map((col) => {
    const colName = escapeIdentifier(col.name, quoteChar);
    const rawType = (col.type || "VARCHAR").toUpperCase().replace(/\(.*\)/, "");
    const mappedType = SQLITE_TYPES[rawType] || "TEXT";

    let parts = [`${colName} ${mappedType}`];

    if (col.isPk) {
      parts.push("PRIMARY KEY");
    }

    if (col.autoIncrement) {
      parts.push("AUTOINCREMENT");
    }

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
