import generateFields from "./generateFields.js";
import generateRelationships from "./generateRelationships.js";

/**
 * Generates Mongoose schema JavaScript code string for a single collection/node.
 * 
 * Example output:
 * const UserSchema = new mongoose.Schema({
 *   username: String,
 *   email: { type: String, unique: true }
 * }, { timestamps: true });
 * 
 * export const User = mongoose.model("User", UserSchema);
 * 
 * @param {Object} node - Collection node
 * @param {Array} edges - Array of edges
 * @param {Array} nodes - Array of nodes
 * @returns {string} Mongoose schema code block
 */
export const generateCollections = (node, edges = [], nodes = []) => {
  const collectionName = node?.data?.name || "Schema";
  const modelName = collectionName.endsWith("s")
    ? collectionName.slice(0, -1)
    : collectionName;
  const schemaVarName = `${modelName}Schema`;

  const columns = node?.data?.columns || [];
  const fields = generateFields(columns);
  const relations = generateRelationships(node, edges, nodes);

  const allProperties = [...fields, ...relations];

  return `const ${schemaVarName} = new mongoose.Schema({\n${allProperties.join(",\n\n")}\n}, { timestamps: true });\n\nexport const ${modelName} = mongoose.model("${modelName}", ${schemaVarName});`;
};

export default generateCollections;
