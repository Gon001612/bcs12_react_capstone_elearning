import React, { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import { path } from '../common/path'
import UserTemplate from '../template/UserTemplate/UserTemplate'
import ListCoursePage from '../pages/ListCoursePage/ListCoursePage'
import ListSearchCoursePage from '../pages/ListCoursePage/ListSearchCoursePage'
import ListCourseFromCodeCourse from '../pages/ListCoursePage/ListCourseFromCodeCourse'
import AdminTemplate from "../template/AdminTemplate/AdminTemplate";
import LoginPage from '../pages/LoginPage/LoginPage'
import RegisterPage from '../pages/RegisterPage/RegisterPage'
import ManagerUser from '../pages/ManagerUser/ManagerUser'
import KhoaHoc from '../pages/KhoaHoc/KhoaHoc'
import CreateUser from '../pages/CreateUser/CreateUser'
import { Skeleton } from 'antd'
import AdminLogin from '../pages/AdminLogin/AdminLogin'



const useRoutersCustom = () => {
  const routes = useRoutes([
    {
        path: path.homePage,
        element: <UserTemplate/>,
        children: [
          {
            index: true,
            element: <ListCoursePage/>
          },
          {
            path: path.courseList,
            element: <ListSearchCoursePage/>
          },
          {
            path: '/danhMucKhoaHoc',
            element: <ListCourseFromCodeCourse/>
            
          }
        ]
        
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
          // index: true,
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
      ],
    },
    {
      path: "/admin-login",
      element: <AdminLogin />,
    },

  ])
  return routes

}

export default useRoutersCustom
