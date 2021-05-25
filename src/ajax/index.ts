import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { message } from 'antd'

export interface AxiosResponse<T = any> {
  data: T; // 服务端返回的数据
  status: number; // HTTP 状态码
  statusText: string; // 状态消息
  headers: any; // 响应头
  config: AxiosRequestConfig; // 请求配置对象
  request?: any; // 请求的 XMLHttpRequest 对象实例
}


const request: AxiosInstance = Axios.create({
  baseURL: 'https://netease-cloud-music-wheat.vercel.app/',
  timeout: 5000,
  headers: {
    'Content-Type':'application/json;charset=UTF-8',
  }
});

request.interceptors.response.use(response => {
  const { status, config: { url }, data, data: { code } } = response;
  if (status === 200) {
    if (code !== 200) {
      message.success(`${url}--数据请求成功，但是内部状态为 ${code} `)
      message.warning(data?.message || '登陆失败');
      return Promise.reject<AxiosResponse>(response);
    }
    message.success(`${url}--数据请求成功`)
    return Promise.resolve<AxiosResponse>(response);
  }
  return Promise.reject<AxiosResponse>(response);
}, err => {
  const { status } = err.response;
  message.warn(`HTTP状态 ${status}, ${err.response.data.messag}`)
  // switch (status) {
  //   case 404:
  // }
  return Promise.reject<AxiosResponse>(err.response);
});

export default request;