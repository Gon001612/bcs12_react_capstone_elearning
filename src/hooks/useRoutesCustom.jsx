import React from "react";
import { useRoutes } from "react-router-dom";
import AdminTemplate from "../template/AdminTemplate/AdminTemplate";
import { path } from "../common/path";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import AdminLogin from "../pages/AdminLogin/AdminLogin";
import ManagerUser from "../pages/ManagerUser/ManagerUser";

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
          // path: "/manager-user",
          index: true,
          element: <ManagerUser />,
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
