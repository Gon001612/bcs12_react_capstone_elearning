import React, { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import AdminTemplate from "../template/AdminTemplate/AdminTemplate";
import { path } from "../common/path";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import AdminLogin from "../pages/AdminLogin/AdminLogin";
// import ManagerUser from "../pages/ManagerUser/ManagerUser";
import KhoaHoc from "../pages/KhoaHoc/KhoaHoc";
import { Skeleton } from "antd";
import CreateUser from "../pages/CreateUser/CreateUser";
import CreateKhoaHoc from "../pages/CreateKhoaHoc/CreateKhoaHoc";
import ListUser from "../pages/ListUser/ListUser";
import UpdateUser from "../pages/UpdateUser/UpdateUser";
import UpdateKhoaHoc from "../pages/UpdateKhoaHoc/UpdateKhoaHoc";
import Popup from "../pages/ManagerUser/Popup";
import PopupKH from "../pages/KhoaHoc/PopupKH";
const ManagerUser = React.lazy(() =>
  import("../pages/ManagerUser/ManagerUser")
);

const useRoutesCustom = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <AdminTemplate />,
    },
    {
      path: path.signIn,
      element: <LoginPage />,
    },
    {
      path: path.signUp,
      element: <RegisterPage />,
    },
    {
      path: path.admin,
      element: <AdminTemplate />,
      children: [
        {
          path: "manager-user",
          index: true,
          element: (
            <Suspense fallback={<Skeleton />}>
              <ManagerUser />,
            </Suspense>
          ),
        },
        {
          path: "khoahoc",
          element: <KhoaHoc />,
        },
        {
          path: "create-user",
          element: <CreateUser />,
        },
        {
          path: "create-khoahoc",
          element: <CreateKhoaHoc />,
        },
        {
          path: "update-user",
          element: <UpdateUser />,
        },
        {
          path: "update-khoahoc",
          element: <UpdateKhoaHoc />,
        },
        {
          path: "popup",
          element: <Popup />,
        },
        {
          path: "popupkh",
          element: <PopupKH />,
        },
      ],
    },
    {
      path: "/admin-login",
      element: <AdminLogin />,
    },
  ]);
  return routes;
};

export default useRoutesCustom;
