export const ecommerceTemplate = {
  id: "ecommerce",
  name: "E-Commerce",
  description: "Complete online store schema with Users, Products, Categories, Orders, and Line Items.",
  thumbnail: null,
  databaseType: "mysql",
  canvasData: {
    nodes: [
      {
        id: "tbl_users",
        type: "tableNode",
        position: { x: 50, y: 50 },
        data: {
          name: "Users",
          columns: [
            { id: "col_u_1", name: "id", type: "INT", isPk: true, autoIncrement: true, nullable: false },
            { id: "col_u_2", name: "full_name", type: "VARCHAR", nullable: false },
            { id: "col_u_3", name: "email", type: "VARCHAR", unique: true, nullable: false },
            { id: "col_u_4", name: "password_hash", type: "VARCHAR", nullable: false },
            { id: "col_u_5", name: "created_at", type: "TIMESTAMP", nullable: false },
          ],
        },
      },
      {
        id: "tbl_categories",
        type: "tableNode",
        position: { x: 50, y: 320 },
        data: {
          name: "Categories",
          columns: [
            { id: "col_c_1", name: "id", type: "INT", isPk: true, autoIncrement: true, nullable: false },
            { id: "col_c_2", name: "name", type: "VARCHAR", nullable: false },
            { id: "col_c_3", name: "slug", type: "VARCHAR", unique: true, nullable: false },
          ],
        },
      },
      {
        id: "tbl_products",
        type: "tableNode",
        position: { x: 380, y: 320 },
        data: {
          name: "Products",
          columns: [
            { id: "col_p_1", name: "id", type: "INT", isPk: true, autoIncrement: true, nullable: false },
            { id: "col_p_2", name: "category_id", type: "INT", isFk: true, nullable: false },
            { id: "col_p_3", name: "title", type: "VARCHAR", nullable: false },
            { id: "col_p_4", name: "price", type: "DECIMAL", nullable: false },
            { id: "col_p_5", name: "stock_quantity", type: "INT", nullable: false },
          ],
        },
      },
      {
        id: "tbl_orders",
        type: "tableNode",
        position: { x: 380, y: 50 },
        data: {
          name: "Orders",
          columns: [
            { id: "col_o_1", name: "id", type: "INT", isPk: true, autoIncrement: true, nullable: false },
            { id: "col_o_2", name: "user_id", type: "INT", isFk: true, nullable: false },
            { id: "col_o_3", name: "total_amount", type: "DECIMAL", nullable: false },
            { id: "col_o_4", name: "status", type: "VARCHAR", nullable: false },
            { id: "col_o_5", name: "created_at", type: "TIMESTAMP", nullable: false },
          ],
        },
      },
      {
        id: "tbl_order_items",
        type: "tableNode",
        position: { x: 710, y: 180 },
        data: {
          name: "OrderItems",
          columns: [
            { id: "col_oi_1", name: "id", type: "INT", isPk: true, autoIncrement: true, nullable: false },
            { id: "col_oi_2", name: "order_id", type: "INT", isFk: true, nullable: false },
            { id: "col_oi_3", name: "product_id", type: "INT", isFk: true, nullable: false },
            { id: "col_oi_4", name: "quantity", type: "INT", nullable: false },
            { id: "col_oi_5", name: "unit_price", type: "DECIMAL", nullable: false },
          ],
        },
      },
    ],
    edges: [
      {
        id: "edge_users_orders",
        source: "tbl_users",
        target: "tbl_orders",
        sourceHandle: "tbl_users-col_u_1",
        targetHandle: "tbl_orders-col_o_2",
        type: "smoothstep",
      },
      {
        id: "edge_categories_products",
        source: "tbl_categories",
        target: "tbl_products",
        sourceHandle: "tbl_categories-col_c_1",
        targetHandle: "tbl_products-col_p_2",
        type: "smoothstep",
      },
      {
        id: "edge_orders_items",
        source: "tbl_orders",
        target: "tbl_order_items",
        sourceHandle: "tbl_orders-col_o_1",
        targetHandle: "tbl_order_items-col_oi_2",
        type: "smoothstep",
      },
      {
        id: "edge_products_items",
        source: "tbl_products",
        target: "tbl_order_items",
        sourceHandle: "tbl_products-col_p_1",
        targetHandle: "tbl_order_items-col_oi_3",
        type: "smoothstep",
      },
    ],
    viewport: { x: 0, y: 0, zoom: 1 },
  },
};

export default ecommerceTemplate;
