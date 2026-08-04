/**
 * Validates whether a proposed ReactFlow connection is allowed.
 *
 * Rules enforced:
 * 1. Self connections (source === target) are forbidden.
 * 2. Duplicate connections between the same source and target are forbidden.
 *
 * @param {Object} connection - ReactFlow Connection object ({ source, target, sourceHandle, targetHandle })
 * @param {Array} edges - Current list of active ReactFlow edges
 * @returns {boolean} - true if connection is valid, false otherwise
 */
export default function validateConnection(connection, edges = []) {
  if (!connection || !connection.source || !connection.target) {
    return false;
  }

  // Rule 1: Prevent self connection (e.g. Users -> Users)
  if (connection.source === connection.target) {
    return false;
  }

  // Rule 2: Prevent duplicate connections between source & target
  const isDuplicate = edges.some(
    (edge) =>
      (edge.source === connection.source && edge.target === connection.target) ||
      (edge.source === connection.target && edge.target === connection.source)
  );

  if (isDuplicate) {
    return false;
  }

  return true;
}
