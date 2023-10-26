import { createSlice } from "@reduxjs/toolkit";
import {
  restaurantDetailState,
  restaurantsListState,
} from "../../initial_state/restaurants";
import {
  getRestaurantDetail,
  getRestaurantsList,
} from "../../service/restaurants";
import { Status } from "../../service/Status";

const restaurantsListSlice = createSlice({
  name: "restaurantsList",
  initialState: restaurantsListState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRestaurantsList.pending, (state, action) => {
      return {
        ...state,
        status: Status.LOADING,
      };
    });
    builder.addCase(getRestaurantsList.fulfilled, (state, action) => {
      console.log(action.payload);

      return {
        ...state,
        status: Status.SUCCEED,
        restaurants: action.payload,
      };
    });
    builder.addCase(getRestaurantsList.rejected, (state, action) => {
      return {
        ...state,
        status: Status.REJECTED,
        message: String(action.payload),
        isAuthenticated: false,
      };
    });
  },
});

const restaurantDetailSlice = createSlice({
  name: "restaurantDetail",
  initialState: restaurantDetailState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRestaurantDetail.pending, (state, action) => {
      return {
        ...state,
        status: Status.LOADING,
      };
    });
    builder.addCase(getRestaurantDetail.fulfilled, (state, action) => {
      console.log(action.payload);

      return {
        ...state,
        status: Status.SUCCEED,
        restaurant: action.payload,
      };
    });
    builder.addCase(getRestaurantDetail.rejected, (state, action) => {
      return {
        ...state,
        status: Status.REJECTED,
        message: String(action.payload),
        isAuthenticated: false,
      };
    });
  },
});

export const restaurantsListReducer = restaurantsListSlice.reducer;
export const restaurantDetailReducer = restaurantDetailSlice.reducer;
