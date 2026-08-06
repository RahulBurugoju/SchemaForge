/**
 * Generates an appropriate download filename based on project name, target database, and format.
 * 
 * Examples:
 * fileNameGenerator("E-Commerce", "mysql", "sql") ➔ "e_commerce_mysql.sql"
 * fileNameGenerator("Store", "mongodb", "mongoose") ➔ "store_mongodb.js"
 * fileNameGenerator("", "postgresql", "sql") ➔ "schema_postgresql.sql"
 * 
 * @param {string} projectName - Name of the project (optional)
 * @param {string} databaseType - Selected database engine (e.g. mysql, postgresql, mongodb)
 * @param {string} format - Export format (e.g. sql, mongoose, json)
 * @returns {string} Formatted filename
 */
export const fileNameGenerator = (projectName = "", databaseType = "mysql", format = "sql") => {
  const sanitize = (str) =>
    String(str || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "");

  const cleanProject = sanitize(projectName) || "schema";
  const cleanDb = sanitize(databaseType) || "export";
  const cleanFormat = sanitize(format);

  let ext = "sql";
  if (cleanDb === "mongodb" || cleanFormat === "mongoose" || cleanFormat === "js") {
    ext = "js";
  } else if (cleanFormat === "json") {
    ext = "json";
  }

  return `${cleanProject}_${cleanDb}.${ext}`;
};

export default fileNameGenerator;
