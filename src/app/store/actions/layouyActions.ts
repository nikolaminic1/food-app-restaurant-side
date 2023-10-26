import store from "../../store";
import { windowReducer, windowSlice } from "../slice/windowSlice";

export const changeScrollPosition = (data: number) => {
  // store.dispatch()
};

export const setNavbarWidth = (data: number) => {
  store.dispatch(windowSlice.actions.setNavbarWidth(data));
};

export const setProjectPageModalOpened = (data: boolean) => {
  store.dispatch(windowSlice.actions.setProjectPageModalOpened(data));
};

export const setNavbarOpened = (data: boolean) => {
  store.dispatch(windowSlice.actions.setNavbarOpened(data));
};

export const setFooterHeight = (data: number) => {
  store.dispatch(windowSlice.actions.setFooterHeight(data));
};

export const updateLayout = () => {
  store.dispatch(windowSlice.actions.setLayoutHeight());
};

export const updateDimensions = () => {
  store.dispatch(windowSlice.actions.setDimensions());
};

export const setSidebar = (action: boolean, affected: boolean) => {
  if (!action) {
    store.dispatch(windowSlice.actions.setNavbarAffected(true));
  } else {
    store.dispatch(windowSlice.actions.setNavbarAffected(false));
  }
  store.dispatch(windowSlice.actions.setSidebar(action));
};

export const setSearchBoxPositionAction = (x: number, y: number) => {
  store.dispatch(windowSlice.actions.setSearchBoxPosition({ x: x, y: y }));
};

export const setSearchBoxOpenAction = (n: boolean) => {
  store.dispatch(windowSlice.actions.setSearchBoxOpen(n));
};

export const openCookiesConsent = () => {
  store.dispatch(windowSlice.actions.openCookiesConsent(null));
};

export const setLoginModalOpenAction = (data: boolean) => {
  store.dispatch(windowSlice.actions.setLoginModalOpen(data));
};

export const setSignUpModalOpenAction = (data: boolean) => {
  store.dispatch(windowSlice.actions.setSignUpModalOpen(data));
};

export const closeModals = () => {
  store.dispatch(windowSlice.actions.closeModals());
};
