import { HttpStatusEnum } from "../types";

export class HttpExeption {
  status: HttpStatusEnum;
  message: string;
  data: any;
  constructor(code: HttpStatusEnum, msg: string, data?: any) {
    this.status = code;
    this.message = msg;
    this.data = data;
  }
}
