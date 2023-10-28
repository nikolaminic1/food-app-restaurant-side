import {
  CategoryDetailResponse,
  RestaurantDetailResponse,
  RestaurantListResponse,
} from "../models/responseModels/restaurants";
import { Status } from "../service/Status";

export const restaurantsListState: RestaurantListResponse = {
  restaurants: [],
  status: Status.IDLE,
  error: undefined,
  statusCode: 0,
  message: "",
  timeStamp: 0,
};

export const restaurantDetailState: RestaurantDetailResponse = {
  restaurant: {
    id: 0,
    name: "",
    description: "",
    backgroundImage: "",
    logoImage: "",
    priceOfDelivery: 0,
    priceOfOrderForFreeDelivery: 0,
    productCategories: [],
    topSeller: [],
    businessOwner: "",
    businessLocation: {
      id: 0,
      streetName: "",
      buildingNumber: 0,
      flatNumber: 0,
      zipCode: 0,
      cityNumber: "",
    },
    averageRating: 0,
    tags: [],
  },
  status: Status.IDLE,
  error: undefined,
  statusCode: 0,
  message: "",
  timeStamp: 0,
};

export const categoryDetailState: CategoryDetailResponse = {
  category: {
    id: 0,
    nameOfCategory: "",
    descOfCategory: "",
    categoryVisible: false,
    featured: false,
    productList: [],
  },
  status: Status.IDLE,
  error: undefined,
  statusCode: 0,
  message: "",
  timeStamp: 0,
};
