import { createSlice } from "@reduxjs/toolkit";
import { Status } from "../../service/Status";
import { getProductDetail, getProductsList } from "../../service/product";
import {
  productDetailState,
  productsListState,
} from "../../initial_state/product";

const productDetailSlice = createSlice({
  name: "categoryDetail",
  initialState: productDetailState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProductDetail.pending, (state, action) => {
      return {
        ...state,
        status: Status.LOADING,
      };
    });
    builder.addCase(getProductDetail.fulfilled, (state, action) => {
      console.log(action.payload);

      return {
        ...state,
        status: Status.SUCCEED,
        product: action.payload,
      };
    });
    builder.addCase(getProductDetail.rejected, (state, action) => {
      return {
        ...state,
        status: Status.REJECTED,
      };
    });
  },
});

const productsListSlice = createSlice({
  name: "categoryDetail",
  initialState: productsListState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProductsList.pending, (state, action) => {
      return {
        ...state,
        status: Status.LOADING,
      };
    });
    builder.addCase(getProductsList.fulfilled, (state, action) => {
      console.log(action.payload);

      return {
        ...state,
        status: Status.SUCCEED,
        products: action.payload,
      };
    });
    builder.addCase(getProductsList.rejected, (state, action) => {
      return {
        ...state,
        status: Status.REJECTED,
      };
    });
  },
});

export const productDetailReducer = productDetailSlice.reducer;
export const productsListReducer = productsListSlice.reducer;
