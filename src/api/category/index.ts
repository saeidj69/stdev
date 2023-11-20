
import axios from "../index";
const baseApiUrl = "api/category/";

export const getCategoriesApi = async () => {
  debugger;
  try {
    const res = await axios.get(baseApiUrl);
    return res
  } catch (err) {
    throw err;
  }
};