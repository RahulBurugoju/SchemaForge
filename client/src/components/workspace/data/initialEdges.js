 const initialEdges = [
  {
    id: "edge-users-posts",
    source: "1",
    target: "2",
    sourceHandle: "source-id",
    targetHandle: "target-user_id",
    animated: true,
    style: { stroke: "#38BDF8", strokeWidth: 2 },
  },
  {
    id: "edge-posts-comments",
    source: "2",
    target: "3",
    sourceHandle: "source-id",
    targetHandle: "target-post_id",
    animated: true,
    style: { stroke: "#38BDF8", strokeWidth: 2 },
  },
];


export default initialEdges
