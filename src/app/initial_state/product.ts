import {
  ProductDetailResponse,
  ProductsListResponse,
} from "../models/responseModels/product";
import { Status } from "../service/Status";

export const productsListState: ProductsListResponse = {
  products: [],
  next: "",
  previous: "",
  count: 1,
  status: Status.IDLE,
  error: undefined,
  statusCode: 0,
  message: "",
  timeStamp: 0,
};

export const productDetailState: ProductDetailResponse = {
  product: {
    id: 0,
    nameOfProduct: "",
    codeOfProduct: "",
    aboutProduct: "",
    priceOfProduct: 0,
    discountPrice: 0,
    discountPercentage: 0,
    isOnDiscount: false,
    preparationTime: 0,
    availability: "",
    appendicesCategoryList: [],
    variation: {
      id: 0,
      name: "",
      isRequired: false,
      productVariationList: [],
    },
    productImage: {
      id: 0,
      name_of_image: "",
      dateCreated: 0,
      dateUpdated: 0,
      imageUrl: "",
    },
  },
  status: Status.IDLE,
  error: undefined,
  statusCode: 0,
  message: "",
  timeStamp: 0,
};
