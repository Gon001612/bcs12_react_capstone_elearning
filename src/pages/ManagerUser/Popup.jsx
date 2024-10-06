import React, { useContext, useEffect } from "react";
import { getvalueKhoaHocApi } from "../../redux/khoaHocSlice";
import { useSelector, useDispatch } from "react-redux";
import { Space, Table } from "antd";
import { Link } from "react-router-dom";
import FormSearchProduct from "../../components/Form/FormSearchProduct";
import { khoaHocService } from "../../service/khoaHoc.service";
import { NotificationContext } from "../../App";

const Popup = () => {
  const { listKhoaHoc } = useSelector((state) => state.khoaHocSlice);
  const dispatch = useDispatch();
  const { showNotification } = useContext(NotificationContext);
  useEffect(() => {
    dispatch(getvalueKhoaHocApi());
  }, [dispatch]);

  const columns = [
    {
      title: "Mã Khóa Học",
      dataIndex: "maKhoaHoc",
      key: "maKhoaHoc",
    },
    {
      title: "Tên Khóa Học",
      dataIndex: "tenKhoaHoc",
      key: "tenKhoaHoc",
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
      title: "Mã Khóa Học",
      dataIndex: "maKhoaHoc",
      key: "maKhoaHoc",
    },
    {
      title: "Tên Khóa Học",
      dataIndex: "tenKhoaHoc",
      key: "tenKhoaHoc",
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
      <h1>Danh Sách Khóa Học</h1>
      <div className="flex px-2 mb-5">
        <FormSearchProduct />
        <button className="bg-green-500 text-white font-bold py-2 px-4 rounded mb-5">
          Ghi danh
        </button>
      </div>

      <hr className="my-4 border-gray-300" />
      <span>Khóa Học Chờ Xác Thực</span>
      <Table columns={columns} dataSource={listKhoaHoc} />
      <hr className="my-4 border-gray-300" />
      <span>Khóa Học Đã Xác Thực</span>
      <Table columns={columnsWithCancelOnly} dataSource={listKhoaHoc} />
      {/* Bảng chỉ có nút Hủy */}
    </div>
  );
};

export default Popup;
