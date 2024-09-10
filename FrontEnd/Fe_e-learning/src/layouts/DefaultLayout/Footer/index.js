import classNames from "classnames/bind";
import style from "./Footer.module.scss";
import Logo from "../../../component/Logo";
const cx = classNames.bind(style);

export default function Footer() {
  return (
    <div className={cx("footer-wrapp")}>
      <div className={cx("main")}>
        <div className={cx("main-content")}>
          <div className={cx("wrapp-text")}>
            <div className={cx("logo")}>
              <Logo />
            </div>
            <p>
              Điện thoại :<a>0366734760</a>
              <br />
              Email :<a>longbachnguyen09dev@gmail.com</a>
              <br />
              Số 11D, lô A10, khu đô thị Nam Trung Yên, Phường Yên Hòa, Quận Cầu
              Giấy, TP. Hà Nội
            </p>
          </div>

          <div className={cx("wrapp-text")}>
            <h2>Giới Thiệu</h2>
            <ul>
              <li>Về e-learning</li>
              <li>Về giảng viên</li>
              <li>Bảo mật</li>
              <li>Điều khoản và sử dụng</li>
            </ul>
          </div>
          <div className={cx("wrapp-text")}>
            <h2>Chương Trình</h2>
            <ul>
              <li>Chương trình</li>
              <li>
                <a href="">Môn học chuyển đổi</a>
              </li>
              <li>
                <a href="/query/?Free_Course">Khóa học miễn phí</a>
              </li>
              <li>
                <a href=""> Thạc Sĩ</a>
              </li>
              <li>
                <a href=""> Cử Nhân</a>
              </li>
              <li>
                <a href="">Chuyên Gia Quốc Tế</a>
              </li>
            </ul>
          </div>
          <div className={cx("wrapp-text")}>
            <h2>Giới Thiệu</h2>
            <ul>
              <li>Về e-learning</li>
              <li>Về giảng viên</li>
              <li>Bảo mật</li>
              <li>Điều khoản và sử dụng</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
