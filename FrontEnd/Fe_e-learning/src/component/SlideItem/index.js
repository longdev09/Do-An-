import img1 from "../../assets/Remove-bg.ai_1709476846286.png";

import classNames from "classnames/bind";
import style from "./SlideItem.module.scss";
const cx = classNames.bind(style);

export default function SlideItem() {
  return (
    <div className={cx("slide-main")}>
      <div className={cx("slide-wrap")}>
        <div className={cx("slide-left")}>
          <h2>Thành Qua Khi Học Xong Các Khoa Học</h2>
          <p>
            Thực hành dự án với Figma, hàng trăm bài tập và thử thách, hướng dẫn
            100% bởi Sơn Đặng, tặng kèm Flashcards, v.v.
          </p>
          <button>Đăng Ký Ngay</button>
        </div>
        <div className={cx("slide-right")}>
          <a>
            <img src="https://files.fullstack.edu.vn/f8-prod/banners/36/6454dee96205c.png" />
          </a>
        </div>
      </div>
    </div>
  );
}
