import mysqlTypes from "./mysqlTypes";
import postgresqlTypes from "./postgresqlTypes";
import mongodbTypes from "./mongodbTypes";
import sqliteTypes from "./sqliteTypes";
import sqlserverTypes from "./sqlserverTypes";

export const DATABASE_TYPES = {
  mysql: mysqlTypes,
  postgresql: postgresqlTypes,
  mongodb: mongodbTypes,
  sqlite: sqliteTypes,
  sqlserver: sqlserverTypes,
};