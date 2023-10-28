import { createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "./Api";
import { AxiosError } from "axios";

export const getOrderDetail = createAsyncThunk(
  "/getOrderDetail",
  async (id: number) => {
    try {
      const response = await authApi().get(`/business/order/${id}`);
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

export const getOrdersList = createAsyncThunk("/getOrdersList", async () => {
  try {
    const response = await authApi().get(`/business/order/list`);
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
