import React from 'react';
import {
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Link, Outlet } from 'react-router-dom';

const { Sider } = Layout;

const Template: React.FC = () => {
  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={false}>
        <div className="demo-logo-vertical" />
        <Menu
        style={{position:'fixed', left:0, width:'200px'}}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <Link to="/"><UserOutlined /></Link>,
              label: 'Invoices',
            },
            {
              key: '2',
              icon: <Link to="/clients"><UserOutlined /></Link>,
              label: 'Clients',
            },
            {
              key: '3',
              icon: <Link to="/upload_invoice"><VideoCameraOutlined /></Link>,
              label: 'Upload Invoice',
            }
          ]}
        />
      </Sider>
      <Layout style={{minHeight:'100vh'}}> 
        <div
          style={{
            margin: '24px',
            padding: 0,
            background: '#f5f5f5',
            borderRadius: borderRadiusLG,
          }}
        >
            <Outlet />
        </div>
      </Layout>
    </Layout>
  );
};

export default Template;