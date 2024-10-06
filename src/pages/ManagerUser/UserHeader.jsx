// src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../ManagerUser/UserHeader.css";
import { useSelector } from "react-redux";
import { Avatar, Dropdown } from "antd";
import { path } from "../../common/path";
import UserIcon from "../../components/Icon/UserIcon";
import LogoutIcon from "../../components/Icon/LogoutIcon";

const items = [
  {
    label: (
      <Link className="flex space-x-2 items-center">
        <UserIcon />
        <span>Cập Nhật Thông Tin</span>
      </Link>
    ),
    key: "0",
  },
  {
    label: (
      <Link className="flex space-x-2 items-center" to={"/admin-login"}>
        <LogoutIcon />
        <span> Đăng Xuất</span>
      </Link>
    ),
    key: "1",
  },
];

const UserHeader = () => {
  const { infoUser } = useSelector((state) => state.authSlice);

  const checkUserLogin = () => {
    return infoUser ? (
      <div className="flex items-center space-x-2">
        <span>Chào, {infoUser.taiKhoan}</span>
        <Dropdown
          menu={{
            items,
          }}
          trigger={["click"]}
        >
          <Avatar className="cursor-pointer hover:bg-orange-500">
            {infoUser.taiKhoan.charAt(0).toUpperCase()}
          </Avatar>
        </Dropdown>
      </div>
    ) : (
      <>
        <Link
          to={path.signIn}
          className="py-2 px-4 rounded-md hover:bg-gray-200 duration-300"
        >
          Đăng Nhập
        </Link>
        <Link
          to={path.signUp}
          className="py-2 px-4 text-green-500 border border-green-500 rounded-md hover:bg-green-500 duration-300 hover:text-white"
        >
          Đăng Ký
        </Link>
      </>
    );
  };

  return <div>{checkUserLogin()}</div>;
};

export default UserHeader;
