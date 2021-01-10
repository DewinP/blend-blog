import { HttpStatusEnum } from "../types";

export class HttpExeption {
  status: HttpStatusEnum;
  message: string;
  constructor(code: HttpStatusEnum, msg: string) {
    this.status = code;
    this.message = msg;
  }
}
