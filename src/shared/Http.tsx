import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export class Http {
  instance: AxiosInstance;
  constructor(baseURL: string) {
    this.instance = axios.create({ baseURL });
  }
  get<R = unknown>(
    url: string,
    query?: Record<string, string>,
    config?: Omit<AxiosRequestConfig, "params" | "url" | "method">,
  ) {
    return this.instance.request<R>({ ...config, url, params: query, method: "get" });
  }
  post<R = unknown>(
    url: string,
    data?: Record<string, JSON>,
    config?: Omit<AxiosRequestConfig, "url" | "data" | "method">,
  ) {
    return this.instance.request<R>({ ...config, url, data, method: "post" });
  }
  patch<R = unknown>(
    url: string,
    data?: Record<string, JSON>,
    config?: Omit<AxiosRequestConfig, "url" | "data" | "method">,
  ) {
    return this.instance.request<R>({ ...config, url, data, method: "patch" });
  }
  delete<R = unknown>(
    url: string,
    query?: Record<string, string>,
    config?: Omit<AxiosRequestConfig, "params" | "url" | "method">,
  ) {
    return this.instance.request<R>({ ...config, url, params: query, method: "delete" });
  }
}

export const http = new Http("/api/v1");

http.instance.interceptors.request.use();
http.instance.interceptors.response.use();
