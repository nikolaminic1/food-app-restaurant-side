import { Response } from "../../service/Response";
import { Product } from "./restaurants";

export interface ProductDetailResponse extends Response {
  product: Product;
}

export interface ProductsListResponse extends Response {
  products: Product[];
}
