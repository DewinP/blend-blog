import { IFieldError } from "../types";

interface fieldInput {
  username: string;
  email?: string;
  password: string;
}

export const validateInput = (options: fieldInput): IFieldError[] | null => {
  if (options.email && !options.email.includes("@")) {
    return [
      {
        field: "email",
        message: "invalid email",
      },
    ];
  }

  if (options.username.length <= 3) {
    return [
      {
        field: "username",
        message: "username length must be greater than 3",
      },
    ];
  }

  if (options.password.length <= 3) {
    return [
      {
        field: "password",
        message: "length must be greater than 3",
      },
    ];
  }

  return null;
};
