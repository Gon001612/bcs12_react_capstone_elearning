import { http } from "./config";

export const khoaHocService = {
  getListKhoaHoc: () => {
    return http.get("/QuanLyKhoaHoc/LayDanhSachKhoaHoc");
  },
};
