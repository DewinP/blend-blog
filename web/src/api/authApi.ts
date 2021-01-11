import axios from "axios";
import { SERVER } from "../../constants";
import { UserFormData } from "../../types";

export const Signup = async (FormData: UserFormData) => {
  const { data } = await axios.post(`${SERVER}/auth/signup`, FormData);
  return data;
};

export const Login = async (FormData: UserFormData) => {
  const { data } = await axios.post(`${SERVER}/auth/login`, FormData);
  console.log("data here", data);
  return data;
};
