import { useState } from "react";
import { Method } from "axios";

function useURLLoader() {
  const [result, setResult] = useState<null | {}>(null);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<boolean | {}>(false);

  function ajax<T>(url: string, method: Method, data?: any) {
    setLoading(true);
  }

  return {
    ajax,
    loading,
    loaded,
    result,
    error,
    setLoading,
  };
}

export default useURLLoader;
