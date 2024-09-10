import { DingdingOutlined } from "@ant-design/icons";

import classNames from "classnames/bind";
import style from "./Logo.module.scss";
const cx = classNames.bind(style);

export default function Logo() {
  return (
    <div className={cx("logo-wrap")}>
      <div className={cx("logo")}>
        <DingdingOutlined />
      </div>
    </div>
  );
}
