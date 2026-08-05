export default function validateConnection(connection, edges = []) {
  if (!connection || !connection.source || !connection.target) {
    return false;
  }

  // Rule 1: Prevent same table connections (e.g. Users -> Users)
  if (connection.source === connection.target) {
    return false;
  }

  // Rule 2: Prevent same column handle connections
  if (
    connection.sourceHandle &&
    connection.targetHandle &&
    connection.sourceHandle === connection.targetHandle
  ) {
    return false;
  }

  // Rule 3: Prevent duplicate connections between the same source & target handles
  const isDuplicate = edges.some(
    (edge) =>
      (edge.source === connection.source &&
        edge.target === connection.target &&
        edge.sourceHandle === connection.sourceHandle &&
        edge.targetHandle === connection.targetHandle) ||
      (edge.source === connection.target &&
        edge.target === connection.source &&
        edge.sourceHandle === connection.targetHandle &&
        edge.targetHandle === connection.sourceHandle)
  );

  if (isDuplicate) {
    return false;
  }

  return true;
}
