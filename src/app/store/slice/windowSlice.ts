import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialStateWindow } from "../../initial_state/window";

export const windowSlice = createSlice({
  name: "window",
  initialState: initialStateWindow,
  reducers: {
    openCookiesConsent(state, action) {
      state.cookiesModal == true;
    },

    closeCookiesConsent(state, action) {
      state.cookiesModal == false;
    },

    setProjectPageModalOpened(state, action) {
      state.projectPageModalOpened = action.payload;
    },
    // need to change style and hide scroll on main document while having search box open
    setSearchBoxPosition(state, action) {
      state.serachBoxOffsetX = action.payload.x;
      state.serachBoxOffsetY = action.payload.y;
    },
    setSidebar(state, action: PayloadAction<boolean>) {
      state.isSidebarOpen = action.payload;
    },
    setDimensions(state) {
      state.width = window.innerWidth;
      state.height = window.innerHeight;
      // console.log("111111111");

      // if (state.width < 992 && state.navbarOpened == true) {
      //   windowSlice.actions.setNavbarOpened(false);
      // }
    },

    setLayoutHeight(state) {
      state.layoutHeight = state.height - state.footerHeight - 90;
    },

    setNavbarWidth(state, action: PayloadAction<number>) {
      state.navbarWidth = action.payload;
    },

    setNavbarOpened(state, action: PayloadAction<boolean>) {
      state.navbarOpened = action.payload;

      if (state.searchBoxOpen == true) {
        state.searchBoxOpen = false;
      }
    },

    setFooterHeight(state, action: PayloadAction<number>) {
      state.footerHeight = action.payload;
    },

    setNavbarAffected(state, action) {
      state.navbarAffected = action.payload;
    },

    setSearchBoxOpen(state, action) {
      state.searchBoxOpen = action.payload;
      if (state.navbarOpened == true) {
        state.navbarOpened = false;
      }
    },

    setLoginModalOpen(state, action) {
      return {
        ...state,
        loginModal: action.payload,
      };
    },
    setSignUpModalOpen(state, action) {
      return {
        ...state,
        signUpModal: action.payload,
      };
      // state.signUpModal = action.payload;
    },

    closeModals(state) {
      return {
        ...state,
        signUpModal: false,
        loginModal: false,
      };
    },
  },
});

export const windowReducer = windowSlice.reducer;
