import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import classNames from "classnames/bind";
import style from "./HeadingCourse.module.scss";
const cx = classNames.bind(style);

export default function HeadingCourse({ nameTitle }) {
  return (
    <div className={cx("heading-wrapp")}>
      <div className={cx("wrapp")}>
        <div className={cx("left")}>
          <h2>{nameTitle}</h2>
          <div className={cx("btn")}>Học Ngay</div>
        </div>
      </div>
    </div>
  );
}
