import axios from "../index";
const baseApiUrl = "api/post/crud/";

export const getAllPosts = async (pageSize: number, pageIndex: number) => {
  
  try {
    const res = await axios.get(
      baseApiUrl + `?limit=${pageSize}&offset=${pageIndex}`
    );
    return res;
  } catch (err) {
    throw err;
  }
};
export const getPostByIdApi = async (data: any) => {
  
  try {
    const res = await axios.get(baseApiUrl + data + "/");
    return res;
  } catch (err) {
    throw err;
  }
};

export const createPostApi = async (data: any) => {
  
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("category", data.category);
  formData.append("image", data.image);
  try {
    const res = await axios.post(baseApiUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error) {}
};
export const updatePostApi = async (data: any, id: any) => {
  
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("category", data.category);
  formData.append("image", data.image);
  try {
    const res = await axios.put(baseApiUrl + id + "/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {}
};
export const deletePostApi = async (id: any) => {
  try {
    const res = await axios.delete(baseApiUrl + id + "/");
    return res;
  } catch (error) {}
};
