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
declare module "axios" {
  interface AxiosRequestConfig {
    _retry?: boolean;
  }
}

const refreshAccessToken = async () => {
  
  // Your logic to refresh the token (making an API call to get a new token)
  const rfToken=localStorage.getItem("refreshToken")
  const response = await axios.post(baseURL+'api/user/refresh/', { refresh: rfToken });

  const newToken = response.data.access;
  const newRefreshToken = response.data.refresh;
  localStorage.setItem('token', newToken);
  localStorage.setItem('refreshToken', newRefreshToken);
  return response.data.access; // Assuming the new token is in response.data.accessToken
};

let isRefreshing = false;
let failedQueue: { resolve: (token: string) => void; reject: (error: any) => void }[] = [];
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
  async (error: AxiosError) => {
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
        } else if (status === 401 && !originalRequest._retry) {
          ;
          
            if (isRefreshing) {
              try {
                const accessToken = await new Promise<string>((resolve, reject) => {
                  failedQueue.push({ resolve, reject });
                });
                originalRequest.headers.Authorization = `JWT ${accessToken}`;
                return axios(originalRequest);
              } catch (err) {
                return Promise.reject(err);
              }
            }
      
            originalRequest._retry = true;
            isRefreshing = true;
      
            try {
              const newToken = await refreshAccessToken();
      
              // Update the Authorization header with the new token for subsequent requests
              axiosInstance.defaults.headers.common['Authorization'] = `JWT ${newToken}`;
      
              isRefreshing = false;
      
              // Retry all queued requests with the new token
              failedQueue.forEach((prom) => {
                prom.resolve(newToken);
              });
              failedQueue = [];
      
              // Retry the original request
              originalRequest.headers.Authorization = `JWT ${newToken}`;
              return axios(originalRequest);
            } catch (error) {
              isRefreshing = false;
              failedQueue.forEach((prom) => {
                prom.reject(error);
              });
              failedQueue = [];
              return Promise.reject(error);
            }
        } 
        else {
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
