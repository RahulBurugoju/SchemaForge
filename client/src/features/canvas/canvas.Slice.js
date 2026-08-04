import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedNode: null,
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
    name:"canvas",
    initialState,
    reducers:{
        setSelectedNode(state,action){
            state.selectedNode = action.payload
        },
        setActiveTool(state,action){
            state.activeTool = action.payload
        },
        setViewport(state,action){
            state.viewport = action.payload;
        }
    }
})

export const {setSelectedNode,setActiveTool,setViewport} = canvasSlice.actions

export default canvasSlice.reducer