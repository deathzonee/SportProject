import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      currentUser: null,
      isFetching: false,
      error: false,
    },
    loginAdmin: {
      currentUser: null,
      isFetching: false,
      error: false,
    },
    register: {
      error: false,
      success: false,
      isFetching: false,
    },
  },
  reducers: {
    loginStart: (state) => {
      state.login.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.login.isFetching = false;
      state.login.currentUser = action.payload;
      state.login.error = false;
    },
    loginFailed: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
    },
    loginAdminStart: (state) => {
      state.login.isFetching = true;
    },
    loginAdminSuccess: (state, action) => {
      state.login.isFetching = false;
      state.login.currentUser = action.payload;
      state.login.error = false;
    },
    loginAdminFailed: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
    },
    registerStart: (state) => {
      state.register.isFetching = true;
      state.register.error = false;
    },
    registerSuccess: (state) => {
      state.register.success = true;
      state.register.error = false;
      state.register.isFetching = false;
    },

    registerFailed: (state) => {
      state.register.isFetching = false;
      state.register.error = true;
      state.register.success = false;
    },

    logoutSuccess: (state) => {
      state.login.isFetching = false;
      state.login.currentUser = null;
      state.login.error = false;
    },

    logoutFailed: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
    },

    logoutStart: (state) => {
      state.login.isFetching = true;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailed,
  loginAdminStart,
  loginAdminSuccess,
  loginAdminFailed,
  registerStart,
  registerSuccess,
  registerFailed,
  logoutStart,
  logoutFailed,
  logoutSuccess,
} = authSlice.actions;
export default authSlice.reducer;
