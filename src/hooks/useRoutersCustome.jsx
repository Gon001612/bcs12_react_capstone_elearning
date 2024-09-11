import React from 'react'
import { useRoutes } from 'react-router-dom'
import { path } from '../common/path'
import UserTemplate from '../template/UserTemplate/UserTemplate'
import ListCorusePage from '../pages/ListCoursePage/ListCorusePage'

const useRoutersCustom = () => {
  const routes = useRoutes([
    {
        path: path.homePage,
        element: <UserTemplate/>,
        children: [
          {
            index: true,
            element: <ListCorusePage/>
          },
          {
            path: '/'
          }
        ]
        
    }
  ])
  return routes

}

export default useRoutersCustom
