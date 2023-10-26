import { AxiosRequestConfig } from "axios";
import { Status } from "./Status";

export interface Response {
  status: Status;
  error: string | undefined;
  statusCode: number;
  message: string;
  timeStamp: number;
}
export interface CResponse {
  config: AxiosRequestConfig<any>;
  data: string;
  headers: string;
  request: string;
  status: string;
  statusText: string;
}
