import { useState } from "react";
import { Method } from "axios";

import { http } from "../ajax/index";

function useURLLoader() {
  const [result, setResult] = useState<null | {}>(null);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<boolean | {}>(false);

  function ajax<T>(url: string, method: Method, data?: any) {
    setLoading(true);
    return http(url, {
      method,
      data,
    })
      .then((response) => {
        setResult(response);
        setLoading(false);
        setLoaded(true);

        return Promise.resolve<T>(response.data);
      })
      .catch((error) => {
        setLoading(false);
        setLoaded(true);
        setError(error);

        return Promise.reject(error);
      });
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
