import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getvalueKhoaHocApi } from "../../redux/khoaHocSlice";
import { Space, Table } from "antd";
import Search from "antd/es/transfer/search";
import { Link } from "react-router-dom";

const KhoaHoc = () => {
  const dispatch = useDispatch();
  const { listKhoaHoc } = useSelector((state) => state.khoaHocSlice);

  useEffect(() => {
    dispatch(getvalueKhoaHocApi());
  }, []);

  const columns = [
    {
      title: "Mã Khóa Học",
      dataIndex: "maKhoaHoc",
      key: "maKhoaHoc",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Tên Khóa Học",
      dataIndex: "tenKhoaHoc",
      key: "tenKhoaHoc",
    },
    {
      title: "Hình Ảnh",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      render: (text) => (
        <img src={text} alt="Hình khóa học" style={{ width: "100px" }} />
      ),
    },
    {
      title: "Lượt xem",
      dataIndex: "luotXem",
      key: "luotXem",
    },
    {
      title: "Người tạo",
      dataIndex: "nguoiTao",
      key: "nguoiTao",
      render: (_, record) => (
        <>
          <p>{record.nguoiTao.hoTen}</p>
        </>
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
        <Link to={"/admin/create-khoahoc"}>Thêm Khóa Học</Link>
      </button>
      <Search
        className="mb-5"
        placeholder="Tìm kiếm khóa học ..."
        onChange={(e) => setSearchText(e.target.value)} // Cập nhật từ khóa tìm kiếm
        style={{ marginBottom: 20, width: 400 }}
      />
      <Table columns={columns} dataSource={listKhoaHoc} />
    </div>
  );
};

export default KhoaHoc;
