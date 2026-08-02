import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

import { isValidObjectId } from "mongoose"
import { 
  createProjectService,
  getProjectByIdService,
  getProjectsService,
  updateProjectService,
  deleteProjectService 
} from "../services/project.service.js";
import { ApiError } from "../utils/ApiError.js";

const createProject = asyncHandler(async(req,res)=>{
  const {name,description,databaseType,isArchived} = req.body;
  const userId = req.user._id;
  const response = await createProjectService(userId,name,description,databaseType,isArchived);

  return res.status(201).json(
    new ApiResponse(201,response,"Successfully created a New Project")
  )
})

const getProjectById = asyncHandler(async(req,res)=>{
    const userId = req.user._id;
    const {id} = req.params;

    const project = await getProjectByIdService(id,userId)

    return res.status(200).json(
        new ApiResponse(200,project, "fetched project by id successful")
    )
   

})

const getProjects = asyncHandler(async(req,res)=>{
  const userId = req.user._id;

  if(!isValidObjectId(userId)){
    throw new ApiError(401,"Invalid user ID")
  }

  const projects = await getProjectsService(userId)

   return res.status(200).json(
        new ApiResponse(200,projects, "fetched projects successful")
    )
})

const updateProject = asyncHandler(async(req,res)=>{
  const { id } = req.params;
  const userId = req.user._id;
  const { name, description, databaseType } = req.body;

  const updatedProject = await updateProjectService(id, userId, { name, description, databaseType });

  return res.status(200).json(
    new ApiResponse(200, updatedProject, "Project updated successfully")
  );
})

const deleteProject = asyncHandler(async(req,res)=>{
  const { id } = req.params;
  const userId = req.user._id;

  const deletedProject = await deleteProjectService(id, userId);

  return res.status(200).json(
    new ApiResponse(200, deletedProject, "Project deleted successfully")
  );
})

export {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject
};