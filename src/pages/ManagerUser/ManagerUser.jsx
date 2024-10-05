import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getValueUserApi } from "../../redux/nguoiDungSlice";
import { Space, Table } from "antd";
import { Link, useSearchParams } from "react-router-dom";
import { nguoiDungService } from "../../service/nguoiDung.service";
import { NotificationContext } from "../../App";
import FormSearchProduct from "../../components/Form/FormSearchProduct";
import Popup from "../../components/Popup/Popup";

const ManagerUser = () => {
  const dispatch = useDispatch();
  const { showNotification } = useContext(NotificationContext);
  const { listNguoiDung } = useSelector((state) => state.nguoiDungSlice);

  // State quản lý popup
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [searchParam, setSearchParam] = useSearchParams();

  useEffect(() => {
    dispatch(getValueUserApi());
  }, [dispatch]);

  const onSearch = (value) => {
    console.log(value);
  };

  const handleGhiDanhClick = (record) => {
    setSelectedCourse(record);
    setIsPopupVisible(true); // Hiển thị popup
  };

  const handlePopupClose = () => {
    setIsPopupVisible(false); // Ẩn popup
  };

  const handlePopupConfirm = () => {
    // Thực hiện hành động ghi danh
    console.log(`Đã ghi danh cho khóa học: ${selectedCourse?.taiKhoan}`);
    setIsPopupVisible(false); // Ẩn popup sau khi xác nhận
  };

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
        <tag color={text === "HV" ? "cyan-inverse" : "red-inverse"}>{text}</tag>
      ),
    },
    {
      title: "Thao Tác",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button
            className="bg-green-500 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleGhiDanhClick(record)} // Gọi hàm khi nhấn nút
          >
            Ghi danh
          </button>
          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
            <Link to={"/admin/update-user"}>Sửa</Link>
          </button>
          <button
            onClick={() => {
              nguoiDungService
                .deleteUser(record.taiKhoan)
                .then((res) => {
                  console.log(res);
                  dispatch(getValueUserApi());
                  showNotification("Xóa thành công", "success", 2000);
                })
                .catch((err) => {
                  console.log(err);
                  showNotification(err.response.data, "error");
                });
            }}
            className="bg-red-500 text-white font-bold py-2 px-4 rounded"
          >
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
      <FormSearchProduct />
      <Table columns={columns} dataSource={listNguoiDung} />

      {/* Sử dụng Popup component */}
      <Popup
        visible={isPopupVisible}
        onClose={handlePopupClose}
        onConfirm={handlePopupConfirm}
        course={selectedCourse}
      />
    </div>
  );
};

export default ManagerUser;
