import { createAsyncThunk } from "@reduxjs/toolkit";
import { authApi, genericApi } from "./Api";
import { AxiosError } from "axios";

export const getRestaurantDetailOwner = createAsyncThunk(
  "/getRestaurantDetail",
  async () => {
    try {
      const response = await authApi().get(`/business/restaurant`);
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
