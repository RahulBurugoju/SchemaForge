import { useCallback, useEffect, useRef, useState } from "react";

function useAutoSave({
  nodes,
  edges,
  viewport,
  enable = true,
  delay = 1000,
  onSave,
}) {
  const timerRef = useRef(null);
  const isInitialLoadRef = useRef(true);
  const onSaveRef = useRef(onSave);

  const [status, setStatus] = useState("saved");

  useEffect(() => {
    onSaveRef.current = onSave;
  }, [onSave]);

  const forceSave = useCallback(async () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    try {
      setStatus("saving");
      await onSaveRef.current?.();
      setStatus("saved");
    } catch (error) {
      setStatus("error");
      console.error("Manual Save Error:", error);
    }
  }, []);

  useEffect(() => {
    if (!enable) {
      isInitialLoadRef.current = true;
      return;
    }

    if (isInitialLoadRef.current) {
      isInitialLoadRef.current = false;
      return;
    }

    setStatus("unsaved");

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    let isMounted = true;

    timerRef.current = setTimeout(async () => {
      try {
        if (isMounted) setStatus("saving");

        await onSaveRef.current();

        if (isMounted) setStatus("saved");
      } catch (error) {
        if (isMounted) setStatus("error");
        console.error("AutoSave Error:", error);
      }
    }, delay);

    return () => {
      isMounted = false;
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [nodes, edges, viewport, delay, enable]);

  return {
    status,
    hasUnsavedChanges: status === "unsaved" || status === "error",
    forceSave,
  };
}

export default useAutoSave;