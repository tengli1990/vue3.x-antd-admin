
import { ResponseData } from '@/types/request';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getToken } from './token';
const request: AxiosInstance = axios.create({
  // API 请求的默认前缀
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 6000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json'
  }
});

request.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers.token = getToken();
  return config;
});

request.interceptors.response.use((res: AxiosResponse<any>): AxiosResponse<ResponseData> | Promise<AxiosResponse<ResponseData>> => {
  const responseData: AxiosResponse<ResponseData> = res.data;
  return responseData;
});

export default request;
