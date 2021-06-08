import { loginOut } from "authProvider";
import { useAuth } from "context/authContext";
import queryString from "query-string";

export const baseUrl = "https://netease-cloud-music-wheat.vercel.app";

interface Config extends RequestInit {
  data?: object;
  token?: string;
}

export const http = async (
  endpoint: string,
  { data, token, headers, credentials, mode, ...customConfig }: Config
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json;charset=UTF-8" : "",
    },
    credentials: "include" as RequestCredentials,
    mode: "cors" as RequestMode,
    ...customConfig,
  };

  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${queryString.stringify(data || {})}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  return window
    .fetch(`${baseUrl}/${endpoint}`, config)
    .then(async (response) => {
      // 未登录或者token失效
      if (response.status === 401) {
        await loginOut();
        window.location.reload();
        return Promise.reject("请重新登录");
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        // fetch 不会抛出401，500等异常，需要手动在不为OK的时候抛出
        // fetch的 catch 只会捕获断网的错误
        return Promise.reject(data);
      }
    });
};

export const useHttp = () => {
  const { user } = useAuth();

  return ([endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token });
};
