import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { path } from '../../common/path'
import logo from '../../assets/cyberlogo-white.png'
import { khoaHocService } from '../../service/KhoaHoc.service'
import { Dropdown, Space } from 'antd'
import FormSearchProducts from '../Form/FormSearchProducts'
import WrapperSuggetCourse from '../Wrapper/WrapperSuggetCourse'
import FormCodeProducts from '../Form/FormCodeProducts'


const UserHeader = () => {
  // const [items, setItems] = useState([]);
  // useEffect(() => {
  //   khoaHocService.layDanhMucKhoaHoc().then((res) => {
  //     console.log(res)
  //     let newItemApi = res.data.map((item, index) => {
  //       return {
  //         label: <Link>{item.tenDanhMuc}</Link>,
  //         key: index.toString,
  //       }

  //     })
  //     setItems(newItemApi)
  //   }).catch((err) => { console.log(err) })
  // }, [])


  return (
    <header className="py-5 bg-gray-500 ">
      <div className="container  ">
        <div className="header_content flex items-center justify-between ">
          <div className="header_logo flex space-x-5 items-center">
            <Link to={path.homePage}>
              <img src={logo} alt="CyberSoft.edu.vn logo" className="cyberlogo" />
            </Link>
            <div>
              {/* <Dropdown
                menu={{
                  items,
                }}
                trigger={['click']}
              >
                <a onClick={(e) => e.preventDefault()} className='cursor-pointer '>
                  <Space className='py-2 px-4 bg-white rounded-md hover:text-yellow-400/70 duration-200 hover:bg-yellow-800'>
                    <span> <i className="fa-solid fa-bars"></i> </span>
                    Danh Mục Khoá Học
                  </Space>
                </a>
              </Dropdown> */}
              <FormCodeProducts/>
            </div>
          </div>

          <div className="header_navigate space-x-3">
                <WrapperSuggetCourse> 
                <FormSearchProducts />
                </WrapperSuggetCourse>
              
          </div>

        </div>
      </div>
    </header>
  )
}

export default UserHeader

