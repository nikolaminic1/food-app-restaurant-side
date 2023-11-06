import { createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "./Api";
import { AxiosError } from "axios";

export interface ProductListFilter {
  page: number;
  per_page: number;
  order: number;
  visible: number;
}

export const getProductDetail = createAsyncThunk(
  "/getProductDetail",
  async (id: number) => {
    try {
      const response = await authApi().get(`/business/products/product/${id}`);
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
  async (filter: ProductListFilter) => {
    try {
      const response = await authApi().get(
        `/business/products/product/list?page=${filter.page}&per_page=${filter.per_page}&order=${filter.order}&visible=${filter.visible}`
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);

        throw new AxiosError(
          String(error.response?.data),
          String(error.response?.status)
        );
      }
    }
  }
);
