/**
 * Indents SQL lines by a specified indentation string (default 4 spaces).
 * 
 * Examples:
 * indentSQL(["id INT", "username VARCHAR(255)"]) 
 * -> "    id INT\n    username VARCHAR(255)"
 * 
 * @param {string[]|string} lines - Lines of SQL to indent
 * @param {string} indentStr - Indentation prefix (default 4 spaces)
 * @returns {string} Indented SQL string
 */
export const indentSQL = (lines, indentStr = '    ') => {
  if (!lines) return '';
  const lineArray = Array.isArray(lines) ? lines : String(lines).split('\n');
  return lineArray
    .map((line) => (line.trim() ? `${indentStr}${line}` : ''))
    .join('\n');
};

export default indentSQL;
