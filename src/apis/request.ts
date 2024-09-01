import { Message } from '@arco-design/web-react';
import axios, { AxiosRequestConfig } from 'axios';

export const WEB_DOMAIN =
  import.meta.env.VITE_API_URL || 'http://localhost:4900';

interface AxiosRequestCustomConfig extends AxiosRequestConfig {
  // 不要将 params stringify
  noStringify?: boolean;
  // 重复请求处理模式
  repeatMode?: 'cancel' | 'none'; // cancel: 重复请求时取消接口请求, none: 不处理重复请求
}

const agent = axios.create({
  timeout: 600000, // 配置超时时间
  baseURL: WEB_DOMAIN,
  // headers: { Accept: "application/json" },
});

export const get = (
  url: string,
  payload?: any,
  config?: AxiosRequestConfig
) => {
  const params = new URLSearchParams(payload);

  const promise = agent.get(url, { params: params, ...config });
  promise.catch((error) => {
    Message.error(error.response.data);
  });
  return promise.then((res) => res.data);
};

export const post = (
  url: string,
  data: any,
  config?: AxiosRequestCustomConfig
) => {
  const payload = data;
  const promise = agent.post(url, payload, config);
  promise.catch((error) => {
    // console.log('promise.catch==>', error);
    Message.error(error.response.data);
  });
  return promise.then((res) => res.data);
};
