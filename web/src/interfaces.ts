export interface IPost {
  id: string;
  title: string;
  body: string;
  creatorId: string;
  createdAt: string;
  updatedAt: string;
  creator: IUser;
}

export interface UserFormData {
  username: string;
  password: string;
}

export interface IPostFav {
  favorites: string[];
}
export interface IUser {
  id: string;
  username: string;
  email: string;
  posts: IPost[];
  createdAt: string;
}
export interface IPostInput {
  title: string;
  body: string;
  id?: string;
}

export interface IErrorField {
  field: string;
  message: string;
}

export interface IMe {
  notAuth: null;
  user: IUser;
}

export interface IAuthUser {
  token?: string;
  user?: IUser;
  errors?: IErrorField[];
}

export interface IUserContext {
  user?: IUser;
  posts?: IPost;
  favorites?: IPostFav;
}

export interface IContextType {
  setUser: (user: IUser) => void;
  user: IUser;
}

export interface IPostResponse {
  post: IPost;
  errors: IErrorField[];
}
