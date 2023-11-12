import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  isAuthenticated: false,
  user: {
    email: "",
    phone: "",
    fullName: "",
    role: "",
    avatar: "",
    id: "",
  },
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    doLoginAction: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },

    doFetchAccountAction: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },

    doRedirectLogin: (state, action) => {
      state.isLoading = action.payload;
    },
    doLogoutAction: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const {
  doLoginAction,
  doFetchAccountAction,
  doRedirectLogin,
  doLogoutAction,
} = accountSlice.actions;
export default accountSlice.reducer;
