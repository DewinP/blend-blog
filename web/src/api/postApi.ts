import axios from "axios";
import { SERVER } from "../../constants";
import { IPost, IPostInput } from "../interfaces";

export const createNewPost = async (FormData: IPostInput) => {
  try {
    const data = await axios.post(`${SERVER}/posts`, FormData);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllPosts = async () => {
  const { data } = await axios.get(`${SERVER}/posts`);
  let posts: IPost[] = data.posts;
  return posts;
};
