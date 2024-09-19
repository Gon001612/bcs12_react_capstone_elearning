import { http } from "./config";

export const khoaHocService = {
  getListKhoaHoc: () => {
    return http.get("/QuanLyKhoaHoc/LayDanhSachKhoaHoc");
  },
  deleteKhoaHoc: (MaKhoaHoc) => {
    return http.delete(`/QuanLyKhoaHoc/XoaKhoaHoc`, {
      params: { MaKhoaHoc },
      headers: {
        Authorization: `Bearer ${" eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiaG9hbmd2dTQ1MjAwMiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkdWIiwibmJmIjoxNzI2NzY3MTkxLCJleHAiOjE3MjY3NzA3OTF9.mwJYrFgEjkjQCeDjwkAss2asHsT3bqRJ1fbygVwDSLc"}`,
      },
    });
  },
  upLoadAvatar: (data) => {
    return http.post("/QuanLyKhoaHoc/UploadHinhAnhKhoaHoc", data);
  },
};
