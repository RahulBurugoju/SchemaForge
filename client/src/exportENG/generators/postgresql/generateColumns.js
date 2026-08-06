import escapeIdentifier from "../../helpers/escapeIdentifier.js";

/**
 * Generates PostgreSQL column definition SQL strings.
 * Uses double quotes (") for column names and SERIAL for auto-incrementing integer fields.
 * 
 * @param {Array} columns - Array of column objects
 * @param {string} quoteChar - Quoting character (default: ")
 * @returns {Array<string>} Array of column definition SQL strings
 */
export const generateColumns = (columns = [], quoteChar = '"') => {
  return columns.map((col) => {
    const colName = escapeIdentifier(col.name, quoteChar);
    const rawType = (col.type || "VARCHAR").toUpperCase();

    let dataType = rawType;
    let isSerial = false;

    // PostgreSQL specific type mapping for auto-increment
    if (col.autoIncrement) {
      if (rawType.includes("BIGINT")) {
        dataType = "BIGSERIAL";
      } else if (rawType.includes("SMALLINT")) {
        dataType = "SMALLSERIAL";
      } else {
        dataType = "SERIAL";
      }
      isSerial = true;
    } else if (rawType === "DATETIME") {
      dataType = "TIMESTAMP";
    } else if (rawType === "JSON") {
      dataType = "JSONB";
    } else if (rawType === "VARCHAR") {
      dataType = "VARCHAR(255)";
    }

    let parts = [`${colName} ${dataType}`];

    if (col.isPk) parts.push("PRIMARY KEY");

    if (col.nullable === true) {
      parts.push("NULL");
    } else if (col.notNull || col.nullable === false) {
      parts.push("NOT NULL");
    }

    if (col.unique) parts.push("UNIQUE");
    if (col.defaultValue) parts.push(`DEFAULT ${col.defaultValue}`);
    if (col.comment) parts.push(`COMMENT '${col.comment}'`);

    return parts.join(" ");
  });
};

export default generateColumns;
