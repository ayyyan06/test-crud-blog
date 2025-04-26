import React from "react";
import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const location = useLocation();
  const selectedKey = location.pathname === '/' ? 'home' : location.pathname.slice(1); 

  return (
    <Layout.Header style={{ display: 'flex', alignItems: 'center' }}>
      <div className="demo-logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[selectedKey]}
        style={{ flex: 1, minWidth: 0 }}
      >
        <Menu.Item key="home"><Link to="/">Home</Link></Menu.Item>
        <Menu.Item key="create"><Link to="/create">Create</Link></Menu.Item>
      </Menu>
    </Layout.Header>
  );
};

export default Header;
