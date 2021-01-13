import axios from "axios";
import { SERVER } from "../../constants";
import { getToken } from "../utils/getToken";

export const userPosts = async () => {
  let token = getToken();
  let { data } = await axios.get(`${SERVER}/users/posts`, {
    headers: {
      "x-access-token": token,
    },
  });
  console.log(data);
  return data;
};
