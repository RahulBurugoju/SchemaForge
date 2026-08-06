const MONGODB_TYPES = {
  VARCHAR: "String",
  CHAR: "String",
  TEXT: "String",
  INT: "Number",
  INTEGER: "Number",
  BIGINT: "Number",
  BOOLEAN: "Boolean",
  DECIMAL: "Number",
  FLOAT: "Number",
  DOUBLE: "Number",
  DATE: "Date",
  DATETIME: "Date",
  TIMESTAMP: "Date",
  JSON: "mongoose.Schema.Types.Mixed",
  OBJECTID: "mongoose.Schema.Types.ObjectId",
};

export default MONGODB_TYPES;
