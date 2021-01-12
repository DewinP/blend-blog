import axios from "axios";
import { SERVER } from "../../constants";
import { IAuthUser, UserFormData } from "../interfaces";

export const Signup = async (FormData: UserFormData) => {
  let { data } = await axios.post(`${SERVER}/auth/register`, FormData);
  return data;
};

export const Login = async (FormData: UserFormData): Promise<IAuthUser> => {
  const { data } = await axios.post<IAuthUser>(
    `${SERVER}/auth/login`,
    FormData
  );
  if (data.token) {
    localStorage.setItem("TOKEN_BLEND_BLOG", `Bearer ${data.token}`);
  }
  return data;
};

export const userAuth = async (): Promise<any> => {
  let token = localStorage.getItem("TOKEN_BLEND_BLOG");
  if (!token) return Promise.resolve(null);
  const { data } = await axios.get(`${SERVER}/auth/`, {
    headers: {
      "x-access-token": localStorage.getItem("TOKEN_BLEND_BLOG"),
    },
  });
  return data;
};
