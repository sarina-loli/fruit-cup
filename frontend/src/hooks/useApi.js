import { useCallback, useEffect, useState } from "react";

/**
 * Runs `fetcher(signal)` on mount (and on `reload`) and tracks its state.
 * status: "loading" | "success" | "error"
 */
export default function useApi(fetcher) {
  const [state, setState] = useState({ status: "loading", data: null });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setState((prev) => (prev.status === "loading" ? prev : { status: "loading", data: null }));

    fetcher(controller.signal)
      .then((data) => setState({ status: "success", data }))
      .catch((error) => {
        if (controller.signal.aborted) return;
        console.warn("Fruit Cup: API request failed.", error);
        setState({ status: "error", data: null });
      });

    return () => controller.abort();
  }, [fetcher, attempt]);

  const reload = useCallback(() => setAttempt((n) => n + 1), []);
  return { ...state, reload };
}
