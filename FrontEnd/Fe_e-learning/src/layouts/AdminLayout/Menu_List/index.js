import { Menu } from "antd";
import {
  MutedOutlined,
  UserOutlined,
  AppstoreOutlined,
  PlaySquareOutlined,
  WechatOutlined,
  ExceptionOutlined,
  DollarOutlined,
  TransactionOutlined,
} from "@ant-design/icons";
import classNames from "classnames/bind";
import style from "./Menu_List.module.scss";
import { NavLink } from "react-router-dom";
import routerConfig from "../../../config/routeConfig";
import { useLocation } from "react-router-dom";
import SubMenu from "antd/es/menu/SubMenu";
import MenuItem from "antd/es/menu/MenuItem";

const cx = classNames.bind(style);

export default function MenuList() {
  const location = useLocation();

  // Lấy phần path từ location
  const currentPath = location.pathname;

  // Xác định key của menu item dựa trên path hiện tại
  let selectedKey = "1"; // key mặc định
  if (currentPath === routerConfig.admin_Dashboard) {
    selectedKey = "1";
  } else if (currentPath === routerConfig.admin_Courses) {
    selectedKey = "2";
  } else if (currentPath === routerConfig.admin_Account_Mentor) {
    selectedKey = "3-1";
  } else if (currentPath === routerConfig.admin_Bill) {
    selectedKey = "4";
  } else if (currentPath === routerConfig.admin_Pay) {
    selectedKey = "5";
  }

  return (
    <Menu
      defaultSelectedKeys={[selectedKey]}
      theme="dark"
      mode="inline"
      className={cx("menu-nav")}
    >
      <Menu.Item key="1" icon={<AppstoreOutlined />}>
        <NavLink to={routerConfig.admin_Dashboard}>Dashboard</NavLink>
      </Menu.Item>
      <Menu.Item key="2" icon={<AppstoreOutlined />}>
        <NavLink to={routerConfig.admin_Courses}>Khóa Học</NavLink>
      </Menu.Item>
      <SubMenu key="3" icon={<AppstoreOutlined />} title="Người Dùng">
        <Menu.Item key="3-1">
          <NavLink to={routerConfig.admin_Account_Mentor}>
            Tài Khoản Giảng Viên
          </NavLink>
        </Menu.Item>
        {/* <Menu.Item key="3-2">
          <NavLink to={routerConfig.admin_Account_Mentor}>
            Tài Khoản Học Viên
          </NavLink>
        </Menu.Item> */}
      </SubMenu>
      <Menu.Item key="4" icon={<AppstoreOutlined />}>
        <NavLink to={routerConfig.admin_Bill}>Hóa Đơn</NavLink>
      </Menu.Item>
      <Menu.Item key="5" icon={<AppstoreOutlined />}>
        <NavLink to={routerConfig.admin_Pay}>Thanh toán</NavLink>
      </Menu.Item>
    </Menu>
  );
}
