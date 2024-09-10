import { Flex } from "antd";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import style from "./LinkCmp.module.scss";
const cx = classNames.bind(style);
export default function LinkCmp({ children }) {
  return <Link className={cx("wrapp")}>{children}</Link>;
}
