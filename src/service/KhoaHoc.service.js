import { https } from "./config"

export const khoaHocService = {
    layDanhMucKhoaHoc: (data) => {
        return https.get(`/QuanLyKhoaHoc/LayDanhMucKhoaHoc`,data)
    },
    layDanhSachKhoaHoc: (data) => {
        return https.get(`QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP01`,data)
    },
    layDanhSachKhoaHocTheoDanhMuc: (data) => {
        return https.get(`/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${maDanhMuc}&MaNhom=GP01`)

    }
}