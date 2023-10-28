import {
  ProductDetailResponse,
  ProductsListResponse,
} from "../models/responseModels/product";
import { Status } from "../service/Status";

export const productsListState: ProductsListResponse = {
  products: [],
  status: Status.IDLE,
  error: undefined,
  statusCode: 0,
  message: "",
  timeStamp: 0,
};

export const productDetailState: ProductDetailResponse = {
  product: undefined,
  status: Status.IDLE,
  error: undefined,
  statusCode: 0,
  message: "",
  timeStamp: 0,
};
