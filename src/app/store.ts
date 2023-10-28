import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { windowReducer } from "./store/slice/windowSlice";
import { jwtReducer, userReducer } from "./store/slice/auth";
import {
  categoryDetailReducer,
  restaurantDetailReducer,
} from "./store/slice/restaurants";
import {
  productDetailReducer,
  productsListReducer,
} from "./store/slice/products";
import { orderDetailReducer, ordersListReducer } from "./store/slice/order";
// import { logoutReducer s} from "./store/slice/auth";

const persistConfig = {
  key: "root",
  storage,
};

// const productsReducer = combineReducers({
//   products: categoriesReducer,

// });

const productReducer = combineReducers({
  productsList: productsListReducer,
  productDetail: productDetailReducer,
});

const restaurantsReducer = combineReducers({
  restaurantDetail: restaurantDetailReducer,
  categoryDetail: categoryDetailReducer,
});

const orderReducer = combineReducers({
  orderDetail: orderDetailReducer,
  ordersList: ordersListReducer,
});

const authReducer = combineReducers({
  user: userReducer,
  jwt: jwtReducer,
  // checkAuth: logoutReducer,
  // verify,
  // getAccessToken,
  // getRefreshToken,
  // login: logoutReducer,
  // logout: logoutReducer,
  // signup: logoutReducer,
  // accountDelete: logoutReducer,
  // accountUpdate: logoutReducer,
});

const rootReducer = combineReducers({
  windowReducer: windowReducer,
  auth: authReducer,
  restaurant: restaurantsReducer,
  order: orderReducer,
  product: productReducer,
});

// const red = combineReducers({layout: layoutReducer})

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export default store;
