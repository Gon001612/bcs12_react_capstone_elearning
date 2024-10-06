import React, { useContext, useState } from "react";
import InputCustom from "../../components/input/InputCustom";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { nguoiDungService } from "../../service/nguoiDung.service";
import { NotificationContext } from "../../App";

const CreateKhoaHoc = () => {
  const { infoUser } = useSelector((state) => state.authSlice); // Lấy thông tin người dùng từ Redux
  const { showNotification } = useContext(NotificationContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState(null);

  const [valueKhoaHoc, setValueKhoaHoc] = useState({
    maKhoaHoc: "",
    biDanh: "",
    tenKhoaHoc: "",
    moTa: "",
    luotXem: 0,
    danhGia: 0,
    hinhAnh: "",
    maNhom: "GP01",
    ngayTao: "",
    maDanhMucKhoaHoc: "",
    taiKhoanNguoiTao: infoUser?.taiKhoan || "", // Thiết lập giá trị mặc định
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    nguoiDungService
      .CreateKhoaHoc(valueKhoaHoc)
      .then((res) => {
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

    // Nếu người dùng là giảng viên, tự động điền trường taiKhoanNguoiTao
    if (name === "maLoaiNguoiDung" && value === "GV") {
      setValueKhoaHoc({
        ...valueKhoaHoc,
        taiKhoanNguoiTao: infoUser?.taiKhoan,
      });
    } else {
      setValueKhoaHoc({ ...valueKhoaHoc, [name]: value });
    }
  };

  const handleUpLoadAvatar = () => {
    if (!avatar) {
      showNotification("Chưa có ảnh được chọn", "error", 2000);
      return;
    }

    let formData = new FormData();
    formData.append("file", avatar.file);

    khoaHocService
      .upLoadAvatar(formData)
      .then((res) => {
        setValueKhoaHoc({ ...valueKhoaHoc, hinhAnh: res.data.url });
        showNotification("Tải lên ảnh thành công!", "success", 2000);
      })
      .catch((err) => {
        console.error("Lỗi khi tải lên ảnh:", err);
        showNotification("Tải lên ảnh thất bại!", "error", 2000);
      });
  };

  const handleRenderStep = () => {
    return (
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="flex flex-wrap gap-5">
          <div className="flex-1 bg-gray-100 p-5 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Thông tin khóa học</h3>
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
            <div>
              <label
                htmlFor="date"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Ngày Tạo
              </label>
              <input
                type="date"
                name="ngayTao"
                onChange={handleChangeInput}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
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
              <input
                type="text"
                value={valueKhoaHoc.taiKhoanNguoiTao}
                readOnly // Chỉ đọc
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              />
            </div>
            <div className="space-y-3">
              <label htmlFor="">Hình ảnh</label>
              <input
                type="file"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const urlAvatar = URL.createObjectURL(file);
                    setAvatar({
                      file,
                      url: urlAvatar,
                    });
                  }
                }}
                accept="image/png, image/jpeg"
              />
            </div>
            {avatar && avatar.url && (
              <img src={avatar.url} alt="Preview" width={100} />
            )}
            <button
              type="button"
              onClick={handleUpLoadAvatar}
              className="bg-green-500 text-white font-bold mt-2 py-2 px-4 rounded"
            >
              Tải lên ảnh
            </button>
          </div>
        </div>
        <InputCustom
          labelContent={"Mô tả"}
          name="moTa"
          onChange={handleChangeInput}
        />

        {/* Các nút hành động */}
        <div className="flex justify-between items-center mt-5">
          <button type="button" className="font-bold py-2 px-4 rounded mb-5">
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
  };

  return (
    <div>
      <h2 className="font-semibold text-2xl mb-5">Thêm Khóa Học</h2>
      {handleRenderStep()}
    </div>
  );
};

export default CreateKhoaHoc;
