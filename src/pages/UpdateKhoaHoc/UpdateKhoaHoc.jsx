import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { NotificationContext } from "../../App";
import InputCustom from "../../components/input/InputCustom";

const UpdateKhoaHoc = () => {
  const { listKhoaHoc } = useSelector((state) => state.authSlice);
  const { showNotification } = useContext(NotificationContext);
  const { infoUser } = useSelector((state) => state.authSlice);
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState(null);

  const [valueKhoaHoc, setValueKhoaHoc] = useState({
    maKhoaHoc: "string",
    biDanh: "string",
    tenKhoaHoc: "string",
    moTa: "string",
    luotXem: 0,
    danhGia: 0,
    hinhAnh: "string",
    maNhom: "string",
    ngayTao: "string",
    maDanhMucKhoaHoc: "string",
    taiKhoanNguoiTao: "string",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(valueKhoaHoc);
    nguoiDungService
      .CreateKhoaHoc(valueKhoaHoc)
      .then((res) => {
        console.log(res);
        setLocalStorage("user", res.data);
        dispatch(getInfoUser(res.data));
        showNotification("Thêm khoá học thành công", "success", 2000);
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
    setValueKhoaHoc({ ...valueKhoaHoc, [name]: value });
  };

  const handleUpLoadAvatar = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("frm", avatar.file);

    khoaHocService.upLoadAvatar();
  };

  const handleRenderStep = () => {
    switch (step) {
      case 0:
        return (
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="flex flex-wrap gap-5">
              <div className="flex-1 bg-gray-100 p-5 rounded-lg shadow-md">
                <h3 className="font-semibold text-xl mb-3">
                  Thông tin khóa học
                </h3>
                <InputCustom
                  labelContent={"Mã Khóa Học"}
                  name="maKhoaHoc"
                  onChange={handleChangeInput}
                />
                <InputCustom
                  labelContent={"Tên Khóa Học"}
                  name="tenKhoaHoc"
                  onChange={handleChangeInput}
                />
                <div>
                  <label
                    htmlFor="userType"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Danh mục khóa học
                  </label>
                  <select
                    name="maDanhMucKhoaHoc"
                    onChange={handleChangeInput}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  >
                    <option value="BackEnd">Lập trình Backend</option>
                    <option value="Design">Thiết kế Web</option>
                    <option value="DiDong">Lập trình di động</option>
                    <option value="FrontEnd">Lập trình Front end</option>
                    <option value="FullStack">Lập trình Full Stack</option>
                    <option value="TuDuy">Tư duy lập trình</option>
                  </select>
                </div>
                {/* Ngày tạo */}
                <div>
                  <label
                    htmlFor="date"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Ngày Tạo
                  </label>
                  <input type="date" />
                </div>
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
                    Người tạo
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
                <div className="space-y-3">
                  <label htmlFor="">Hình ảnh</label>
                  <input
                    type="file"
                    onChange={(e) => {
                      console.log(e.target.files[0]);
                      if (e.target.files[0]) {
                        const urlAvatar = URL.createObjectURL(
                          e.target.files[0]
                        );
                        console.log(urlAvatar);
                        setAvatar({
                          file: e.target.files[0],
                          url: urlAvatar,
                        });
                      }
                    }}
                    accept="image/png, image/jpeg"
                  />
                </div>
                <img src={avatar?.url} width={100} sizes="" />
              </div>
            </div>
            <InputCustom labelContent={"Mô tả"} name="moTa" />

            {/* Các nút hành động */}
            <div className="flex justify-between items-center mt-5">
              <button
                type="button"
                className="font-bold py-2 px-4 rounded mb-5"
              >
                <Link to={"/admin/khoahoc"}>Trở Lại</Link>
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
      <h2 className="font-semibold text-2xl mb-5">Cập Nhật Khóa Học</h2>
      {handleRenderStep()}
    </div>
  );
};

export default UpdateKhoaHoc;
