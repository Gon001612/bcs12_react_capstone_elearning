import { configureStore } from "@reduxjs/toolkit";
import nguoiDungSlice from "./nguoiDungSlice";
import authSlice from "./authSlice";

export const store = configureStore({
  reducer: {
    authSlice,
    nguoiDungSlice,
  },
});
