import { Input } from "antd";
import { useFormik } from "formik";
import React, { useContext } from "react";
import * as yup from "yup";
import InputCustom from "../../components/input/InputCustom";
import signInAnimation from "./../../assets/animation/signInAnimation.json";
import { useLottie } from "lottie-react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { authService } from "../../service/auth.service";
import { NotificationContext } from "../../App";
import { setLocalStorage } from "../../utils/util";
import useResponsive from "../../hooks/useReponsive";

const RegisterPage = () => {
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
  const navigate = useNavigate();
  const { showNotification } = useContext(NotificationContext);
  const { handleSubmit, handleChange, values, errors, touched, handleBlur } =
    useFormik({
      initialValues: {
        taikhoan: "",
        matkhau: "",
        hoten: "",
        sodienthoai: "",
        manhom: "",
        email: "",
      },
      onSubmit: (values) => {
        if (!values.sodienthoai) {
          values.sodienthoai = ""; // Đảm bảo không trả về null
        }
        console.log(values);
        authService
          .signUp(values)
          .then((res) => {
            console.log(res);
            setLocalStorage("user", res.data);
            showNotification("Đăng kí thành công", "success", 2000);
            setTimeout(() => {
              navigate("/sign-in");
            }, 1000);
          })
          .catch((err) => {
            console.log(err);
            showNotification(err.response.data.message, "error");
          });
      },
      validationSchema: yup.object().shape({
        taikhoan: yup.string().required("Vui lòng nhập tài khoản"),
        matkhau: yup
          .string()
          .required("Vui lòng nhập mật khẩu")
          .min(6, "Vui lòng nhập tối thiểu 6 kí tự")
          .max(12, "Vui lòng nhập tối đa 12 kí tự"),
        hoten: yup.string().required("Vui lòng nhập họ tên"),
        sodienthoai: yup
          .string()
          .required("Vui lòng nhập số điện thoại")
          .matches(/^[0-9]+$/, "Số điện thoại không hợp lệ")
          .min(10, "Số điện thoại phải có ít nhất 10 chữ số"),
        manhom: yup.string().required("Vui lòng nhập mã nhóm"),
        email: yup
          .string()
          .required("Vui lòng nhập email")
          .email("Email không hợp lệ"),
      }),
    });
  return (
    <div className="">
      <div className="container">
        <div
          className={`register_content ${
            isReponsive.mobile ? "block" : "flex"
          } items-center h-screen`}
        >
          <div
            className={`register_img ${
              isReponsive.mobile ? "w-full" : "w-1/2"
            }`}
          >
            {View}
          </div>
          <div
            className={`register_form ${
              isReponsive.mobile ? "w-full" : "w-1/2"
            }`}
          >
            <form className="space-y-5" onSubmit={handleSubmit}>
              <h1 className="text-center text-3xl font-bold uppercase">
                Đăng kí
              </h1>
              <InputCustom
                name={"taikhoan"}
                onChange={handleChange}
                value={values.taikhoan}
                labelContent={"Tài khoản"}
                placeholder={"Vui lòng nhập tài khoản"}
                error={errors.taikhoan}
                touched={touched.taikhoan}
                onBlur={handleBlur}
              />
              <InputCustom
                name={"matkhau"}
                onChange={handleChange}
                value={values.matkhau}
                labelContent={"Mật khẩu"}
                placeholder={"Vui lòng nhập mật khẩu"}
                error={errors.matkhau}
                touched={touched.matkhau}
                onBlur={handleBlur}
              />
              <InputCustom
                name={"hoten"}
                onChange={handleChange}
                value={values.hoten}
                labelContent={"Họ tên"}
                placeholder={"Vui lòng nhập họ tên"}
                error={errors.hoten}
                touched={touched.hoten}
                onBlur={handleBlur}
              />
              <InputCustom
                name={"sodienthoai"}
                onChange={handleChange}
                value={values.sodienthoai}
                labelContent={"Số điện thoại"}
                placeholder={"Vui lòng nhập số điện thoại"}
                error={errors.sodienthoai}
                touched={touched.sodienthoai}
                onBlur={handleBlur}
              />
              <InputCustom
                name={"manhom"}
                onChange={handleChange}
                value={values.manhom}
                labelContent={"Mã nhóm"}
                placeholder={"Vui lòng nhập mã nhóm"}
              />
              <InputCustom
                name={"email"}
                onChange={handleChange}
                value={values.email}
                labelContent={"Email"}
                placeholder={"Vui lòng nhập email"}
                error={errors.email}
                touched={touched.email}
                onBlur={handleBlur}
              />

              <div>
                <button
                  type="submit"
                  className="inline-block w-full bg-black text-white py-2 px-5 rounded-md"
                >
                  Đăng Kí
                </button>
                Nếu đã có tài khoản?
                <Link
                  to="/sign-in"
                  className="mt-3 text-blue-600 inline-block hover:underline duration-300"
                >
                  Thì bấm vào đây
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
