import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Project } from "../models/project.model.js";

const validateCreateProject = (req,res,next)=>{
    const {name} = req.body;

    if(!name?.trim()){
        throw new ApiError(400,"Project name is required")
    }
    next()
}

const validateUpdateProject = asyncHandler(async (req, res, next) => {
    const { name, description, databaseType } = req.body;
    const { id: projectId } = req.params;

    const fieldsToUpdate = {};
    if (name !== undefined) fieldsToUpdate.name = name;
    if (description !== undefined) fieldsToUpdate.description = description;
    if (databaseType !== undefined) fieldsToUpdate.databaseType = databaseType;

    if (Object.keys(fieldsToUpdate).length === 0) {
        throw new ApiError(400, "At least one field (name, description, databaseType) is required for update");
    }

    if (name) {
        if (!name.trim()) {
            throw new ApiError(400, "Project name cannot be empty");
        }
        const existingProject = await Project.findOne({
            name: name.trim(),
            _id: { $ne: projectId }
        });
        if (existingProject) {
            throw new ApiError(409, "Project with this name already exists");
        }
    }

    next();
});

export {validateCreateProject,validateUpdateProject}