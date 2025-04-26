import React from 'react';
import { Layout, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const { Content, Footer } = Layout;

const MainLayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


  return (
    <Layout style={{ minHeight: '100vh' }}> 
      <Header />
      <Content style={{ padding: '48px', display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            background: colorBgContainer,
            flex: 1,
            padding: 24,
            borderRadius: borderRadiusLG,
            overflowY: 'auto',
          }}
        >
          <Outlet />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©{new Date().getFullYear()} Created by Ayan
      </Footer>

    </Layout>
  );
};

export default MainLayout;
