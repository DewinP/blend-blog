import axios from "axios";
import { SERVER } from "../../constants";
import { IPost, IPostInput, IPostResponse } from "../interfaces";
import { getToken } from "../utils/getToken";

export const createNewPost = async (
  FormData: IPostInput
): Promise<IPostResponse> => {
  let token = getToken();
  let { data } = await axios.post(`${SERVER}/posts`, FormData, {
    headers: {
      "x-access-token": token,
    },
  });
  return data;
};

export const UpdatePost = async (
  postInput: IPostInput
): Promise<IPostResponse> => {
  let token = getToken();
  let { data } = await axios.put(
    `${SERVER}/posts/${postInput.id}`,
    { title: postInput.title, body: postInput.body },
    {
      headers: {
        "x-access-token": token,
      },
    }
  );
  return data;
};

export const fetchAllPosts = async () => {
  const { data } = await axios.get(`${SERVER}/posts`);
  let posts: IPost[] = data.posts;
  return posts;
};

export const postById = async (id: string): Promise<IPostResponse> => {
  const { data } = await axios.get<IPostResponse>(`${SERVER}/posts/${id}`);
  return data;
};

export const deleteById = async (id: string): Promise<boolean> => {
  let token = getToken();
  const { data } = await axios.delete<boolean>(`${SERVER}/posts/${id}`, {
    headers: {
      "x-access-token": token,
    },
  });
  return data;
};
