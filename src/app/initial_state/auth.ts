import { Status } from "./../service/Status";
import { User } from "../models/auth";
import {
  AddressResponse,
  JWTResponse,
  RegisterResponse,
  UserResponse,
} from "../models/responseModels/auth";

export const userState: UserResponse = {
  user: {
    id: 1,
    name: "",
    email: "",
  },
  status: Status.IDLE,
  error: undefined,
  statusCode: 0,
  message: "",
  timeStamp: 0,
};

export const jwtResponse: JWTResponse = {
  access: "",
  refresh: "",
  isAuthenticated: false,
  status: Status.IDLE,
  error: undefined,
  statusCode: 0,
  message: "",
  timeStamp: 0,
};

export const registerResponse: RegisterResponse = {
  message: "",
  status: Status.IDLE,
  error: undefined,
  statusCode: 0,
  timeStamp: 0,
};

export const addressResponseState: AddressResponse = {
  address: {
    streetName: "",
    buildingNumber: "",
    flatNumber: "",
    zipCode: "",
  },
  status: Status.IDLE,
  error: undefined,
  statusCode: 0,
  timeStamp: 0,
  message: "",
};
