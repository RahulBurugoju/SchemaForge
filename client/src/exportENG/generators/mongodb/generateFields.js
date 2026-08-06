import MONGODB_TYPES from "./typeMapper.js";

/**
 * Generates Mongoose schema field definition strings.
 * 
 * Example output:
 *   email: {
 *     type: String,
 *     required: true,
 *     unique: true
 *   }
 * 
 * @param {Array} columns - Array of column objects
 * @returns {Array<string>} Array of field definition strings
 */
export const generateFields = (columns = []) => {
  const fields = [];

  columns.forEach((col) => {
    // Skip standard auto _id / id primary key field
    if ((col.name === "_id" || col.name === "id") && col.isPk) {
      return;
    }

    const fieldName = col.name;
    const rawType = (col.type || "VARCHAR").toUpperCase().replace(/\(.*\)/, "");
    const mongooseType = MONGODB_TYPES[rawType] || "String";

    const props = [`type: ${mongooseType}`];

    if (col.notNull || col.nullable === false) {
      props.push("required: true");
    }
    if (col.unique) {
      props.push("unique: true");
    }
    if (col.defaultValue) {
      props.push(`default: ${col.defaultValue}`);
    }

    if (props.length === 1 && !col.unique && !col.notNull) {
      fields.push(`  ${fieldName}: ${mongooseType}`);
    } else {
      fields.push(`  ${fieldName}: {\n    ${props.join(",\n    ")}\n  }`);
    }
  });

  return fields;
};

export default generateFields;
