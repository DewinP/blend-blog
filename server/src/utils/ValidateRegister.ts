import { IUserInput } from "../types";

export const validateRegister = (options: IUserInput): string | null => {
  if (!options.email.includes("@")) return "Invalid email";

  if (options.username.length <= 4) return "length must be greater than 4";

  if (options.username.includes("@")) return "cannot include an @";

  if (options.password.length <= 3) return "length must be greater than 3";

  return null;
};
