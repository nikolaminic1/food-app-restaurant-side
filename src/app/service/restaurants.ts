import { createAsyncThunk } from "@reduxjs/toolkit";
import { authApi, authApiForm, genericApi } from "./Api";
import { AxiosError } from "axios";

export const getRestaurantDetailOwner = createAsyncThunk(
  "/getRestaurantDetail",
  async () => {
    try {
      const response = await authApi().get(`/owner/business/restaurant/get`);
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

export const getCategoryDetail = createAsyncThunk(
  "/getCategoryDetail",
  async (id: number) => {
    try {
      const response = await authApi().get(
        `/business/product/category/detail/${id}`
      );
      console.log(response);

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

export const updateRestaurant = createAsyncThunk(
  "/updateRestaurant",
  async (data: Object) => {
    try {
      const response = await authApi().post(
        `/owner/business/restaurant/update`,
        data
      );
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

export const uploadBackgroundImage = createAsyncThunk(
  "/uploadBackgroundImage",
  async (data: FormData) => {
    try {
      const response = await authApiForm().post(
        `/owner/business/restaurant/background-image`,
        data
      );
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

export const removeBackgroundImage = createAsyncThunk(
  "/removeBackgroundImage",
  async () => {
    try {
      const response = await authApi().delete(
        `/owner/business/restaurant/background-image`
      );
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

export const uploadLogoImage = createAsyncThunk(
  "/uploadLogoImage",
  async (data: FormData) => {
    try {
      const response = await authApiForm().post(
        `/owner/business/restaurant/logo-image`,
        data
      );
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

export const removeLogoImage = createAsyncThunk(
  "/removeLogoImage",
  async () => {
    try {
      const response = await authApi().delete(
        `/owner/business/restaurant/logo-image`
      );
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
