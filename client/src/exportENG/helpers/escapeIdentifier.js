/**
 * Escapes a database identifier (table name, column name, etc.) using quote characters.
 * Defaults to backticks (`) for MySQL.
 * 
 * Examples:
 * escapeIdentifier("Users") -> "`Users`"
 * escapeIdentifier("order") -> "`order`"
 * 
 * @param {string} name - The identifier name to escape
 * @param {string} quoteChar - The quote character to use (default: `)
 * @returns {string} The escaped identifier
 */
export const escapeIdentifier = (name, quoteChar = '`') => {
  if (!name) return '';
  const strName = String(name).trim();
  if (strName.startsWith(quoteChar) && strName.endsWith(quoteChar)) {
    return strName;
  }
  // Escape internal quote characters by doubling them
  const escaped = strName.replace(new RegExp(quoteChar, 'g'), quoteChar + quoteChar);
  return `${quoteChar}${escaped}${quoteChar}`;
};

export default escapeIdentifier;
