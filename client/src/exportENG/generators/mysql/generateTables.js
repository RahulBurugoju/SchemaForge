import generateColumns from "./generateColumns.js";
import generateRelationships from "./generateRelationships.js";
import { formatCreateTableSQL } from "../../helpers/formatSQL.js";

const generateTables = (node, edges = [], nodes = [], quoteChar = '`') => {
    const tableName = node?.data?.name;
    const columns = node?.data?.columns || [];

    const generatedColumns = generateColumns(columns, quoteChar);
    const foreignKeys = generateRelationships(node, edges, nodes, quoteChar);

    const definitions = [...generatedColumns, ...foreignKeys];

    return formatCreateTableSQL(tableName, definitions, quoteChar);
};

export default generateTables;
