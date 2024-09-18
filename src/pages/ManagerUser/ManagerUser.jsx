import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getValueUserApi } from "../../redux/nguoiDungSlice";
import { Space, Table } from "antd";
import Search from "antd/es/transfer/search";
import { Link } from "react-router-dom";

const ManagerUser = () => {
  const dispatch = useDispatch();
  const { listNguoiDung } = useSelector((state) => state.nguoiDungSlice);

  useEffect(() => {
    dispatch(getValueUserApi());
  }, []);

  const columns = [
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
      title: "email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDt",
      key: "soDt",
    },
    {
      title: "Mã Loại Người Dùng",
      dataIndex: "maLoaiNguoiDung",
      key: "maLoaiNguoiDung",
      render: (text) => (
        <tag color={text == "HV" ? "cyan-inverse" : "red-inverse"}>{text}</tag>
      ),
    },
    {
      title: "Thao Tác",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button className="bg-green-500 text-white font-bold py-2 px-4 rounded">
            Ghi danh
          </button>
          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
            Sửa
          </button>
          <button className="bg-red-500 text-white font-bold py-2 px-4 rounded">
            Xóa
          </button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <button className="bg-green-500 text-white font-bold py-2 px-4 rounded mb-5">
        <Link to={"/admin/create-user"}>Thêm Người Dùng</Link>
      </button>
      <Search
        className="mb-5"
        placeholder="Tìm kiếm người dùng..."
        onChange={(e) => setSearchText(e.target.value)} // Cập nhật từ khóa tìm kiếm
        style={{ marginBottom: 20, width: 400 }}
      />
      <Table columns={columns} dataSource={listNguoiDung} />
    </div>
  );
};

export default ManagerUser;
