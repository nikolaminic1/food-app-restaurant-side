import { createSlice } from "@reduxjs/toolkit";
import { Status } from "../../service/Status";
import { getOrderDetail, getOrdersList } from "../../service/order";
import { orderDetailState, orderListState } from "../../initial_state/order";

const orderDetailSlice = createSlice({
  name: "orderDetail",
  initialState: orderDetailState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrderDetail.pending, (state, action) => {
      return {
        ...state,
        status: Status.LOADING,
      };
    });
    builder.addCase(getOrderDetail.fulfilled, (state, action) => {
      console.log(action.payload);

      return {
        ...state,
        status: Status.SUCCEED,
        order: action.payload,
      };
    });
    builder.addCase(getOrderDetail.rejected, (state, action) => {
      return {
        ...state,
        status: Status.REJECTED,
      };
    });
  },
});

const ordersListSlice = createSlice({
  name: "orderList",
  initialState: orderListState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrdersList.pending, (state, action) => {
      return {
        ...state,
        status: Status.LOADING,
      };
    });
    builder.addCase(getOrdersList.fulfilled, (state, action) => {
      console.log(action.payload);

      return {
        ...state,
        status: Status.SUCCEED,
        orders: action.payload,
      };
    });
    builder.addCase(getOrdersList.rejected, (state, action) => {
      return {
        ...state,
        status: Status.REJECTED,
      };
    });
  },
});

export const orderDetailReducer = orderDetailSlice.reducer;
export const ordersListReducer = ordersListSlice.reducer;
