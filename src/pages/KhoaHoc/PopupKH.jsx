import React, { useContext, useEffect } from "react";
import { getValueUserApi } from "../../redux/nguoiDungSlice";
import { Space, Table } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormSearchProduct from "../../components/Form/FormSearchProduct";

const PopupKH = () => {
  const { listNguoiDung } = useSelector((state) => state.nguoiDungSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getValueUserApi());
  }, [dispatch]);

  const columns = [
    {
      title: "STT",
      key: "stt",
      render: (_, __, index) => <span>{index + 1}</span>, // Hiển thị STT
    },
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      key: "hoTen",
    },
    {
      title: "Chờ xác nhận",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button className="bg-green-500 text-white font-bold py-2 px-4 rounded">
            Xác Thực
          </button>
          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
            <Link>Hủy</Link>
          </button>
        </Space>
      ),
    },
  ];

  const columnsWithCancelOnly = [
    {
      title: "STT",
      key: "stt",
      render: (_, __, index) => <span>{index + 1}</span>, // Hiển thị STT
    },
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      key: "hoTen",
    },
    {
      title: "Chờ xác nhận",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button
            onClick={() => {
              khoaHocService
                .huyghidanh(record.maKhoaHoc) // Gọi hàm và truyền maKhoaHoc
                .then((res) => {
                  console.log(res);
                  // Cập nhật lại danh sách khóa học sau khi hủy
                })
                .catch((err) => {
                  console.log(err);
                  showNotification(err.message, "error"); // Log thông báo lỗi chi tiết
                });
            }}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
          >
            Hủy
          </button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1 className="font-bold text-2xl">Danh Sách Người Dùng</h1>
      <div className="flex px-2 mb-5">
        <FormSearchProduct placeholder={"Tên người dùng (có thể search)"} />
        <button className="bg-green-500 text-white font-bold py-2 px-4 rounded mb-5">
          Ghi danh
        </button>
      </div>

      <hr className="my-4 border-gray-300" />
      <div className="flex px-2 mb-5 justify-between">
        <span className="font-bold text-2xl">Học Viên Chờ Xác Thực</span>
        <FormSearchProduct placeholder={"Nhập tên HV hoặc SĐT"} />
      </div>

      <Table columns={columns} dataSource={listNguoiDung} />
      <hr className="my-4 border-gray-300" />
      <div className="flex px-2 mb-5 justify-between">
        <span className="font-bold text-2xl">
          Học Viên Đã Tham Gia Khóa Học
        </span>
        <FormSearchProduct placeholder={"Nhập tên HV hoặc SĐT"} />
      </div>
      <Table columns={columnsWithCancelOnly} dataSource={listNguoiDung} />
      {/* Bảng chỉ có nút Hủy */}
    </div>
  );
};

export default PopupKH;
