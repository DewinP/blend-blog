export enum HttpStatusEnum {
  SUCCESS = 200,
  CREATED = 201,
  SUCCESS_NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
}

export interface IUser {
  id: string;
  username: string;
}

export interface IUserInput {
  email: string;
  password: string;
  username: string;
}

export interface IPostInput {
  title: string;
  body: string;
}

export interface IFieldError {
  field: string;
  message: string;
}

export interface ILoginRegisterInput {
  username: string;
  email: string;
  password: string;
}
