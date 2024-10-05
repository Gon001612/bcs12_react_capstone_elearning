import { http } from "./config";

export const nguoiDungService = {
  getListUser: () => {
    return http.get("/QuanLyNguoiDung/LayDanhSachNguoiDung");
  },
  deleteUser: (TaiKhoan) => {
    return http.delete(`/QuanLyNguoiDung/XoaNguoiDung`, {
      params: { TaiKhoan },
      headers: {
        Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiaG9hbmd2dTIwMDEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJHViIsIm5iZiI6MTcyNjY3NTM4NiwiZXhwIjoxNzI2Njc4OTg2fQ.EziFyhaL-0YkOE7D-bKwW04e1P2JgyEID9XUAOnGk3c"}`,
      },
    });
  },
  createUser: (data) => {
    return http.post("/QuanLyNguoiDung/ThemNguoiDung", data, {
      headers: {
        Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiaG9hbmd2dTIwMDEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJHViIsIm5iZiI6MTcyNjY3NTM4NiwiZXhwIjoxNzI2Njc4OTg2fQ.EziFyhaL-0YkOE7D-bKwW04e1P2JgyEID9XUAOnGk3c"}`,
      },
    });
  },
  CreateKhoaHoc: (data) => {
    return http.post("/QuanLyKhoaHoc/ThemKhoaHoc", data, {
      headers: {
        Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiaG9hbmd2dTIwMDEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJHViIsIm5iZiI6MTcyNjY3NTM4NiwiZXhwIjoxNzI2Njc4OTg2fQ.EziFyhaL-0YkOE7D-bKwW04e1P2JgyEID9XUAOnGk3c"}`,
      },
    });
  },
  UpdateUser: (data) => {
    return http.put("/QuanLyNguoiDung/CapNhatThongTinNguoiDung", data, {
      headers: {
        Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiaG9hbmd2dTIwMDEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJHViIsIm5iZiI6MTcyNjY3NTM4NiwiZXhwIjoxNzI2Njc4OTg2fQ.EziFyhaL-0YkOE7D-bKwW04e1P2JgyEID9XUAOnGk3c"}`,
      },
    });
  },
  layTenUser: (TaiKhoan) => {
    return http.get(`/QuanLyNguoiDung/TimKiemNguoiDung`, {
      params: { TaiKhoan },
      headers: {
        Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiaG9hbmd2dTIwMDEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJHViIsIm5iZiI6MTcyNjY3NTM4NiwiZXhwIjoxNzI2Njc4OTg2fQ.EziFyhaL-0YkOE7D-bKwW04e1P2JgyEID9XUAOnGk3c"}`,
      },
    });
  },
};
