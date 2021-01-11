import axios from "axios";
import { SERVER } from "../../constants";
import { PostFormData } from "../../types";

export const CreateNewPost = async (FormData: PostFormData) => {
  const { data } = await axios.post(`${SERVER}/posts`, FormData);
  return data;
};
