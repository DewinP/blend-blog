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
}

export interface IPostInput {
  title: string;
  body: string;
}

export interface IErrorField {
  field: string;
  message: string;
}

export interface IAuthUser {
  token?: string;
  data?: IUserContext;
  errors?: IErrorField[];
}

export interface IUserContext {
  user?: IUser;
  posts?: IPost;
  favorites?: IPostFav;
}

export interface IContextType {
  setUser: (user: IUserContext) => void;
  user: IUserContext;
}
