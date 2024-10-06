import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { nguoiDungService } from "../service/nguoiDung.service";

// Thao tác lấy danh sách người dùng
export const getValueUserApi = createAsyncThunk(
  "nguoiDung/getValueUserApi",
  async (_, thunkAPI) => {
    const response = await nguoiDungService.getListUser();
    return response.data;
  }
);

const initialState = {
  listNguoiDung: [],
};

const nguoiDungSlice = createSlice({
  name: "nguoiDung",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getValueUserApi.fulfilled, (state, action) => {
      state.listNguoiDung = action.payload;
    });
  },
});

export default nguoiDungSlice.reducer;
