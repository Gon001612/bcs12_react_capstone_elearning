import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getvalueKhoaHocApi } from "../../redux/khoaHocSlice";
import { Space, Table } from "antd";
import Search from "antd/es/transfer/search";

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
      <Table columns={columns} dataSource={listKhoaHoc} />
    </div>
  );
};

export default KhoaHoc;
