import { faBell, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Button from "../../../component/CustomButton";
import routeConfig from "../../../config/routeConfig";
import { useStore } from "../../../store";
import styles from "./Header.module.scss";
import * as gioHangApi from "../../../services/api/gioHangApi";
import * as hocVienApi from "../../../services/api/hocVienApi";

import { useEffect, useState } from "react";
import Logo from "../../../component/Logo";

const cx = classNames.bind(styles);

export default function Header() {
  const { state, dispatch } = useStore();
  const [hv, setHv] = useState();
  const getHv = async () => {
    const res = await hocVienApi.getHocVien(state.tokenHv);
    if (res != null) {
      setHv(res.data.data);
    }
  };
  useEffect(() => {
    getHv();
  }, []);

  const handleLogOut = () => {
    console.log("ss");
    dispatch({ type: "LOGOUT_USER" });
  };

  return (
    <div className={cx("header")}>
      <div className={cx("logo")}>
        <Link to={"/"} style={{ cursor: "pointer" }} className={cx("nav-logo")}>
          <Logo />
        </Link>
      </div>
      <div className={cx("search")}>
        <div className={cx("item-search")}>
          <input
            type="text"
            className={cx("search-input")}
            placeholder="Tìm nội dung bất kỳ...."
          />
          <div className={cx("btn-search")}>
            <button>
              <IoSearchOutline />
            </button>
          </div>
        </div>
      </div>

      <>
        {state.tokenHv ? (
          <div className={cx("nav-menu")}>
            <Link to={routeConfig.detail_cart} className={cx("nav-item")}>
              <div className={cx("item-cart")}>
                <FontAwesomeIcon icon={faCartShopping} />
              </div>
              <div className={cx("count-cart")}>{state.cart.length}</div>
            </Link>
            <div className={cx("nav-item")}>
              <div className={cx("item-bell")}>
                <FontAwesomeIcon icon={faBell} />
              </div>
            </div>

            <div className={cx("nav-item")}>
              <div className={cx("item-avata")}>
                <img src="https://fullstack.edu.vn/static/media/fallback-avatar.155cdb2376c5d99ea151.jpg" />
                {/* menu tai khoan  */}
                <ul className={cx("nav-user")}>
                  <li className={cx("item-heading")}>
                    <div className={cx("logo-img")}>
                      <img src="https://fullstack.edu.vn/static/media/fallback-avatar.155cdb2376c5d99ea151.jpg" />
                    </div>
                    <span>{hv && hv.hoTen}</span>
                  </li>

                  <li className={cx("item-function")}>
                    <Link to={routeConfig.myCourse}>Khóa học của tôi</Link>
                  </li>
                  <li className={cx("item-function")}>
                    <Link to={routeConfig.detail_Bill}>Lịch sử mua</Link>
                  </li>

                  <li className={cx("item-function")}>
                    <Link to={routeConfig.edit_profile}>Cài đặt</Link>
                  </li>
                  <li className={cx("item-function")}>
                    <div onClick={handleLogOut}>Đăng xuất</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className={cx("nav-sig")}>
            <div className={cx("sig")}>
              <Link to={routeConfig.user_Login} className={cx("link_acc")}>
                Đăng nhập
              </Link>
              <Link to={routeConfig.user_Register} className={cx("link_acc")}>
                Đăng ký
              </Link>
            </div>
          </div>
        )}
      </>
    </div>
  );
}
