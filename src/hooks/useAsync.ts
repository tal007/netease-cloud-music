import { useCallback, useState } from "react";
import { useMountedRef } from "./useMountedRef";

interface State<D> {
  error: Error | null;
  data: D | null;
  status: "idle" | "loading" | "error" | "success";
}

const defaultInitialState: State<null> = {
  status: "idle",
  data: null,
  error: null,
};

const defaultInitialConfig = {
  throwOnError: false,
};

export const useAsync = <D>(
  initalState?: State<D>,
  initalConfig?: typeof defaultInitialConfig
) => {
  const config = { ...defaultInitialConfig, ...initalConfig };
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initalState,
  });
  const mountedRef = useMountedRef();

  const setData = useCallback(
    (data: D) =>
      setState({
        data,
        error: null,
        status: "success",
      }),
    []
  );

  const setError = useCallback(
    (error: Error) =>
      setState({
        error,
        data: null,
        status: "error",
      }),
    []
  );

  const run = useCallback(
    (promise: Promise<D>) => {
      if (!promise) {
        throw new Error(`${promise} 必须是一个 Promise 类型的数据`);
      }
      if (mountedRef.current)
        setState((prevState) => ({ ...prevState, status: "loading" }));
      return promise
        .then((data) => {
          if (mountedRef.current) setData(data);
          return data;
        })
        .catch((error) => {
          if (mountedRef.current) setError(error);
          if (config.throwOnError) return Promise.reject(error);
          return Promise;
        });
    },
    [config.throwOnError, mountedRef, setData, setError]
  );

  return {
    run,
    setData,
    setError,
    isIdle: state.status === "idle",
    isLoading: state.status === "loading",
    isError: state.status === "error",
    isSuccess: state.status === "success",
    ...state,
  };
};
