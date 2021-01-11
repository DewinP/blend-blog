import axios from "axios";
import { SERVER } from "../../constants";
import { UserFormData } from "../../types";
import { ILoginData } from "../interfaces";
export const Signup = async (FormData: UserFormData) => {
  try {
    let data: ILoginData = await axios.post(
      `${SERVER}/auth/register`,
      FormData
    );
    localStorage.setItem("TOKEN_INFO", data.token);
    return data.user;
  } catch (error) {
    console.log(error);
  }
};

export const Login = async (FormData: UserFormData) => {
  const { data } = await axios.post(`${SERVER}/auth/login`, FormData);
  console.log("data here", data);
  return data;
};
