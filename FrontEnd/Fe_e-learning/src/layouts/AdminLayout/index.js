import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

import MenuList from "./Menu_List";
import { Button, Layout } from "antd";
import { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import Logo from "../../component/Logo";

//

import classNames from "classnames/bind";
import styles from "./AdminLayout.module.scss";
const cx = classNames.bind(styles);
const { Header, Sider, Content } = Layout;

export default function AdminLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout>
      <Sider
        collapsed={collapsed}
        collapsible
        trigger={null}
        className={cx("sidebar")}
        width={"13%"}
      >
        <Logo />
        <MenuList />
      </Sider>
      <Layout>
        <Header className={cx("header")} style={{ padding: "0px 20px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button type="text" onClick={toggleCollapsed}>
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <span>Trang Admin</span>
              <span>
                <FontAwesomeIcon icon={faBell} />
              </span>
            </div>
          </div>
        </Header>
        <Content className={cx("content")}>{children}</Content>
      </Layout>
    </Layout>
  );
}
