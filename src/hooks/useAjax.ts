import Axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { message } from "antd";
import { useAuth } from "context/authContext";
import { useCallback } from "react";

export interface AxiosResponse<T = any> {
  data: T; // 服务端返回的数据
  status: number; // HTTP 状态码
  statusText: string; // 状态消息
  headers: any; // 响应头
  config: AxiosRequestConfig; // 请求配置对象
  request?: any; // 请求的 XMLHttpRequest 对象实例
}

const request: AxiosInstance = Axios.create({
  baseURL: "https://netease-cloud-music-wheat.vercel.app/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
});

request.interceptors.response.use(
  (response) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {
      status,
      config: { url },
      data,
      data: { code },
    } = response;
    if (status === 200) {
      if (code !== 200) {
        // message.success(`${url}--数据请求成功，但是内部状态为 ${code} `)
        // message.warning(data?.message || '登陆失败');
        return Promise.reject<AxiosResponse>(response);
      }
      // message.success(`${url}--数据请求成功`)
      return Promise.resolve<AxiosResponse>(response);
    }
    return Promise.reject<AxiosResponse>(response);
  },
  (err) => {
    const { status } = err;
    console.log(err);
    // message.warn(`HTTP状态 ${status}, ${err.response.data.messag}`);
    // switch (status) {
    //   case 404:
    // }
    return Promise.reject<AxiosResponse>(err.response);
  }
);

interface Config extends RequestInit {
  data?: object;
  cookie?: string;
}

export const ajax = async (
  endpoint: string,
  { data, cookie, headers, ...customConfig }: Config = {}
) => {
  const config: AxiosRequestConfig = {
    url: endpoint,
    method: "GET",
    headers: headers || {
      // Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json;charset=UTF-8" : "",
    },
    withCredentials: true,
    ...(customConfig as AxiosRequestConfig),
  };

  if (config.method?.toUpperCase() === "GET") {
    if (data) {
      if (cookie)
        data = { ...data, ...{ cookie: `${encodeURIComponent(cookie)}` } };
      config.params = data;
    } else {
      if (cookie) config.url += `?cookie=${encodeURIComponent(cookie)}`;
    }
  }
  if (config.method?.toUpperCase() === "POST") {
    config.data = data;
    if (cookie) config.url += `?cookie=${encodeURIComponent(cookie)}`;
  }
  console.log(config);

  if (config)
    return request(config).then((response) => Promise.resolve(response.data));
};

export const useAjax = () => {
  const { user } = useAuth();

  return useCallback(
    (...[endpoint, config]: Parameters<typeof ajax>) =>
      ajax(endpoint, { ...config, cookie: user?.cookie }),
    [user?.cookie]
  );
};