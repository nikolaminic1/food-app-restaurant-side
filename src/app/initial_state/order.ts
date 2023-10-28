import {
  OrderDetailResponse,
  OrdersListResponse,
} from "../models/responseModels/order";
import { Status } from "../service/Status";

export const orderListState: OrdersListResponse = {
  orders: [],
  status: Status.IDLE,
  error: undefined,
  statusCode: 0,
  message: "",
  timeStamp: 0,
};

export const orderDetailState: OrderDetailResponse = {
  order: undefined,
  status: Status.IDLE,
  error: undefined,
  statusCode: 0,
  message: "",
  timeStamp: 0,
};
