import axios from "axios";
import { SERVER } from "../../constants";
import { UserFormData } from "../../types";
import { ILoginData, IUser } from "../interfaces";
export const Signup = async (FormData: UserFormData) => {
  try {
    return await axios.post(`${SERVER}/auth/register`, FormData);
  } catch (error) {
    console.log(error);
  }
};

export const Login = async (FormData: UserFormData): Promise<string | any> => {
  const data = await axios.post(`${SERVER}/auth/login`, FormData);
  let userData: ILoginData = data.data;
  localStorage.setItem("TOKEN_BLEND_BLOG", userData.token);
  return data;
};
