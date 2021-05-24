import axiosIns from './axios';

export const fetchFileList = (url: string) => {
  return axiosIns
    .get(url)
    .then(res => res)
}