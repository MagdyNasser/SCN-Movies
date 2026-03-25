import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import watchlistReducer from "./watchlistSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    watchlist: watchlistReducer,
  },
});

