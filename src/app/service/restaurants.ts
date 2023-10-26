import { createAsyncThunk } from "@reduxjs/toolkit";
import { genericApi } from "./Api";
import { AxiosError } from "axios";

export const getRestaurantsList = createAsyncThunk(
  "/getRestaurantsList",
  async () => {
    try {
      const response = await genericApi().get("/customer/restaurant/list");
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

export const getRestaurantDetail = createAsyncThunk(
  "/getRestaurantDetail",
  async (id: number) => {
    try {
      const response = await genericApi().get(`/customer/restaurant/${id}`);
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
