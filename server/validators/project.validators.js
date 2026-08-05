import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Project } from "../models/project.model.js";

const validateCreateProject = (req,res,next)=>{
    const {projectName} = req.body;

    if(!projectName?.trim()){
        throw new ApiError(400,"Project name is required")
    }
    next()
}

const validateUpdateProject = asyncHandler(async (req, res, next) => {
    const { projectName, description, databaseType,canvasData } = req.body;
    const { id: projectId } = req.params;

    const fieldsToUpdate = {};
    if (projectName !== undefined) fieldsToUpdate.projectName = projectName;
    if (description !== undefined) fieldsToUpdate.description = description;
    if (databaseType !== undefined) fieldsToUpdate.databaseType = databaseType;
    if (canvasData !== undefined) fieldsToUpdate.canvasData = canvasData;

    if (Object.keys(fieldsToUpdate).length === 0) {
        throw new ApiError(400, "At least one field (projectName, description, databaseType) is required for update");
    }

    if (projectName) {
        if (!projectName.trim()) {
            throw new ApiError(400, "Project name cannot be empty");
        }
        const existingProject = await Project.findOne({
            projectName: projectName.trim(),
            _id: { $ne: projectId }
        });
        if (existingProject) {
            throw new ApiError(409, "Project with this name already exists");
        }
    }

    next();
});

export {validateCreateProject,validateUpdateProject}