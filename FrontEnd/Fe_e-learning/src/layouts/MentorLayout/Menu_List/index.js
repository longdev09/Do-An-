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

const cx = classNames.bind(style);

export default function MenuList() {
  const location = useLocation();

  // Lấy phần path từ location
  const currentPath = location.pathname;

  // Xác định key của menu item dựa trên path hiện tại
  let selectedKey = "1"; // key mặc định
  if (currentPath === routerConfig.mentor_Dashboard) {
    selectedKey = "1";
  } else if (currentPath === routerConfig.mentor_Profile) {
    selectedKey = "2";
  } else if (
    currentPath === routerConfig.mentor_Course ||
    currentPath === routerConfig.mentor_Course_Create_Update
  ) {
    selectedKey = "3";
  } else if (currentPath === routerConfig.mentor_Discount) {
    selectedKey = "4";
  } else if (currentPath === routerConfig.mentor_Message) {
    selectedKey = "5";
  } else if (currentPath === routerConfig.mentor_MetorEvalute) {
    selectedKey = "6";
  } else if (currentPath === routerConfig.mentor_MetorBill) {
    selectedKey = "7";
  } else if (currentPath === routerConfig.mentor_Pay) {
    selectedKey = "8";
  }

  return (
    <Menu
      defaultSelectedKeys={[selectedKey]}
      theme="dark"
      mode="inline"
      className={cx("menu-nav")}
    >
      <Menu.Item key="1" icon={<AppstoreOutlined />}>
        <NavLink to={routerConfig.mentor_Dashboard}>Dashboard</NavLink>
      </Menu.Item>
      <Menu.Item key="2" icon={<UserOutlined />}>
        <NavLink to={routerConfig.mentor_Profile}>Thông tin của tôi</NavLink>
      </Menu.Item>
      <Menu.Item key="3" icon={<PlaySquareOutlined />}>
        <NavLink to={routerConfig.mentor_Course}>Quản lý khóa học</NavLink>
      </Menu.Item>
      <Menu.Item key="4" icon={<TransactionOutlined />}>
        <NavLink to={routerConfig.mentor_Discount}>Giảm giá</NavLink>
      </Menu.Item>
      <Menu.Item key="5" icon={<WechatOutlined />}>
        <NavLink to={routerConfig.mentor_Message}>Tin nhắn</NavLink>
      </Menu.Item>
      <Menu.Item key="6" icon={<MutedOutlined />}>
        <NavLink to={routerConfig.mentor_MetorEvalute}>
          Đánh giá khóa học
        </NavLink>
      </Menu.Item>
      <Menu.Item key="7" icon={<ExceptionOutlined />}>
        <NavLink to={routerConfig.mentor_MetorBill}>Đơn mua khóa học</NavLink>
      </Menu.Item>
      <Menu.Item key="8" icon={<DollarOutlined />}>
        <NavLink to={routerConfig.mentor_Pay}>Thanh toán</NavLink>
      </Menu.Item>
    </Menu>
  );
}
