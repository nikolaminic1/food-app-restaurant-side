import { createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "./Api";
import { AxiosError } from "axios";

export const getProductDetail = createAsyncThunk(
  "/getProductDetail",
  async (id: number) => {
    try {
      const response = await authApi().get(`/business/product/${id}`);
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

export const getProductsList = createAsyncThunk(
  "/getProductsList",
  async () => {
    try {
      const response = await authApi().get(`/business/product/list`);
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
