import { createSlice } from "@reduxjs/toolkit";
import {
  categoryDetailState,
  restaurantDetailState,
  restaurantsListState,
} from "../../initial_state/restaurants";
import { Status } from "../../service/Status";
import {
  getCategoryDetail,
  getRestaurantDetailOwner,
} from "../../service/restaurants";

const restaurantDetailSlice = createSlice({
  name: "restaurantDetail",
  initialState: restaurantDetailState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRestaurantDetailOwner.pending, (state, action) => {
      return {
        ...state,
        status: Status.LOADING,
      };
    });
    builder.addCase(getRestaurantDetailOwner.fulfilled, (state, action) => {
      console.log(action.payload);

      return {
        ...state,
        status: Status.SUCCEED,
        restaurant: action.payload,
      };
    });
    builder.addCase(getRestaurantDetailOwner.rejected, (state, action) => {
      return {
        ...state,
        status: Status.REJECTED,
        message: String(action.payload),
      };
    });
  },
});

const categoryDetailSlice = createSlice({
  name: "categoryDetail",
  initialState: categoryDetailState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategoryDetail.pending, (state, action) => {
      return {
        ...state,
        status: Status.LOADING,
      };
    });
    builder.addCase(getCategoryDetail.fulfilled, (state, action) => {
      console.log(action.payload);

      return {
        ...state,
        status: Status.SUCCEED,
        category: action.payload,
      };
    });
    builder.addCase(getCategoryDetail.rejected, (state, action) => {
      return {
        ...state,
        status: Status.REJECTED,
      };
    });
  },
});

export const restaurantDetailReducer = restaurantDetailSlice.reducer;
export const categoryDetailReducer = categoryDetailSlice.reducer;
