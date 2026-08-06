import api from "../lib/axios";

const createProject = async(projectDetails)=>{
    const payload = {
        projectName: projectDetails.projectName || projectDetails.name,
        description: projectDetails.description,
        databaseType: projectDetails.databaseType,
        isArchived: projectDetails.isArchived,
        canvasData: projectDetails.canvasData,
    };
    const response = await api.post('/projects/create-project', payload);
    return response.data;
}

const getProjects = async()=>{
    const response = await api.get('/projects/get-projects')

    return response.data;
}

const getProjectById = async(projectId)=>{
    const response = await api.get(`/projects/get-project/${projectId}`)

    return response.data;
}

const updateProject = async(projectId, projectData)=>{
    const response = await api.patch(`/projects/update-project/${projectId}`,projectData)

    return response.data
}

const deleteProject = async (projectId)=>{
    const response = await api.delete(`/projects/delete-project/${projectId}`)

    return response.data;
}
const projectServices = {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject
}

export default projectServices