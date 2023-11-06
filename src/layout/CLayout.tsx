import React, { FC, ReactElement, useState, useEffect, useRef } from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import logo from "../assets/icon.svg";
import "../style/layout.scss";
import { BsCart4 } from "react-icons/bs";
import { IoMdRestaurant } from "react-icons/io";
import {
  Link,
  redirect,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Modal } from "antd";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { closeModals } from "../app/store/actions/layouyActions";
import { Button } from "antd";
import { login, register } from "../app/service/auth";
import { App } from "antd";
import { BiSolidCategory } from "react-icons/bi";
import { PiHamburger, PiHamburgerThin } from "react-icons/pi";
import { logout } from "../app/store/actions/auth";

const { Header, Content, Footer, Sider } = Layout;

interface LayoutProps {
  children: ReactElement;
}

const CLayout: FC<LayoutProps> = ({ children }): ReactElement => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [modal, contextHolder] = Modal.useModal();
  const [modalType, setModalType] = useState(1);
  const [selectedId, setSelectedId] = useState(1);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const run = useRef(false);
  const isAuthenticated = useAppSelector((state: RootState) => {
    return state.auth.jwt.isAuthenticated;
  });

  useEffect(() => {
    // if token does not exist dispatch logout
    // if access token exist try verify
    // if access token is not valid try refresh
    // if refresh does not exist or it is not valid dispatch logout
    // check if is authenticated
    // if is authenticated allow redirect
  }, []);

  useEffect(() => {
    console.log(location.pathname);

    switch (location.pathname) {
      case "/":
        setSelectedId(1);
      case "/profile":
        setSelectedId(1);
      case "/restaurant":
        setSelectedId(2);
      case "/orders":
        setSelectedId(3);
      case "/categories":
        setSelectedId(4);
      case "/products":
        setSelectedId(5);
    }
  }, [location.pathname]);

  const authLabel = () => {
    if (isAuthenticated) {
      return <Link to="/profile">Profile</Link>;
    } else {
      return <Link to={"/login"}>Login</Link>;
    }
  };

  return (
    <App>
      <Layout style={{ minHeight: "100vh" }} className="main-layout">
        {contextHolder}
        <Sider
          className="sider"
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken: any) => {
            // console.log(broken);
          }}
          onCollapse={(collapsed: any, type: any) => {
            console.log(collapsed, type);
          }}
        >
          <div className="sider-logo">
            <Link to={"/"}>
              <img src={logo} />
            </Link>
          </div>
          <div className="text-center avatar">Customer</div>
          <Menu
            theme="dark"
            mode="inline"
            // defaultSelectedKeys={[`${selectedId}`]}
            // selectedKeys={[`${selectedId}`]}
            items={[
              {
                key: "1",
                icon: <UserOutlined />,
                label: authLabel(),
              },
              {
                key: "2",
                icon: <IoMdRestaurant />,
                label: <Link to="/restaurant">Restaurant</Link>,
              },
              {
                key: "3",
                icon: <BsCart4 />,
                label: <Link to="/orders">Orders</Link>,
              },
              {
                key: "4",
                icon: <BiSolidCategory />,
                label: <Link to="/categories">Categories</Link>,
              },
              {
                key: "5",
                icon: <PiHamburger />,
                label: <Link to="/products">Products</Link>,
              },
            ]}
          >
            {/* <Menu.Item></Menu.Item> */}
          </Menu>
        </Sider>
        <Layout>
          {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}
          <Content style={{ margin: "24px 16px 0" }}>
            <div
              style={{
                padding: 24,
                background: colorBgContainer,
                minHeight: "100%",
              }}
            >
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>Food App - Restaurant</Footer>
        </Layout>
      </Layout>
    </App>
  );
};

export default CLayout;
