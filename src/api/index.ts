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
    "Content-Type": "application/json"
  },
};

const axiosInstance = axios.create(config);

const token = () => typeof window === "object" && localStorage.getItem("token");

axiosInstance.interceptors.request.use((config) => {
  debugger
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

    console.log(store);
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
         // localStorage.clear();
          //window.location.href = "/logout";
          // let rf=localStorage.getItem("rfToken");
          // originalRequest._retry = true;
          // return axios.post(baseURL+'/auth/Authenticate/refreshToken?refreshToken='+rf).then((res)=>{
          //   if(res.status===200){
          //     localStorage.clear();
          //     localStorage.setItem("token", res.data.data.token);
          //     localStorage.setItem("rfToken", res.data.data.refreshToken);
          //     originalRequest.headers.Authorization="Bearer "+res.data.data.token;
          //     return axios(originalRequest);
          //   }
          //   if(res.status===500){
          //     return;
          //   }

          // });
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
