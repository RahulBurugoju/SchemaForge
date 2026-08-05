import { MarkerType } from "@xyflow/react";

export default function createRelationship(params, options = {}) {
  const extractColumnId = (handleId, nodeId) => {
    if (!handleId) return "";
    let cleaned = handleId.replace(/^(source|target)-/, "");
    if (nodeId && cleaned.startsWith(`${nodeId}-`)) {
      cleaned = cleaned.replace(`${nodeId}-`, "");
    }
    return cleaned;
  };

  const sourceColId = extractColumnId(params.sourceHandle, params.source);
  const targetColId = extractColumnId(params.targetHandle, params.target);

  return {
    ...params,
    id: `edge_${params.source}_${params.sourceHandle}_to_${params.target}_${params.targetHandle}`,
    type: "smoothstep",
    animated: false,
    style: { stroke: "#38BDF8", strokeWidth: 2 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: "#38BDF8",
      width: 16,
      height: 16,
    },
    data: {
      relationshipType: options.relationshipType || "one-to-many",
      onDelete: options.onDelete || "CASCADE",
      onUpdate: options.onUpdate || "CASCADE",
      sourceColumnId: sourceColId,
      targetColumnId: targetColId,
    },
  };
}
