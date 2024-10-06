import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getValueUserApi } from "../../redux/nguoiDungSlice";
import { Space, Table } from "antd";
import { Link, useSearchParams } from "react-router-dom";
import { nguoiDungService } from "../../service/nguoiDung.service";
import { NotificationContext } from "../../App";
import FormSearchProduct from "../../components/Form/FormSearchProduct";

const ManagerUser = () => {
  const dispatch = useDispatch();
  const { showNotification } = useContext(NotificationContext);
  const { listNguoiDung } = useSelector((state) => state.nguoiDungSlice);

  const [searchParam, setSearchParam] = useSearchParams();

  useEffect(() => {
    dispatch(getValueUserApi());
  }, [dispatch]);

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
          <button className="bg-green-500 text-white font-bold py-2 px-4 rounded">
            <Link to={"/admin/popup"}>Ghi danh</Link>
          </button>
          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
            <Link
              to={"/admin/update-user"}
              state={record} // Truyền thông tin người dùng
            >
              Sửa
            </Link>
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
      <FormSearchProduct placeholder={"Nhập vào tài khoản hoặc người dùng"} />
      <Table columns={columns} dataSource={listNguoiDung} />
    </div>
  );
};

export default ManagerUser;
