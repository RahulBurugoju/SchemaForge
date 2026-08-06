import generateMySQL from "../exportENG/generators/mysql/index.js";
import generatePostgreSQL from "../exportENG/generators/postgresql/index.js";
import generateSQLite from "../exportENG/generators/sqlite/index.js";
import generateSQLServer from "../exportENG/generators/sqlserver/index.js";
import generateMongoDB from "../exportENG/generators/mongodb/index.js";
import validateSchema from "../exportENG/helpers/validateSchema.js";

export function exportSchema(canvasData, databaseType) {
    const validation = validateSchema(canvasData);
    if (!validation.valid) {
        throw new Error(`Schema Validation Error:\n- ${validation.errors.join("\n- ")}`);
    }

    switch (databaseType?.toLowerCase()) {
        case "mysql":
            return generateMySQL(canvasData);

        case "postgresql":
        case "postgres":
            return generatePostgreSQL(canvasData);

        case "sqlite":
            return generateSQLite(canvasData);

        case "sqlserver":
        case "mssql":
            return generateSQLServer(canvasData);

        case "mongodb":
        case "mongo":
        case "mongoose":
            return generateMongoDB(canvasData);

        default:
            throw new Error(`Unsupported database type: ${databaseType}`);
    }
}