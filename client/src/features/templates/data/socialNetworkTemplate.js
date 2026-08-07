export const socialNetworkTemplate = {
  id: "social-network",
  name: "Social Network",
  description: "Modern social app model with Users, Posts, Comments, and Follower relationships.",
  thumbnail: null,
  databaseType: "mongodb",
  canvasData: {
    nodes: [
      {
        id: "col_users",
        type: "tableNode",
        position: { x: 50, y: 50 },
        data: {
          name: "Users",
          columns: [
            { id: "col_sn_u_1", name: "_id", type: "ObjectId", isPk: true, nullable: false },
            { id: "col_sn_u_2", name: "username", type: "String", unique: true, nullable: false },
            { id: "col_sn_u_3", name: "email", type: "String", unique: true, nullable: false },
            { id: "col_sn_u_4", name: "avatar_url", type: "String", nullable: true },
            { id: "col_sn_u_5", name: "created_at", type: "Date", nullable: false },
          ],
        },
      },
      {
        id: "col_posts",
        type: "tableNode",
        position: { x: 380, y: 50 },
        data: {
          name: "Posts",
          columns: [
            { id: "col_sn_p_1", name: "_id", type: "ObjectId", isPk: true, nullable: false },
            { id: "col_sn_p_2", name: "user_id", type: "ObjectId", isFk: true, nullable: false },
            { id: "col_sn_p_3", name: "caption", type: "String", nullable: true },
            { id: "col_sn_p_4", name: "media_url", type: "String", nullable: true },
            { id: "col_sn_p_5", name: "likes_count", type: "Number", nullable: false },
          ],
        },
      },
      {
        id: "col_comments",
        type: "tableNode",
        position: { x: 710, y: 50 },
        data: {
          name: "Comments",
          columns: [
            { id: "col_sn_c_1", name: "_id", type: "ObjectId", isPk: true, nullable: false },
            { id: "col_sn_c_2", name: "post_id", type: "ObjectId", isFk: true, nullable: false },
            { id: "col_sn_c_3", name: "user_id", type: "ObjectId", isFk: true, nullable: false },
            { id: "col_sn_c_4", name: "text", type: "String", nullable: false },
          ],
        },
      },
      {
        id: "col_followers",
        type: "tableNode",
        position: { x: 50, y: 300 },
        data: {
          name: "Followers",
          columns: [
            { id: "col_sn_f_1", name: "_id", type: "ObjectId", isPk: true, nullable: false },
            { id: "col_sn_f_2", name: "follower_id", type: "ObjectId", isFk: true, nullable: false },
            { id: "col_sn_f_3", name: "following_id", type: "ObjectId", isFk: true, nullable: false },
          ],
        },
      },
    ],
    edges: [
      {
        id: "edge_users_posts",
        source: "col_users",
        target: "col_posts",
        sourceHandle: "source-col_users-col_sn_u_1",
        targetHandle: "target-col_posts-col_sn_p_2",
        type: "smoothstep",
      },
      {
        id: "edge_posts_comments",
        source: "col_posts",
        target: "col_comments",
        sourceHandle: "source-col_posts-col_sn_p_1",
        targetHandle: "target-col_comments-col_sn_c_2",
        type: "smoothstep",
      },
      {
        id: "edge_users_comments",
        source: "col_users",
        target: "col_comments",
        sourceHandle: "source-col_users-col_sn_u_1",
        targetHandle: "target-col_comments-col_sn_c_3",
        type: "smoothstep",
      },
      {
        id: "edge_users_followers",
        source: "col_users",
        target: "col_followers",
        sourceHandle: "source-col_users-col_sn_u_1",
        targetHandle: "target-col_followers-col_sn_f_2",
        type: "smoothstep",
      },
    ],
    viewport: { x: 0, y: 0, zoom: 1 },
  },
};

export default socialNetworkTemplate;
