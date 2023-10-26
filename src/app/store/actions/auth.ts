import store from "../../store";
import { jwtSlice } from "../slice/auth";

export const logout = () => {
  store.dispatch(jwtSlice.actions.logout());
};
