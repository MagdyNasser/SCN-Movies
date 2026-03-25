import { createSlice } from "@reduxjs/toolkit";

// Load from localStorage
const savedUser = localStorage.getItem("scn_user");
const savedAuth = localStorage.getItem("scn_auth");

const initialState = {
  user: savedAuth ? JSON.parse(savedAuth) : null,
  registeredUser: savedUser ? JSON.parse(savedUser) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //  REGISTER
    registerSuccess: (state, action) => {
      state.registeredUser = action.payload;
      state.user = action.payload;

      localStorage.setItem("scn_user", JSON.stringify(action.payload));
      localStorage.setItem("scn_auth", JSON.stringify(action.payload));
    },

    //  LOGIN
    loginSuccess: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("scn_auth", JSON.stringify(action.payload));
    },

    //  LOGOUT
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("scn_auth");
    },
  },
});

export const { registerSuccess, loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
