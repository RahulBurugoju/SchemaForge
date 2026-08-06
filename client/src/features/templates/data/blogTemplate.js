export const blogTemplate = {
  id: "blog",
  name: "Blog & CMS",
  description: "Blogging platform with Authors, Posts, Comments, Tags, and Junction relations.",
  thumbnail: null,
  databaseType: "postgresql",
  canvasData: {
    nodes: [
      {
        id: "tbl_authors",
        type: "tableNode",
        position: { x: 50, y: 50 },
        data: {
          name: "Authors",
          columns: [
            { id: "col_a_1", name: "id", type: "SERIAL", isPk: true, nullable: false },
            { id: "col_a_2", name: "name", type: "VARCHAR", nullable: false },
            { id: "col_a_3", name: "email", type: "VARCHAR", unique: true, nullable: false },
            { id: "col_a_4", name: "bio", type: "TEXT", nullable: true },
          ],
        },
      },
      {
        id: "tbl_posts",
        type: "tableNode",
        position: { x: 380, y: 50 },
        data: {
          name: "Posts",
          columns: [
            { id: "col_po_1", name: "id", type: "SERIAL", isPk: true, nullable: false },
            { id: "col_po_2", name: "author_id", type: "INTEGER", isFk: true, nullable: false },
            { id: "col_po_3", name: "title", type: "VARCHAR", nullable: false },
            { id: "col_po_4", name: "slug", type: "VARCHAR", unique: true, nullable: false },
            { id: "col_po_5", name: "content", type: "TEXT", nullable: false },
            { id: "col_po_6", name: "published_at", type: "TIMESTAMP", nullable: true },
          ],
        },
      },
      {
        id: "tbl_comments",
        type: "tableNode",
        position: { x: 710, y: 50 },
        data: {
          name: "Comments",
          columns: [
            { id: "col_cm_1", name: "id", type: "SERIAL", isPk: true, nullable: false },
            { id: "col_cm_2", name: "post_id", type: "INTEGER", isFk: true, nullable: false },
            { id: "col_cm_3", name: "commenter_name", type: "VARCHAR", nullable: false },
            { id: "col_cm_4", name: "body", type: "TEXT", nullable: false },
            { id: "col_cm_5", name: "created_at", type: "TIMESTAMP", nullable: false },
          ],
        },
      },
      {
        id: "tbl_tags",
        type: "tableNode",
        position: { x: 50, y: 320 },
        data: {
          name: "Tags",
          columns: [
            { id: "col_tg_1", name: "id", type: "SERIAL", isPk: true, nullable: false },
            { id: "col_tg_2", name: "name", type: "VARCHAR", nullable: false },
            { id: "col_tg_3", name: "slug", type: "VARCHAR", unique: true, nullable: false },
          ],
        },
      },
      {
        id: "tbl_post_tags",
        type: "tableNode",
        position: { x: 380, y: 320 },
        data: {
          name: "PostTags",
          columns: [
            { id: "col_pt_1", name: "id", type: "SERIAL", isPk: true, nullable: false },
            { id: "col_pt_2", name: "post_id", type: "INTEGER", isFk: true, nullable: false },
            { id: "col_pt_3", name: "tag_id", type: "INTEGER", isFk: true, nullable: false },
          ],
        },
      },
    ],
    edges: [
      {
        id: "edge_authors_posts",
        source: "tbl_authors",
        target: "tbl_posts",
        sourceHandle: "tbl_authors-col_a_1",
        targetHandle: "tbl_posts-col_po_2",
        type: "smoothstep",
      },
      {
        id: "edge_posts_comments",
        source: "tbl_posts",
        target: "tbl_comments",
        sourceHandle: "tbl_posts-col_po_1",
        targetHandle: "tbl_comments-col_cm_2",
        type: "smoothstep",
      },
      {
        id: "edge_posts_tags",
        source: "tbl_posts",
        target: "tbl_post_tags",
        sourceHandle: "tbl_posts-col_po_1",
        targetHandle: "tbl_post_tags-col_pt_2",
        type: "smoothstep",
      },
      {
        id: "edge_tags_posttags",
        source: "tbl_tags",
        target: "tbl_post_tags",
        sourceHandle: "tbl_tags-col_tg_1",
        targetHandle: "tbl_post_tags-col_pt_3",
        type: "smoothstep",
      },
    ],
    viewport: { x: 0, y: 0, zoom: 1 },
  },
};

export default blogTemplate;
