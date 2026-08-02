import { createAsyncThunk } from "@reduxjs/toolkit";
import projectServices from "../../services/project.services";

const createProject = createAsyncThunk('project/createProjet',
    async(projectDetails,thunkAPI)=>{
        try {
           return await projectServices.createProject(projectDetails)
        } catch (error) {
           return thunkAPI.rejectWithValue(
            error.response?.data?.message || "Faild to create a project"
           ) 
        }
    }
)

const fetchProjects = createAsyncThunk('project/fetchProjects',
    async(_,thunkAPI)=>{
        try {
            return await projectServices.getProjects()
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to fetch projects"
            ) 
        }
    }
)

const fetchProjectById = createAsyncThunk('project/fetchProjectById',
    async(projectId,thunkAPI)=>{
        try {
            return await projectServices.getProjectById(projectId)
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to fetch project"
            ) 
        }
    }
)

const updateProject = createAsyncThunk('project/updateProject',
    async(data,thunkAPI)=>{
        try {
            return await projectServices.updateProject(data.projectId,data.projectData)
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to update project"
            ) 
        }
    }
)

const deleteProject = createAsyncThunk('project/deleteProject',
    async(projectId,thunkAPI)=>{
        try {
            return await projectServices.deleteProject(projectId)
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to delete project"
            ) 
        }
    }
)


export {fetchProjectById,fetchProjects,updateProject,deleteProject,createProject}