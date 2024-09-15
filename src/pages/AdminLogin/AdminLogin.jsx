import React, { useContext } from "react";
import InputCustom from "../../components/input/InputCustom";
import { useLottie } from "lottie-react";
import signInAnimation from "./../../assets/animation/signInAnimation.json";
import useResponsive from "../../hooks/useReponsive";
import { useFormik } from "formik";
import { authService } from "../../service/auth.service";
import { NotificationContext } from "../../App";
import { getLocalStorage, setLocalStorage } from "../../utils/util";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showNotification } = useContext(NotificationContext);
  const { values, handleSubmit, handleChange } = useFormik({
    initialValues: {
      taikhoan: "",
      matkhau: "",
    },
    onSubmit: (values) => {
      console.log(values);
      authService
        .signIn(values)
        .then((res) => {
          console.log(res);
          if (res.data.maLoaiNguoiDung == "HV") {
            showNotification(
              "bạn không phải admin không thể đăng nhập",
              "error"
            );
            let soLanViPham = getLocalStorage("soLanViPham");
            if (!soLanViPham) {
              setLocalStorage("soLanViPham", 1);
            } else {
              soLanViPham++;
              soLanViPham == 3
                ? (window.location.href = "http://google.com")
                : setLocalStorage("soLanViPham", soLanViPham);
            }
          } else {
            setLocalStorage("user", res.data);
            dispatch(getInfoUser(res.data));
            navigate("/admin");
          }
        })
        .catch((err) => {
          console.log(err);
          showNotification(
            "Vui lòng báo về bộ phận chăm sóc khách hàng",
            "error"
          );
        });
    },
  });
  const isReponsive = useResponsive({
    mobile: 576,
    tablet: 768,
    laptop: 1280,
  });
  const options = {
    animationData: signInAnimation,
    loop: true,
  };

  const { View } = useLottie(options);
  return (
    <div>
      <div className="container">
        <div
          className={`loginPage_content ${
            isReponsive.mobile ? "block" : "flex"
          } items-center h-screen`}
        >
          <div
            className={`loginPage_img ${
              isReponsive.mobile ? "w-full" : "w-1/3"
            }`}
          >
            {View}
          </div>
          <div
            className={`loginPage_form ${
              isReponsive.mobile ? "w-full" : "w-1/2"
            }`}
          >
            <h2 className="text-3xl font-bold text-center mb-5">
              Đăng nhập của Admin
            </h2>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <InputCustom
                name={"taikhoan"}
                onChange={handleChange}
                value={values.taikhoan}
                placeholder={"Vui lòng nhập tài khoản"}
                labelContent={"Tài Khoản"}
              />
              <InputCustom
                name={"matkhau"}
                onChange={handleChange}
                value={values.matkhau}
                placeholder={"Vui lòng nhập mật khẩu"}
                typeInput="password"
                labelContent={"Mật Khẩu"}
              />
              <div>
                <button
                  type="submit"
                  className="py-3 px-5 w-full block bg-black text-white rounded-md"
                >
                  Đăng Nhập
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
