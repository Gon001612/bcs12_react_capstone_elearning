import { https } from "./config";

export const authService = {
  signIn: (data) => {
    return https.post("/QuanLyNguoiDung/DangNhap", data);
  },
  signUp: (data) => {
    return https.post("/QuanLyNguoiDung/DangKy", data);
  },
};
