import React, { ReactNode, useState } from "react";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "../../multiLanguage";
import { StyledContainer } from "./style";
import { Avatar } from "antd";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, message, Space } from "antd";
import { logoutApi } from "../../../api/logout";
import { useNavigate } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import Drawer from "../../drawer";

const { Header, Sider, Content } = Layout;

interface PanelLayoutProps {
  children?: ReactNode;
}
const PanelLayout = ({ children }: PanelLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const { t } = useTranslation();

  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();

  const onClick: MenuProps["onClick"] = ({ key }) => {

     if(key=='1'){
      
      navigate("/posts");

    }
  };

  const logutUser = async () => {
    const rftooken = localStorage.getItem("refreshToken");
    const res = await logoutApi({ refresh: rftooken });
    localStorage.clear();
    navigate("/login");
  };


  return (
    <StyledContainer>
      <Layout style={{}}>
        <Sider
          breakpoint={"lg"}
          theme="light"
          collapsedWidth={100}
          style={{ background: "white" }}
          width="300"
          collapsible
          collapsed={collapsed}
          trigger={null}
          className="isShow"
        >
          <div className="demo-logo-vertical" />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
              padding: "0 24px",
            }}
          >
            <div>
              <Menu
                theme="light"
                mode="inline"
                onClick={onClick}
                defaultSelectedKeys={["1"]}
                items={[
            
                  {
                    key: "1",
                    icon: <VideoCameraOutlined />,
                    label: "posts",
                   
                  },
        
                ]}
              />
            </div>
            
          </div>
        </Sider>

        <Layout>
          <Header style={{ background: colorBgContainer }}>
            <div className="header">
              <div className="right-header">
                <Button
                  type="text"
                  className="isShow"
                  icon={
                    collapsed ?<MenuUnfoldOutlined /> : <MenuFoldOutlined /> 
                  }
                  onClick={() => setCollapsed(!collapsed)}
                  style={{
                    fontSize: "16px",
                    width: 64,
                    height: 64,
                  }}
                />
                <Navbar />
                <div className="drawer" style={{ margin: "0 16px" }}>
                  <Drawer />
                </div>
              </div>
              <div>
                <Space>
                  <Avatar size="large" src={userInfo.image} />
                  <span >{userInfo.first_name}</span>
                  <span >{userInfo.last_name}</span>

                  <span className="logout" onClick={logutUser}>Logout</span>
                </Space>
              </div>
            </div>
          </Header>
          <Content
            style={{
              background: colorBgContainer,
              overflowY: "auto",
              height: "85dvh",
              padding: "50px",
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </StyledContainer>
  );
};

export default PanelLayout;
