import { Project } from "../models/project.model.js"
import { User } from "../models/user.model.js"
import { mongoose,isValidObjectId } from "mongoose"
import { ApiError } from "../utils/ApiError.js"


const createProjectService = async (userId,projectName,description,databaseType,isArchived)=>{
    const existedProject = await Project.findOne({
        owner:userId,
        projectName
    })
    if(existedProject){
        throw new ApiError(409, "Project with this name already exists")
    }

    if(!isValidObjectId(userId)){
        throw new ApiError(400,"Invalid user Id")
    }

    const project =await Project.create({
        projectName,
        description,
        databaseType,
        owner:userId,
        isArchived
    })

    const createdProject = await Project.findById(project._id);

    if(!createdProject){
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    return createdProject;
}

const getProjectByIdService = async (projectId,userId)=>{

    if(!isValidObjectId(projectId)){
        throw new ApiError(400,"Invalid project ID")
    }
    if(!isValidObjectId(userId)){
        throw new ApiError(400,"Invalid userId ID")
    }



    const project = await Project.findOne({
        _id:projectId,
        owner:userId
    });

    if(!project){
        throw new ApiError(404,"Project not found")
    }

    return project;
}

const getProjectsService = async (userId)=>{
    const projects = await Project.aggregate([
        {
            $match:{
                owner: new mongoose.Types.ObjectId(userId)
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "ownerDetails",
                pipeline: [
                    {
                        $project: {
                            userName: 1,
                            fullName: 1,
                            email: 1,
                            avatar: 1
                        }
                    }
                ]
            }
        },
        {
            $addFields: {
                owner: {
                    $first: "$ownerDetails"
                }
            }
        },
        {
            $project: {
                ownerDetails: 0
            }
        }
    ])

    // if (projects.length === 0) {
    //     throw new ApiError(404, "Projects are not found")
    // }

    return projects;
}

const updateProjectService = async (projectId, userId, { projectName, description, databaseType }) => {
    if (!isValidObjectId(projectId)) {
        throw new ApiError(400, "Invalid project ID");
    }
    if (!isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid user ID");
    }

    const fieldsToUpdate = {};
    if (projectName !== undefined) fieldsToUpdate.projectName = projectName.trim();
    if (description !== undefined) fieldsToUpdate.description = description;
    if (databaseType !== undefined) fieldsToUpdate.databaseType = databaseType;

    const updatedProject = await Project.findOneAndUpdate(
        { _id: projectId, owner: userId },
        { $set: fieldsToUpdate },
        { new: true, runValidators: true }
    );

    if (!updatedProject) {
        throw new ApiError(404, "Project not found");
    }

    return updatedProject;
};

const deleteProjectService = async (projectId, userId) => {
    if (!isValidObjectId(projectId)) {
        throw new ApiError(400, "Invalid project ID");
    }
    if (!isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid user ID");
    }

    const deletedProject = await Project.findOneAndDelete({
        _id: projectId,
        owner: userId,
    });

    if (!deletedProject) {
        throw new ApiError(404, "Project not found");
    }

    return deletedProject;
};

export {
    createProjectService,
    getProjectByIdService,
    getProjectsService,
    updateProjectService,
    deleteProjectService
}