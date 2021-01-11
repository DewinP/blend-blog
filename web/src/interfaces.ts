export interface IPost {
  id: string;
  title: string;
  body: string;
  creatorId: string;
  createdAt: string;
  updatedAt: string;
  creator: IUser;
}

export interface IUser {
  id: string;
  username: string;
}

export interface IPostInput {
  title: string;
  body: string;
}

export interface ILoginData {
  token: string;
  user: any;
}
