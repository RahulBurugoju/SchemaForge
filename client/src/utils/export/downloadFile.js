/**
 * Triggers a browser file download with the given content, filename, and MIME type.
 * 
 * @param {string} content - Text content of the file
 * @param {string} filename - Output filename (e.g. "schema_mysql.sql")
 * @param {string} mimeType - MIME type (default: "text/plain;charset=utf-8")
 */
export const downloadFile = (content, filename = "schema.sql", mimeType = "text/plain;charset=utf-8") => {
  if (typeof window === "undefined" || !content) return;

  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export default downloadFile;
