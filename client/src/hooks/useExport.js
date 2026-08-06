import { useState, useMemo, useCallback, useEffect } from "react";
import { exportSchema } from "../services/export.service.js";
import validateSchema from "../exportENG/helpers/validateSchema.js";
import copyToClipboard from "../utils/export/copyToClipboard.js";
import downloadFile from "../utils/export/downloadFile.js";
import fileNameGenerator from "../utils/export/fileNameGenerator.js";

/**
 * Custom React hook for managing export state and operations.
 * Handles database selection, format selection, code generation, validation, copying, downloading, and error/empty states.
 * 
 * @param {Object} canvasData - The current canvas state containing { nodes, edges }
 * @param {string} initialDb - Initial selected database (default: "mysql")
 * @returns {Object} Export state and handler functions
 */
export const useExport = (canvasData = { nodes: [], edges: [] }, initialDb = "mysql") => {
  const [selectedDb, setSelectedDb] = useState(initialDb);
  const [selectedFormat, setSelectedFormat] = useState("sql");
  const [copied, setCopied] = useState(false);
  const [retryNonce, setRetryNonce] = useState(0);

  // Auto-switch default format when database changes
  useEffect(() => {
    if (selectedDb === "mongodb") {
      setSelectedFormat("mongoose");
    } else {
      setSelectedFormat("sql");
    }
  }, [selectedDb]);

  const isEmpty = useMemo(() => {
    return !canvasData || !canvasData.nodes || canvasData.nodes.length === 0;
  }, [canvasData]);

  // Validate canvas schema
  const validation = useMemo(() => {
    if (isEmpty) return { valid: true, errors: [], warnings: [] };
    return validateSchema(canvasData);
  }, [canvasData, isEmpty]);

  // Generate exported code & catch errors
  const { generatedCode, error } = useMemo(() => {
    if (isEmpty) {
      return { generatedCode: "", error: null };
    }
    if (!validation.valid) {
      const errText = `Schema Validation Error:\n${validation.errors.map((e) => `- ${e}`).join("\n")}`;
      return { generatedCode: "", error: errText };
    }

    try {
      if (selectedFormat === "json") {
        return { generatedCode: JSON.stringify(canvasData, null, 2), error: null };
      }
      const code = exportSchema(canvasData, selectedDb);
      return { generatedCode: code, error: null };
    } catch (err) {
      return { generatedCode: "", error: err.message || "Failed to generate export script." };
    }
    // retryNonce forces re-evaluation if user clicks Retry
  }, [canvasData, selectedDb, selectedFormat, validation, isEmpty, retryNonce]);

  // Calculate metadata statistics
  const lineCount = useMemo(() => {
    if (!generatedCode) return 0;
    return generatedCode.split("\n").length;
  }, [generatedCode]);

  const characterCount = useMemo(() => {
    return generatedCode ? generatedCode.length : 0;
  }, [generatedCode]);

  // Retry handler
  const handleRetry = useCallback(() => {
    setRetryNonce((prev) => prev + 1);
  }, []);

  // Copy handler
  const handleCopy = useCallback(async () => {
    if (!generatedCode || isEmpty || error) return false;
    const success = await copyToClipboard(generatedCode);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
    return success;
  }, [generatedCode, isEmpty, error]);

  // Download handler
  const handleDownload = useCallback((projectName = "") => {
    if (!generatedCode || isEmpty || error) return;
    const filename = fileNameGenerator(projectName, selectedDb, selectedFormat);
    const mimeType = selectedFormat === "json" ? "application/json;charset=utf-8" : "text/plain;charset=utf-8";
    downloadFile(generatedCode, filename, mimeType);
  }, [generatedCode, selectedDb, selectedFormat, isEmpty, error]);

  return {
    selectedDb,
    setSelectedDb,
    selectedFormat,
    setSelectedFormat,
    generatedCode,
    validation,
    isEmpty,
    error,
    copied,
    lineCount,
    characterCount,
    retry: handleRetry,
    copy: handleCopy,
    download: handleDownload,
  };
};

export default useExport;
