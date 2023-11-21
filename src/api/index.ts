import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { notification } from "antd";
import {
  activeLoading,
  deActiveLoaing,
} from "../features/loading/loadingSlice";
import store from "../app/store";

let baseURL = "https://rn-api.codebnb.me/";

const config: AxiosRequestConfig = {
  baseURL: `${baseURL}`,
  headers: {
    "Content-Type": "application/json",
  },
};

const axiosInstance = axios.create(config);

const token = () => typeof window === "object" && localStorage.getItem("token");

axiosInstance.interceptors.request.use((config) => {
  
  store.dispatch(activeLoading());
  //document.body.classList.add('loading-indicator');
  if (token()) {
    config.headers.Authorization = `JWT ${token()}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // document.body.classList.remove('loading-indicator');

    
    store.dispatch(deActiveLoaing());
    return response;
  },
  (error: AxiosError) => {
    // document.body.classList.remove('loading-indicator');
    store.dispatch(deActiveLoaing());

    const { response } = error;
    if (response) {
      const originalRequest = response.config;
      const status = response.status;
      if (status) {
        if (status === 400) {
          const errorMessage =
            (response.data as any)?.message || "Unknown error";
          notification.error({
            message: errorMessage,
            placement: "bottomLeft",
          });
        } else if (status === 403) {
          const errorMessage =
            (response.data as any)?.Error?.Message || "Unknown error";
          notification.error({
            message: errorMessage,
            description: "",
            placement: "bottomRight",
          });
        } else if (status === 401) {
          localStorage.clear();
          window.location.href = "/login";
        } else {
          const errorMessage =
            (response.data as any)?.Error?.Message || "Unknown error";
          notification.error({
            message: errorMessage,
            description: "",
            placement: "bottomRight",
          });
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
