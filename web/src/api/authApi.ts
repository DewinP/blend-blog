import axios from "axios";
import { SERVER } from "../../constants";
import { IAuthUser, IMe, IUser, UserFormData } from "../interfaces";
import { getToken } from "../utils/getToken";

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
  return { user: data.user, errors: data.errors };
};

export const meQuery = async (): Promise<IUser> => {
  let token = getToken();
  let { data } = await axios.get<IMe>(`${SERVER}/auth/`, {
    headers: {
      "x-access-token": token,
    },
  });
  return data.user;
};

export const Logout = () => {
  localStorage.clear();
};
