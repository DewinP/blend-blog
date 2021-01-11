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
  email?: string;
  updatedAt?: Date;
  createdAt?: Date;
}

export interface IUserInput {
  email: string;
  password: string;
  username: string;
}
export interface EncodeResult {
  token: string;
  expires: number;
  issued: number;
}
