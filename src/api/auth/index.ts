import axios from "axios";
import store from "../../app/store";
import {
  activeLoading,
  deActiveLoaing,
} from "../../features/loading/loadingSlice";

let baseUrl = process.env.REACT_APP_BASE_API;

export const loginApi = async (data: any) => {
  debugger;
  store.dispatch(activeLoading());

  try {
    const res = await axios.post(baseUrl + "api/user/sign-in/", data);
    store.dispatch(deActiveLoaing());
    return res.data;
  } catch (err) {
    store.dispatch(deActiveLoaing());
    throw err;
  }
};

export const RegisterApi = async (data: any) => {
  debugger;
  const formData = new FormData();
  formData.append("first_name", data.firstName);
  formData.append("last_name", data.lastName);
  formData.append("email", data.email);
  formData.append("password", data.password);
  formData.append("image", data.image);

  try {
    const res = await axios.post(baseUrl + `api/user/sign-up/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    //localStorage.clear();
    //localStorage.setItem("token", res.data.data.token);
    //localStorage.setItem("rfToken", res.data.data.refreshToken);
    return res.data;
  } catch (err) {
    throw err;
  }
};


