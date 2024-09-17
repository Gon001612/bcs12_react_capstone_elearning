import React, { useState } from "react";
import InputCustom from "../../components/input/InputCustom";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { nguoiDungService } from "../../service/nguoiDung.service";

const CreateUser = () => {
  const [step, setStep] = useState(0);
  const dispatch = useDispatch();
  const [valueUser, setValueUser] = useState({
    taiKhoan: "",
    matKhau: "",
    hoTen: "",
    soDT: "",
    maLoaiNguoiDung: "",
    maNhom: "",
    email: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(valueUser);
    nguoiDungService
      .createUser(valueUser)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setValueUser({ ...valueUser, [name]: value });
  };

  const handleRenderStep = () => {
    switch (step) {
      case 0:
        return (
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="flex flex-wrap gap-5">
              {/* Cột 1: Tài khoản, Mật khẩu, Họ tên */}
              <div className="flex-1 bg-gray-100 p-5 rounded-lg shadow-md">
                <h3 className="font-semibold text-xl mb-3">
                  Thông tin tài khoản
                </h3>
                <InputCustom
                  labelContent={"Tài Khoản"}
                  name="taiKhoan"
                  value={valueUser.taiKhoan} // Liên kết giá trị
                  onChange={handleChangeInput}
                />
                <InputCustom
                  labelContent={"Mật khẩu"}
                  typeInput="password"
                  name="matKhau"
                  value={valueUser.matKhau} // Liên kết giá trị
                  onChange={handleChangeInput}
                />
                <InputCustom
                  labelContent={"Họ tên"}
                  name="hoTen"
                  value={valueUser.hoTen} // Liên kết giá trị
                  onChange={handleChangeInput}
                />
              </div>

              {/* Cột 2: Email, Số điện thoại, Loại người dùng */}
              <div className="flex-1 bg-gray-100 p-5 rounded-lg shadow-md">
                <InputCustom
                  labelContent={"Email"}
                  name="email"
                  value={valueUser.email} // Liên kết giá trị
                  onChange={handleChangeInput}
                />
                <InputCustom
                  labelContent={"Số điện thoại"}
                  name="soDT"
                  value={valueUser.soDT} // Liên kết giá trị
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
                    value={valueUser.maLoaiNguoiDung} // Liên kết giá trị
                    onChange={handleChangeInput}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  >
                    <option value="Giáo Vụ">Giáo Vụ</option>
                    <option value="Học Viên">Học Viên</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Các nút hành động */}
            <div className="flex justify-between items-center mt-5">
              <button
                type="button"
                className="font-bold py-2 px-4 rounded mb-5"
              >
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
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <h2 className="font-semibold text-2xl mb-5">Thêm Người dùng</h2>
      {handleRenderStep()}
    </div>
  );
};

export default CreateUser;
