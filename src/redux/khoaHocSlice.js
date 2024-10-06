import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { khoaHocService } from "../service/khoaHoc.service";

export const getvalueKhoaHocApi = createAsyncThunk(
  "khoaHoc/getValueKhoaHocApi",
  async (_, thunkAPI) => {
    const resolve = await khoaHocService.getListKhoaHoc();
    console.log(resolve);
    return resolve.data;
  }
);

const initialState = {
  listKhoaHoc: [],
};

const khoaHocSlice = createSlice({
  name: "khoaHoc",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getvalueKhoaHocApi.fulfilled, (state, action) => {
      console.log(action);
      state.listKhoaHoc = action.payload;
    });
  },
});

export const {} = khoaHocSlice.actions;

export default khoaHocSlice.reducer;
