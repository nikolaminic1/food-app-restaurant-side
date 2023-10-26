import { jwtResponse, registerResponse } from "./../../initial_state/auth";
import { createSlice } from "@reduxjs/toolkit";
import { userState } from "../../initial_state/auth";
import {
  getMyProfile,
  login,
  refresh,
  register,
  verify,
} from "../../service/auth";
import { Status } from "../../service/Status";

const userSlice = createSlice({
  name: "user",
  initialState: userState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMyProfile.pending, (state, action) => {
      return {
        ...state,
        status: Status.LOADING,
      };
    });
    builder.addCase(getMyProfile.fulfilled, (state, action) => {
      return {
        ...state,
        status: Status.SUCCEED,
        user: action.payload?.data?.User,
      };
    });
    builder.addCase(getMyProfile.rejected, (state, action) => {
      return {
        ...state,
        status: Status.REJECTED,
        message: String(action.payload),
        isAuthenticated: false,
      };
    });
  },
});

const signupSlice = createSlice({
  name: "signup",
  initialState: registerResponse,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state, action) => {
      return {
        ...state,
        status: Status.LOADING,
      };
    });
    builder.addCase(register.fulfilled, (state, action) => {
      return {
        ...state,
        status: Status.SUCCEED,
        message: action.payload,
      };
    });
    builder.addCase(register.rejected, (state, action) => {
      return {
        ...state,
        status: Status.REJECTED,
        message: String(action.payload),
      };
    });
  },
});

export const jwtSlice = createSlice({
  name: "jwt-auth",
  initialState: jwtResponse,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");

      return {
        ...state,
        access: "",
        refresh: "",
        isAuthenticated: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      return {
        ...state,
        status: Status.LOADING,
      };
    });
    builder.addCase(login.fulfilled, (state, action) => {
      localStorage.setItem("access", action.payload.access);
      localStorage.setItem("refresh", action.payload.refresh);
      return {
        ...state,
        status: Status.SUCCEED,
        access: action.payload.access,
        refresh: action.payload.refresh,
        isAuthenticated: true,
      };
    });
    builder.addCase(login.rejected, (state, action) => {
      return {
        ...state,
        status: Status.REJECTED,
        message: String(action.payload),
        isAuthenticated: false,
      };
    });
    builder.addCase(verify.pending, (state, action) => {
      return {
        ...state,
        status: Status.LOADING,
      };
    });
    builder.addCase(verify.fulfilled, (state, action) => {
      return {
        ...state,
        status: Status.SUCCEED,
      };
    });
    builder.addCase(verify.rejected, (state, action) => {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      return {
        ...state,
        status: Status.REJECTED,
        access: "",
        refresh: "",
        message: String(action.payload),
        isAuthenticated: false,
      };
    });

    builder.addCase(refresh.pending, (state, action) => {
      return {
        ...state,
        status: Status.LOADING,
      };
    });
    builder.addCase(refresh.fulfilled, (state, action) => {
      localStorage.setItem("access", action.payload.access);
      localStorage.setItem("refresh", action.payload.refresh);
      return {
        ...state,
        status: Status.SUCCEED,
        access: action.payload.access,
        refresh: action.payload.refresh,
        isAuthenticated: true,
      };
    });
    builder.addCase(refresh.rejected, (state, action) => {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      return {
        ...state,
        status: Status.REJECTED,
        access: "",
        refresh: "",
        message: String(action.payload),
        isAuthenticated: false,
      };
    });
  },
});

export const userReducer = userSlice.reducer;
// export const checkAuthReducer = checkAuthSlice.reducer;
// export const loginReducer = loginSlice.reducer;
export const jwtReducer = jwtSlice.reducer;
export const signupReducer = signupSlice.reducer;
// export const accountDeleteReducer = accountDeleteSlice.reducer;
// export const accountUpdateReducer = accountUpdateSlice.reducer;
