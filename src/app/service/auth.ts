import { createAsyncThunk } from "@reduxjs/toolkit";
import { authApi, genericApi } from "./Api";
import { RegisterRequest } from "../models/responseModels/auth";
import { AxiosError } from "axios";

export const login = createAsyncThunk(
  "/login",
  async (data: { email: string; password: string }) => {
    try {
      const response = await genericApi().post("/auth/jwt/create", data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new AxiosError(
          String(error.response?.data.message),
          String(error.response?.status)
        );
      }
    }
  }
);

export const logoutRequest = createAsyncThunk("/logoutRequest", async () => {
  try {
    const response = await authApi().get("/user/logout");
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new AxiosError(
        String(error.response?.data.message),
        String(error.response?.status)
      );
    }
  }
});

export const activateAccount = createAsyncThunk(
  "/activateAccount",
  async (data: { uid: string; token: string }) => {
    try {
      const response = await genericApi().post("/user/activate", data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new AxiosError(
          String(error.response?.data.message),
          String(error.response?.status)
        );
      }
    }
  }
);

export const register = createAsyncThunk(
  "/register",
  async (data: RegisterRequest) => {
    try {
      const response = await genericApi().post("/user/register", data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);

        throw new AxiosError(
          String(error.response?.data.message),
          String(error.response?.status)
        );
      }
    }
  }
);

export const getMyProfile = createAsyncThunk("/get-my-profile", async () => {
  try {
    const response = await authApi().get("/user/me");
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) console.log(error.message);
    throw Error;
  }
});

export const verify = createAsyncThunk("/verify", async () => {
  try {
    let token = localStorage.getItem("access");
    const data = {
      token: token,
    };
    const response = await genericApi().post("/auth/jwt/verify", token);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) console.log(error.message);

    throw Error;
  }
});

export const refresh = createAsyncThunk("/refresh", async () => {
  try {
    let token = localStorage.getItem("refresh");
    const data = {
      refresh: token,
    };
    const response = await genericApi().post("/auth/jwt/refresh", data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) console.log(error.message);

    throw Error;
  }
});

export const getAddress = createAsyncThunk(
  "/get-business address",
  async () => {
    try {
      const response = await authApi().get("/business/address");
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) console.log(error.message);
      throw Error;
    }
  }
);

export const updateAddress = createAsyncThunk(
  "/update business address",
  async (data: Object) => {
    try {
      const response = await authApi().post("/business/address", data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);

        throw new AxiosError(
          String(error.response?.data.message),
          String(error.response?.status)
        );
      }
    }
  }
);
