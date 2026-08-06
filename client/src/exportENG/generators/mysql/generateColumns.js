import escapeIdentifier from "../../helpers/escapeIdentifier.js";

export const generateColumns = (columns = [], quoteChar = '`') => {
  return columns.map((col) => {
    const colName = escapeIdentifier(col.name, quoteChar);
    let parts = [`${colName} ${col.type}${col.type === 'VARCHAR' ? '(255)' : ''}`];

    if (col.isPk) parts.push("PRIMARY KEY");
    if (col.autoIncrement) parts.push("AUTO_INCREMENT");

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
