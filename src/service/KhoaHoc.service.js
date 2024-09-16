import { https } from "./config"

export const khoaHocService = {
    layDanhMucKhoaHoc: (data) => {
        return https.get(`/QuanLyKhoaHoc/LayDanhMucKhoaHoc`,data)
    },
    layDanhSachKhoaHoc: (data) => {
        return https.get(`QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP01`,data)
    },
    layKhoaHocTheoDanhMuc: (data) => {
        return https.get(`/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${data}&MaNhom=GP01`)
    },
    layDanhSachKhoaHocTheoTen: (data) => {
        return https.get(`https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?tenKhoaHoc=${data}&MaNhom=GP01`)
    },
}

