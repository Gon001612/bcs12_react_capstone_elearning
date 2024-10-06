import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { path } from "../../common/path";
import logo from "../../assets/cyberlogo-white.png";
import { khoaHocService } from "../../service/khoaHoc.service";
import { Avatar, Dropdown, Space } from "antd";
import FormSearchProducts from "../Form/FormSearchProducts";
import WrapperSuggetCourse from "../Wrapper/WrapperSuggetCourse";
import FormCodeProducts from "../Form/FormCodeProducts";
import { useSelector } from "react-redux";
import UserIcon from "../Icon/UserIcon";
import LogoutIcon from "../Icon/LogoutIcon";

const items = [
  {
    label: (
      <Link className="flex space-x-2 items-center">
        <UserIcon />
        <span>Thông tin cá nhân</span>
      </Link>
    ),
    key: "0",
  },
  {
    label: (
      <Link to={path.signIn} className="flex space-x-2 items-center">
        <LogoutIcon />
        <span>Đăng xuất</span>
      </Link>
    ),
    key: "1",
  },
];

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

  const { infoUser } = useSelector((state) => state.authSlice);

  const checkUserLogin = () => {
    return infoUser ? (
      <Dropdown
        menu={{
          items,
        }}
        trigger={["click"]}
      >
        <Avatar className="cursor-pointer hover:bg-orange-500 duration-300">
          {infoUser.hoTen.slice(0, 1)}
        </Avatar>
      </Dropdown>
    ) : (
      <>
        <Link
          to={path.signIn}
          className="py-2 px-4 rounded-md hover:bg-gray-200 duration-300"
        >
          sign in
        </Link>
        <Link
          to={path.signUp}
          className="py-2 px-4 text-green-500 border border-green-500 rounded-md hover:bg-green-500 duration-300 hover:text-white "
        >
          Join
        </Link>
      </>
    );
  };

  return (
    <header className="py-5 bg-gray-500 ">
      <div className="container  ">
        <div className="header_content flex items-center justify-between ">
          <div className="header_logo flex space-x-5 items-center">
            <Link to={path.homePage}>
              <img
                src={logo}
                alt="CyberSoft.edu.vn logo"
                className="cyberlogo"
              />
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
              <FormCodeProducts />
            </div>
          </div>

          <div className="header_navigate space-x-3">
            <WrapperSuggetCourse>
              <FormSearchProducts />
            </WrapperSuggetCourse>
          </div>

          <nav className="header_navigate space-x-5">{checkUserLogin()}</nav>
        </div>
      </div>
    </header>
  );
};

export default UserHeader;
