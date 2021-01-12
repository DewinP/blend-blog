import { IErrorField } from "../interfaces";

export const toErrorMap = (errors: IErrorField[]) => {
  const errorMap: Record<string, string> = {};
  errors.forEach(({ field, message }) => {
    errorMap[field] = message;
  });

  return errorMap;
};
