import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

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
  post<R = unknown>(url: string, data?: any, config?: Omit<AxiosRequestConfig, "url" | "data" | "method">) {
    return this.instance.request<R>({ ...config, url, data, method: "post" });
  }
  patch<R = unknown>(
    url: string,
    data?: Record<string, any>,
    config?: Omit<AxiosRequestConfig, "url" | "data" | "method">,
  ) {
    return this.instance.request<R>({ ...config, url, data, method: "patch" });
  }
  delete<R = unknown>(
    url: string,
    query?: Record<string, any>,
    config?: Omit<AxiosRequestConfig, "params" | "url" | "method">,
  ) {
    return this.instance.request<R>({ ...config, url, params: query, method: "delete" });
  }
}

export const http = new Http("/api/v1");

http.instance.interceptors.request.use(requestConfig => {
  const jwt = localStorage.getItem("jwt");
  requestConfig.headers.Authorization = `Bearer ${jwt}`;
  return requestConfig;
});
http.instance.interceptors.response.use(
  response => {
    console.log(response);
    return response;
  },
  error => {
    if (error.response) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 429) {
        alert("操作过于频繁");
      }
    }
    throw error;
  },
);
