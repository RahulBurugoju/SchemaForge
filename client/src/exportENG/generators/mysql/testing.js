import { exportSchema } from "../../../services/export.service.js";

const relationalCanvas = {
  nodes: [
    {
      id: "1",
      data: {
        name: "Users",
        columns: [
          { name: "id", type: "INT", isPk: true, autoIncrement: true },
          { name: "username", type: "VARCHAR", unique: true },
          { name: "email", type: "VARCHAR" },
        ],
      },
    },
    {
      id: "2",
      data: {
        name: "Orders",
        columns: [
          { name: "id", type: "INT", isPk: true, autoIncrement: true },
          { name: "user_id", type: "INT" },
          { name: "total", type: "DECIMAL" },
        ],
      },
    },
  ],
  edges: [
    {
      id: "edge-users-orders",
      source: "users",
      target: "orders",
      sourceHandle: "users-id",
      targetHandle: "orders-user_id",
    },
  ],
};

console.log("=== MYSQL OUTPUT ===");
console.log(exportSchema(relationalCanvas, "mysql"));

console.log("\n=== POSTGRESQL OUTPUT ===");
console.log(exportSchema(relationalCanvas, "postgresql"));

console.log("\n=== SQLITE OUTPUT ===");
console.log(exportSchema(relationalCanvas, "sqlite"));

console.log("\n=== SQL SERVER OUTPUT ===");
console.log(exportSchema(relationalCanvas, "sqlserver"));

console.log("\n=== MONGODB (MONGOOSE) OUTPUT ===");
console.log(exportSchema(relationalCanvas, "mongodb"));