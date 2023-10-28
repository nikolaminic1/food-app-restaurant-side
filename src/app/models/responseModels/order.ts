import { Response } from "../../service/Response";

export interface Order {
  id: number;
}

export interface OrderDetailResponse extends Response {
  order: Order | undefined;
}

export interface OrdersListResponse extends Response {
  orders: Order[];
}
