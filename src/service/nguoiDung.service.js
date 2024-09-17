import { http } from "./config";

export const nguoiDungService = {
  getListUser: () => {
    return http.get("/QuanLyNguoiDung/LayDanhSachNguoiDung");
  },
  deleteUser: (id) => {
    return http.delete(`/QuanLyNguoiDung/XoaNguoiDung/${id}`);
  },
  createUser: (data) => {
    return http.post("/QuanLyNguoiDung/ThemNguoiDung", data);
  },
};
