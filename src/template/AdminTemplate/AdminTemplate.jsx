import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { useSelector } from "react-redux";
import UserHeader from "../../pages/ManagerUser/UserHeader";

const { Header, Sider, Content } = Layout;

const AdminTemplate = () => {
  const { infoUser } = useSelector((state) => state.authSlice);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className="min-h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        {/* Thêm div chứa logo và tiêu đề */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "64px",
            marginBottom: "16px",
          }}
        >
          <img
            src="https://i.imgur.com/lC22izJ.png"
            alt="Logo"
            style={{ maxWidth: "40px", height: "auto", marginRight: "8px" }}
          />
          <h1 className="text-white font-bold" style={{ fontSize: "16px" }}>
            Dashboard
          </h1>{" "}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <i className="fa-solid fa-user"></i>,
              label: <Link to={"/admin/manager-user"}>Quản lý người dùng</Link>,
            },
            {
              key: "2",
              icon: <i className="fa-solid fa-book"></i>,
              label: <Link to={"/admin/khoahoc"}>Quản lý khóa học</Link>,
            },
          ]}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex", // Sử dụng flexbox
            alignItems: "center", // Căn giữa theo chiều dọc
            justifyContent: "space-between", // Căn giữa theo chiều ngang
            gap: "16px", // Đặt khoảng cách giữa các phần tử
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <UserHeader />
        </Header>

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            position: "relative",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminTemplate;
