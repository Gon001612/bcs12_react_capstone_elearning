import React, { useContext } from "react";
import signInAnimation from "./../../assets/animation/signInAnimation.json";
import { useLottie } from "lottie-react";
import InputCustom from "../../components/input/InputCustom";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { authService } from "../../service/auth.service";
import { setLocalStorage } from "../../utils/util";
import RegisterPage from "../RegisterPage/RegisterPage";
import { NotificationContext } from "../../App";
import { useDispatch } from "react-redux";
import useResponsive from "../../hooks/useReponsive";
import { getInfoUser } from "../../redux/authSlice";

const LoginPage = () => {
  const isReponsive = useResponsive({
    mobile: 576,
    tablet: 768,
    laptop: 1280,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showNotification } = useContext(NotificationContext);
  const options = {
    animationData: signInAnimation,
    loop: true,
  };

  const { View } = useLottie(options);
  const { handleSubmit, handleChange, values, errors, touched, handleBlur } =
    useFormik({
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
            // b1: lữu trũ ở localStorage
            setLocalStorage("user", res.data);
            dispatch(getInfoUser(res.data));
            // thực hiện thông báo và chuyển hướng người dùng
            showNotification("Đăng nhập thành công", "success", 2000);
            setTimeout(() => {
              navigate("/");
            }, 1000);
          })
          .catch((err) => {
            console.log(err);
            showNotification(err.response.data, "error");
          });
      },

      validationSchema: yup.object().shape({
        taikhoan: yup.string().required("Vui lòng nhập tài khoản"),
        matkhau: yup
          .string()
          .required("Vui lòng không bỏ trống")
          .min(6, "Vui lòng nhập tối thiểu 6 kí tự")
          .max(12, "Vui lòng nhập tối đa 12 kí tự"),
      }),
    });
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
              isReponsive.mobile ? "w-full" : "w-1/2"
            }`}
          >
            {View}
          </div>
          <div
            className={`loginPage_form ${
              isReponsive.mobile ? "w-full" : "w-1/2"
            }`}
          >
            <form className="space-y-5" onSubmit={handleSubmit}>
              <h1 className="text-center text-3xl font-medium uppercase">
                Đăng Nhập
              </h1>
              {/* Tài Khoản */}
              <InputCustom
                name={"taikhoan"}
                onChange={handleChange}
                value={values.taikhoan}
                labelContent={"Tài Khoản"}
                placeholder={"Vui lòng nhập tài khoản"}
                error={errors.taikhoan}
                touched={touched.taikhoan}
                onBlur={handleBlur}
              />
              {/* Mật khẩu */}
              <InputCustom
                name={"matkhau"}
                onChange={handleChange}
                value={values.matkhau}
                labelContent={"Mật Khẩu"}
                placeholder={"Vui lòng nhập mật khẩu"}
                typeInput="password"
                error={errors.matkhau}
                touched={touched.matkhau}
                onBlur={handleBlur}
              />
              <div>
                <button
                  type="submit"
                  className="inline-block w-full bg-black text-white py-2 px-5 rounded-md "
                >
                  Đăng Nhập
                </button>
                Chưa có tài khoản?
                <Link
                  to="/register"
                  className="mt-3 text-blue-600 hover:underline duration-300"
                >
                  Hãy bấm vào đây
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
