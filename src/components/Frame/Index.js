import React from 'react'
import { Layout, Menu, Dropdown, Avatar, Badge } from 'antd';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { clearToken } from "../../utils/auth";
import { adminRoutes } from "../../routes";
import "./frame.css"

const { Header, Content, Sider } = Layout;
const routes = adminRoutes.filter(route => route.isShow);

function Index(props) {
  const popMenu = (
    <Menu onClick={(p) => {
      if (p.key === 'logOut') {
        props.history.push('/login');
        clearToken();
      }
      if (p.key === 'notice') {
        props.history.push('/admin/notice');
      }
    }}>
      <Menu.Item key="notice">通知中心</Menu.Item>
      <Menu.Item key="setting">设置</Menu.Item>
      <Menu.Item key="logOut">退出</Menu.Item>
    </Menu>)

  return (
    <Layout>
      <Header className="header">
        <div className="logo" >
          <h1 style={{ color: "white" }}>项目管理系统 总任务数{props.product.total}</h1>
        </div>
        <Dropdown overlay={popMenu}>
          <div>
            <Avatar>U</Avatar>
            <Badge dot={!props.notice.isAllRead}>
              <span style={{ color: "white" }}>超级管理员</span>
            </Badge>
          </div>
        </Dropdown>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}>
            {routes.map(route => {
              return (<Menu.Item key={route.path} onClick={p => props.history.push(p.key)}>{route.title}</Menu.Item>)
            })}
          </Menu>
        </Sider>
        <Layout style={{padding: '16px'}}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}>
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(withRouter(Index));
