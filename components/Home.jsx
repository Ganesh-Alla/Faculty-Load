"use client"
import React, { useState } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Layout, Menu, theme } from 'antd';
import Faculty from './Faculty';
const { Header, Content, Sider } = Layout;

const items1 = [
    {name:"Faculty",icon:UserOutlined},
    {name:"Load Allocation",icon:LaptopOutlined}
].map((item, index) => {
  const key = String(index + 1);
  return {
    key: key,
    icon: React.createElement(item.icon),
    label: item.name,
  };
});

const Home = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const values = Form.useWatch([], form);
  const [count, setCount] = useState(0);

  const [faculty, setfaculty] = useState(true)
  return (
    <Layout>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          position:'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          height:80
        }}
      >
      <h1 className='text-xl font-bold text-white'>Faculty Load Allocation</h1>
      </Header>
      <Layout >
        <Sider
          width={200}
          style={{
            background: colorBgContainer,
          }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{
              height: '100%',
              borderRight: 0,
            }}
            onClick={({ key }) => {
              setfaculty(key)
            }}
            items={items1}
          />
        </Sider>
        <Layout
          style={{
            padding: '0 24px 24px',
          }}
        >
          <Content
            style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                height: 'calc(100vh - 120px)',overflowY:'scroll',
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
            }}
            >
            {faculty ==1 ?<Faculty form={form} values={values} setCount={setCount} count={count} data={data} setData={setData}/> :"Page Not Available"} </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default Home;