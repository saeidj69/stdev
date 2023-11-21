import axios from "../index";
const baseApiUrl = "api/user/logout/";


export const logoutApi = async (data:any) => {
  
  try {
    const res = await axios.post(baseApiUrl,data);
    //localStorage.clear();
    //localStorage.setItem("token", res.data.data.token);
    //localStorage.setItem("rfToken", res.data.data.refreshToken);
    return res.data;
  } catch (err) {
    throw err;
  }
};
