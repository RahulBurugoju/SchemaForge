/**
 * Copies string text to the user's clipboard.
 * 
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} Resolves to true if successful, false otherwise
 */
export const copyToClipboard = async (text) => {
  if (!text) return false;

  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }

    // Fallback for non-HTTPS or older browsers
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    const successful = document.execCommand("copy");
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.error("Failed to copy to clipboard:", err);
    return false;
  }
};

export default copyToClipboard;
