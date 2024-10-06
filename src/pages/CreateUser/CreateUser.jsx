import React, { useContext, useState } from "react";
import InputCustom from "../../components/input/InputCustom";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { nguoiDungService } from "../../service/nguoiDung.service";
import { NotificationContext } from "../../App";
import { getInfoUser } from "../../redux/authSlice";
import { setLocalStorage } from "../../utils/util";
import { getValueUserApi } from "../../redux/nguoiDungSlice"; // Import getValueUserApi

const CreateUser = () => {
  const { showNotification } = useContext(NotificationContext);
  const [valueUser, setValueUser] = useState({
    taiKhoan: "",
    matKhau: "",
    hoTen: "",
    soDT: "",
    maLoaiNguoiDung: true,
    maNhom: "",
    email: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    nguoiDungService
      .createUser(valueUser)
      .then((res) => {
        setLocalStorage("user", res.data);
        dispatch(getInfoUser(res.data));
        dispatch(getValueUserApi()); // Gọi lại để cập nhật danh sách người dùng
        showNotification("Thêm người dùng thành công", "success", 2000);
        setTimeout(() => {
          navigate("/admin/manager-user");
        }, 1000);
      })
      .catch((err) => {
        showNotification(err.response.data, "error");
      });
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setValueUser({ ...valueUser, [name]: value });
  };

  return (
    <div>
      <h2 className="font-semibold text-2xl mb-5">Thêm Người dùng</h2>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="flex flex-wrap gap-5">
          <div className="flex-1 bg-gray-100 p-5 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Thông tin tài khoản</h3>
            <InputCustom
              labelContent={"Tài Khoản"}
              name="taiKhoan"
              onChange={handleChangeInput}
            />
            <InputCustom
              labelContent={"Mật khẩu"}
              typeInput="password"
              name="matKhau"
              onChange={handleChangeInput}
            />
            <InputCustom
              labelContent={"Họ tên"}
              name="hoTen"
              onChange={handleChangeInput}
            />
          </div>
          <div className="flex-1 bg-gray-100 p-5 rounded-lg shadow-md">
            <InputCustom
              labelContent={"Email"}
              name="email"
              onChange={handleChangeInput}
            />
            <InputCustom
              labelContent={"Số điện thoại"}
              name="soDT"
              onChange={handleChangeInput}
            />
            <InputCustom
              labelContent={"Mã Nhóm"}
              name="maNhom"
              onChange={handleChangeInput}
            />
            <div>
              <label
                htmlFor="userType"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Loại Người Dùng
              </label>
              <select
                name="maLoaiNguoiDung"
                onChange={handleChangeInput}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option value="GV">Giáo Vụ</option>
                <option value="HV">Học Viên</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-5">
          <button type="button" className="font-bold py-2 px-4 rounded mb-5">
            <Link to={"/admin/manager-user"}>Trở Lại</Link>
          </button>
          <div className="flex space-x-3">
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
            >
              Thêm
            </button>
            <button
              type="button"
              className="bg-red-500 text-white font-bold py-2 px-4 rounded"
            >
              Lưu
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
