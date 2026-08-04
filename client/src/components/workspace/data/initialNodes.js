 const initialNodes = [
  {
    id: "1",
    type: "tableNode",
    position: {
      x: 60,
      y: 80,
    },
    data: {
      name: "Users",
      columns: [
        {
          id: "id",
          name: "id",
          type: "INT",
          isPk: true,
        },
        {
          id: "username",
          name: "username",
          type: "VARCHAR(50)",
        },
        {
          id: "email",
          name: "email",
          type: "VARCHAR(255)",
        },
        {
          id: "created_at",
          name: "created_at",
          type: "TIMESTAMP",
        },
      ],
    },
  },
  {
    id: "2",
    type: "tableNode",
    position: {
      x: 420,
      y: 80,
    },
    data: {
      name: "Posts",
      columns: [
        {
          id: "id",
          name: "id",
          type: "INT",
          isPk: true,
        },
        {
          id: "user_id",
          name: "user_id",
          type: "INT",
          isFk: true,
        },
        {
          id: "title",
          name: "title",
          type: "VARCHAR(255)",
        },
        {
          id: "content",
          name: "content",
          type: "TEXT",
        },
      ],
    },
  },
  {
    id: "3",
    type: "tableNode",
    position: {
      x: 780,
      y: 140,
    },
    data: {
      name: "Comments",
      columns: [
        {
          id: "id",
          name: "id",
          type: "INT",
          isPk: true,
        },
        {
          id: "post_id",
          name: "post_id",
          type: "INT",
          isFk: true,
        },
        {
          id: "user_id",
          name: "user_id",
          type: "INT",
          isFk: true,
        },
        {
          id: "comment_text",
          name: "comment_text",
          type: "TEXT",
        },
      ],
    },
  },
];

export default initialNodes
