import { configureStore } from "@reduxjs/toolkit";
import nguoiDungSlice from "./nguoiDungSlice";
import authSlice from "./authSlice";
import khoaHocSlice from "./khoaHocSlice";

export const store = configureStore({
  reducer: {
    authSlice,
    nguoiDungSlice,
    khoaHocSlice,
  },
});
