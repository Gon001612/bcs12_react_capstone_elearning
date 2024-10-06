import React, { useContext, useState, useEffect } from "react";
import { NotificationContext } from "../../App";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Thêm useLocation
import { useDispatch } from "react-redux";
import { nguoiDungService } from "../../service/nguoiDung.service";
import InputCustom from "../../components/input/InputCustom";
import { getValueUserApi } from "../../redux/nguoiDungSlice";

const UpdateUser = () => {
  const { showNotification } = useContext(NotificationContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation(); // Nhận location
  const user = location.state; // Lấy thông tin người dùng từ state

  const [valueUser, setValueUser] = useState({
    taiKhoan: "",
    matKhau: "",
    hoTen: "",
    soDT: "",
    maLoaiNguoiDung: true,
    maNhom: "",
    email: "",
  });

  // Sử dụng useEffect để khởi tạo giá trị người dùng
  useEffect(() => {
    if (user) {
      setValueUser({
        taiKhoan: user.taiKhoan,
        matKhau: user.matKhau || "", // Giả sử bạn không muốn hiển thị mật khẩu
        hoTen: user.hoTen,
        soDT: user.soDT,
        maLoaiNguoiDung: user.maLoaiNguoiDung,
        maNhom: user.maNhom || "",
        email: user.email,
      });
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    nguoiDungService
      .UpdateUser(valueUser)
      .then((res) => {
        console.log(res);
        dispatch(getValueUserApi());
        showNotification("Cập nhật người dùng thành công", "success", 2000);
        setTimeout(() => {
          navigate("/admin/manager-user");
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        showNotification(err.response.data, "error");
      });
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setValueUser({ ...valueUser, [name]: value });
  };

  return (
    <div>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="flex flex-wrap gap-5">
          {/* Cột 1: Tài khoản, Mật khẩu, Họ tên */}
          <div className="flex-1 bg-gray-100 p-5 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">
              Cập nhật thông tin người dùng
            </h3>
            <InputCustom
              labelContent={"Tài Khoản"}
              name="taiKhoan"
              value={valueUser.taiKhoan} // Hiển thị giá trị
              onChange={handleChangeInput}
              disabled // Không cho phép sửa tài khoản
            />
            <InputCustom
              labelContent={"Mật khẩu"}
              typeInput="password"
              name="matKhau"
              value={valueUser.matKhau} // Hiển thị giá trị
              onChange={handleChangeInput}
            />
            <InputCustom
              labelContent={"Họ tên"}
              name="hoTen"
              value={valueUser.hoTen} // Hiển thị giá trị
              onChange={handleChangeInput}
            />
          </div>

          {/* Cột 2: Email, Số điện thoại, Loại người dùng */}
          <div className="flex-1 bg-gray-100 p-5 rounded-lg shadow-md">
            <InputCustom
              labelContent={"Email"}
              name="email"
              value={valueUser.email} // Hiển thị giá trị
              onChange={handleChangeInput}
            />
            <InputCustom
              labelContent={"Số điện thoại"}
              name="soDT"
              value={valueUser.soDT} // Hiển thị giá trị
              onChange={handleChangeInput}
            />
            <InputCustom
              labelContent={"Mã Nhóm"}
              name="maNhom"
              value={valueUser.maNhom} // Hiển thị giá trị
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
                value={valueUser.maLoaiNguoiDung} // Hiển thị giá trị
                onChange={handleChangeInput}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option value="GV">Giáo Vụ</option>
                <option value="HV">Học Viên</option>
              </select>
            </div>
          </div>
        </div>

        {/* Các nút hành động */}
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
              type="submit"
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

export default UpdateUser;
