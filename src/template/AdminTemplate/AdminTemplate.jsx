import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { useSelector } from "react-redux";

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
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "2",
              icon: <i className="fa-solid fa-user"></i>,
              label: <Link to={"/admin/manager-user"}>Quản lý người dùng</Link>,
            },
            {
              key: "1",
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
        </Header>

        {/* Thêm 2 nút Sign In và Join */}
        <div
          style={{
            position: "absolute",
            top: "-40px", // Nâng vị trí các nút lên trên content
            left: "16px", // Căn các nút về phía trái
            zIndex: 1, // Đảm bảo các nút nằm trên cùng
          }}
        >
          <Button type="primary" style={{ marginRight: "10px" }}>
            Sign In
          </Button>
          <Button type="default">Join</Button>
        </div>

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            position: "relative", // Để có thể định vị các nút theo content
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminTemplate;
