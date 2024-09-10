import CustomButton from "../CustomButton";

import classNames from "classnames/bind";
import style from "./Category.module.scss";
import { Button } from "antd";
import { Link } from "react-router-dom";
import routes from "../../config/routeConfig";
const cx = classNames.bind(style);

export default function Category({ nameDm, maDm }) {
  return (
    <div className={cx("wrap")}>
      <div className={cx("box-wrap")}>
        <div className={cx("icon")}>
          <img src="https://themeholy.com/wordpress/edura/wp-content/uploads/2023/07/cat-1_4.svg" />
        </div>
        <h3>{nameDm}</h3>
        <div style={{ marginTop: "15px" }}>
          <Link
            to={routes.list_course_danh_muc.replace(":maDm", maDm)}
            className={cx("link-add")}
          >
            Xem thêm
          </Link>
        </div>
      </div>
    </div>
  );
}
