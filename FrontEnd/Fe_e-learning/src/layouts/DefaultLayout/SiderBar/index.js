import { FaBook } from "react-icons/fa";
import { FaRankingStar } from "react-icons/fa6";

import classNames from "classnames/bind";
import styles from "./SiderBar.module.scss";
const cx = classNames.bind(styles);

export default function SiderBar() {
  return (
    <div className={cx("nav-bar")}>
      <div className={cx("sidebar-wrapper")}>
        <ul>
          <li>
            <a className={cx("item-sidebar", "active")}>
              <FaBook />
              <span>Khóa học</span>
            </a>
          </li>
          <li>
            <a className={cx("item-sidebar")}>
              <FaRankingStar />
              <span>Khóa học</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
