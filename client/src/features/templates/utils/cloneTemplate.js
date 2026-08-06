/**
 * Clones a template object safely without mutating the original.
 * 
 * @param {Object} template - Template object to clone
 * @returns {Object|null} Deep cloned template object
 */
export default function cloneTemplate(template) {
  if (!template) return null;
  return typeof structuredClone === "function"
    ? structuredClone(template)
    : JSON.parse(JSON.stringify(template));
}
