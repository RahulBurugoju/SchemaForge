import React, { memo } from "react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  getSmoothStepPath,
} from "@xyflow/react";

function RelationshipEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  selected,
}) {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: 16,
  });

  const relationshipType = data?.relationshipType || "one-to-many";

  const labelMap = {
    "one-to-one": "1 : 1",
    "one-to-many": "1 : ∞",
    "many-to-many": "∞ : ∞",
  };

  const label = labelMap[relationshipType] || "1 : ∞";

  const edgeColor = selected ? "#38BDF8" : "#64748B";
  const markerId = `arrow-${id}`;

  const defaultStyle = {
    stroke: edgeColor,
    strokeWidth: selected ? 3 : 2,
    filter: selected ? "drop-shadow(0 0 4px rgba(56, 189, 248, 0.4))" : "none",
    transition: "stroke 0.2s, stroke-width 0.2s, filter 0.2s",
    ...style,
  };

  return (
    <>
      <svg style={{ position: "absolute", top: 0, left: 0, width: 0, height: 0, pointerEvents: "none" }}>
        <defs>
          <marker
            id={markerId}
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill={edgeColor} />
          </marker>
        </defs>
      </svg>

      <BaseEdge
        id={id}
        path={edgePath}
        style={defaultStyle}
        markerEnd={`url(#${markerId})`}
      />

      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: "all",
          }}
          className="nodrag nopan"
        >
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold select-none border backdrop-blur-md shadow-lg transition-all duration-200 cursor-pointer ${
              selected
                ? "bg-slate-900 text-sky-300 border-sky-400 shadow-sky-950/50 ring-2 ring-sky-500/30 scale-110"
                : "bg-slate-950/90 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white"
            }`}
          >
            {label}
          </span>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}

export default memo(RelationshipEdge);
