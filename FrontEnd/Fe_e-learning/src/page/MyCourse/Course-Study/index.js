import LinkCmp from "../../../component/LinkCmp";
import classNames from "classnames/bind";
import style from "./CourseStudy.module.scss";
import { Link } from "react-router-dom";
import routeConfig from "../../../config/routeConfig";
const cx = classNames.bind(style);

export default function CourseStudy({ item }) {
  return (
    <div className={cx("wrap-course")}>
      <div className={cx("img")}>
        <img src={item.hinh} />
      </div>
      <div className={cx("info-course")}>
        <h3>{item.tenKh}</h3>
        <div className={cx("describe")}>
          <span> • {item.tongChuong} chương</span>
          <span> • {item.tongBaiGiang} bài giảng</span>
        </div>
      </div>
      <div className={cx("btn")}>
        <Link
          to={routeConfig.learning_Course.replace(":makh", item.maKh)}
          className={cx("btn-css")}
        >
          Học tiếp
        </Link>
      </div>
    </div>
  );
}
