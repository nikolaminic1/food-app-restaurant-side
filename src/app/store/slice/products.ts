import { createSlice } from "@reduxjs/toolkit";
import { Status } from "../../service/Status";
import { getProductDetail, getProductsList } from "../../service/product";
import {
  productDetailState,
  productsListState,
} from "../../initial_state/product";

export const productDetailSlice = createSlice({
  name: "product detail",
  reducers: {
    emptyVariations(state) {
      state.product.variation = {
        id: 0,
        name: "",
        isRequired: false,
        productVariationList: [],
      };
    },
  },
  initialState: productDetailState,
  extraReducers: (builder) => {
    builder.addCase(getProductDetail.pending, (state, action) => {
      return {
        ...state,
        status: Status.LOADING,
      };
    });
    builder.addCase(getProductDetail.fulfilled, (state, action) => {
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
        products: action.payload.items,
        count: action.payload.count,
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
