import React from "react";
import { useRoutes } from "react-router-dom";
import AdminTemplate from "../template/AdminTemplate/AdminTemplate";
import { path } from "../common/path";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";

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
  ]);
  return routes;
};

export default useRoutesCustom;
