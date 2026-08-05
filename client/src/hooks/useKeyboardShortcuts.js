import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedNode,
  setSelectedEdge,
} from "../features/canvas/canvas.Slice";
import deleteTable from "../utils/table/deleteTable";
import duplicateTable from "../utils/table/duplicateTable";

export default function useKeyboardShortcuts({ canvasState }) {
  const dispatch = useDispatch();
  const selectedNode = useSelector((state) => state.canvas.selectedNode);
  const selectedEdge = useSelector((state) => state.canvas.selectedEdge);
  const { nodes = [], edges = [], setNodes, setEdges } = canvasState || {};

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore shortcut keys if user is actively typing in an input form element
      const activeEl = document.activeElement;
      const isTyping =
        activeEl &&
        (["INPUT", "TEXTAREA", "SELECT"].includes(activeEl.tagName) ||
          activeEl.isContentEditable);

      // Escape: Clear active selection always
      if (e.key === "Escape") {
        dispatch(setSelectedNode(null));
        dispatch(setSelectedEdge(null));
        return;
      }

      // If user is actively typing inside an input box, skip canvas action shortcuts
      if (isTyping) return;

      // Delete / Backspace: Delete selected node or selected relationship edge
      if (e.key === "Delete" || e.key === "Backspace") {
        if (selectedEdge?.id) {
          e.preventDefault();
          const updatedEdges = edges.filter((edge) => edge.id !== selectedEdge.id);
          setEdges(updatedEdges);
          dispatch(setSelectedEdge(null));
        } else if (selectedNode?.id) {
          e.preventDefault();
          const { nodes: updatedNodes, edges: updatedEdges } = deleteTable(
            nodes,
            edges,
            selectedNode.id
          );
          setNodes(updatedNodes);
          setEdges(updatedEdges);
          dispatch(setSelectedNode(null));
        }
        return;
      }

      // Ctrl + D / Cmd + D: Duplicate selected table node
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "d") {
        if (selectedNode?.id) {
          e.preventDefault();
          const newNodes = duplicateTable(nodes, selectedNode.id);
          setNodes(newNodes);

          const duplicatedNode = newNodes[newNodes.length - 1];
          if (duplicatedNode && duplicatedNode.id !== selectedNode.id) {
            dispatch(setSelectedNode(duplicatedNode));
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    dispatch,
    selectedNode,
    selectedEdge,
    nodes,
    edges,
    setNodes,
    setEdges,
  ]);
}
