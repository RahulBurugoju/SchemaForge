import { createSlice } from "@reduxjs/toolkit";
import {
  fetchProjectById,
  fetchProjects,
  updateProject,
  deleteProject,
  createProject,
} from "./project.Thunk.js";

//  .addCase(.pending,(state, action)=>{
// state.loading = true,
//                 state.error = null})
//  .addCase(.fulfilled,(state, action)=>{})
//  .addCase(.rejected,(state, action)=>{})

const initialState = {
  projects: [],
  currentProject: null,
  loading: false,
  error: null,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    clearCurrentproject: (state) => {
      state.currentProject = null;
      state.loading = false;
    },
    clearProjectError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // --------------------create project--------------------------------
      .addCase(createProject.pending, (state) => {
        ((state.loading = true), (state.error = null));
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.currentProject = action.payload?.data;
        ((state.loading = false), (state.error = null));
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //---------------------------fetch all projects ------------------------------
      .addCase(fetchProjects.pending, (state) => {
        ((state.loading = true), (state.error = null));
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.projects = action.payload?.data;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.projects = [];
      })
      // ----------------------fetch by Id-------------------------------
      .addCase(fetchProjectById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.currentProject = action.payload?.data || action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //----------update-------------------
      .addCase(updateProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const updated = action.payload.data;

        state.currentProject = updated;

        state.projects = state.projects.map((project) =>
          project._id === updated._id ? updated : project,
        );
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ----------delete-------------------
      .addCase(deleteProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const deletedId = action.meta.arg;

        state.projects = state.projects.filter(
          (project) => project._id !== deletedId,
        );

        state.currentProject = null;
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentproject, clearProjectError } = projectSlice.actions; 

export default projectSlice.reducer;
