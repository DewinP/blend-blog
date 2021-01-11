import { IFieldError, IPostInput } from "../types";

export const validatePost = (options: IPostInput): IFieldError[] | null => {
  if (options.body === " " || options.title === " ") {
    if (options.body)
      return [
        {
          field: "title",
          message: "Title mus not be empty",
        },
      ];
    else
      return [
        {
          field: "body",
          message: "Body must not be empty",
        },
      ];
  }

  if (options.title.length < 5 || options.title.length > 40)
    return [
      {
        field: "title",
        message: "title must be 5 to 40 characters long",
      },
    ];

  return null;
};
