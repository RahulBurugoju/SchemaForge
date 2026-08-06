import { useMemo } from "react";
import templates from "../data/index.js";

/**
 * Custom React hook to retrieve available project templates.
 * 
 * @returns {{ templates: Array, loading: boolean, error: null|string }}
 */
export const useTemplates = () => {
  const availableTemplates = useMemo(() => templates || [], []);

  return {
    templates: availableTemplates,
    loading: false,
    error: null,
  };
};

export default useTemplates;
