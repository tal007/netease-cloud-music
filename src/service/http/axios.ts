import axios from 'axios';

const axiosIns = axios.create({
  headers: {
    'Content-Type': 'application/josn'
  }
})

axiosIns.interceptors.request.use((config) => {
  return config;
}, (error) => {
  console.log(error);
  return Promise.reject(error);
})

axiosIns.interceptors.response.use((response) => {
  return response;
}, (error) => {
  return Promise.reject(error);
})

export default axiosIns