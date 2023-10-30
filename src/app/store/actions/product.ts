import store from "../../store";
import { productDetailSlice } from "../slice/products";

export const emptyVariations = () => {
  store.dispatch(productDetailSlice.actions.emptyVariations());
};
