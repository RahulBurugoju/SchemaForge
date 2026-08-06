import cloneTemplate from "./cloneTemplate.js";
import generateIds from "./generateIds.js";

/**
 * Prepares a new project payload by cloning a template, generating fresh IDs, and building project data.
 * 
 * @param {Object} template - Selected template object
 * @param {string} projectName - User-defined project name
 * @param {Object} options - Additional options (description, databaseType override, etc.)
 * @returns {Object} Project payload ready for createProject API dispatch
 */
export default function createProjectFromTemplate(template, projectName, options = {}) {
  if (!template) return null;

  const cloned = cloneTemplate(template);
  const processedTemplate = generateIds(cloned);

  return {
    projectName: projectName || template.name || "New Project",
    description: options.description || template.description || "",
    databaseType: options.databaseType || template.databaseType || "mysql",
    canvasData: processedTemplate.canvasData || {
      nodes: [],
      edges: [],
      viewport: { x: 0, y: 0, zoom: 1 },
    },
    isArchived: false,
  };
}
