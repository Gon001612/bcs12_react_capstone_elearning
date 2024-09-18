import { https } from "./config";

export const nguoiDungService = {
  getListUser: () => {
    return https.get("/QuanLyNguoiDung/LayDanhSachNguoiDung");
  },
  deleteUser: (id) => {
    return https.delete(`/QuanLyNguoiDung/XoaNguoiDung/${id}`);
  },
  createUser: (data) => {
    return https.post("/QuanLyNguoiDung/ThemNguoiDung", data);
  },
};
