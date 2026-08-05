import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedNode: null,
  selectedEdge: null,
  activeTool: "select",
  viewport: {
    x: 0,
    y: 0,
    zoom: 1,
  },
  canvasMetadata: {
    grid: true,
    snap: false,
  },
};

const canvasSlice = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    setSelectedNode(state, action) {
      state.selectedNode = action.payload;
      if (action.payload) {
        state.selectedEdge = null;
      }
    },
    setSelectedEdge(state, action) {
      state.selectedEdge = action.payload;
      if (action.payload) {
        state.selectedNode = null;
      }
    },
    setActiveTool(state, action) {
      state.activeTool = action.payload;
    },
    setViewport(state, action) {
      state.viewport = action.payload;
    },
  },
});

export const { setSelectedNode, setSelectedEdge, setActiveTool, setViewport } =
  canvasSlice.actions;

export default canvasSlice.reducer;