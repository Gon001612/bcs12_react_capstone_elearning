import React from 'react'
import { useRoutes } from 'react-router-dom'
import { path } from '../common/path'
import UserTemplate from '../template/UserTemplate/UserTemplate'
import ListCoursePage from '../pages/ListCoursePage/ListCoursePage'
import ListSearchCoursePage from '../pages/ListCoursePage/ListSearchCoursePage'
import ListCourseFromCodeCourse from '../pages/ListCoursePage/ListCourseFromCodeCourse'

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
        
    }
  ])
  return routes

}

export default useRoutersCustom
