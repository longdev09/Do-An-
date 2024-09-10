import { Button, Checkbox } from "antd";
import classNames from "classnames/bind";
import numeral from "numeral";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LinkCmp from "../../component/LinkCmp";
import routeConfig from "../../config/routeConfig";
import * as gioHangApi from "../../services/api/gioHangApi";
import { useStore } from "../../store";
import style from "./DetailCart.module.scss";
const cx = classNames.bind(style);

export default function DetailCart() {
  let navigate = useNavigate();
  const { state, dispatch } = useStore();
  // call api
  const [dsGioHang, setDsGioHang] = useState(state.cart);
  const [dsKhoaHocMua, setDsKhoaHocMua] = useState([]);

  // lay chi tiet gio hang
  // const getGioHangHv = async () => {
  //   try {
  //     setLoadingGh(true);
  //     const res = await gioHangApi.getGioHangHocVien(state.tokenHv);
  //     setLoadingGh(false);
  //     setDsGioHang(res.data);
  //   } catch (error) {
  //     console.log("Error fetching  ", error);
  //   }
  // };

  // xoa khoa hoc trong gio hang

  const handleDeleteXoaKhoaHoc = async (maKh) => {
    await gioHangApi.deleteGioHang(maKh, state.tokenHv);
    dispatch({ type: "DELETE_TO_CART", payload: maKh });

    // console.log(maKh);
    // const updatedCartRemove = dsGioHang.filter((item) => item.maKh !== maKh);

    // console.log(updatedCartRemove);
    // getGioHangHv();
  };

  // console.log(state.cart);
  useEffect(() => {
    setDsGioHang(state.cart);
  }, [state.cart]);

  const handleThanhToan = () => {
    dispatch({ type: "KHOA_HOC_SELECT", payload: dsKhoaHocMua });
    navigate(routeConfig.payMent);
  };

  // check box chon khoa hoc

  const handleCheckboxChange = (e, item) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setDsKhoaHocMua([...dsKhoaHocMua, item]);
    } else {
      setDsKhoaHocMua(dsKhoaHocMua.filter((id) => id.maKh !== item.maKh));
    }
  };

  // gio hang null
  if (dsGioHang && dsGioHang.length <= 0) {
    return (
      <div className={cx("wrapper")}>
        <div className={cx("heading")}>
          <h1>Giỏ hàng</h1>
          <span>{dsGioHang && dsGioHang.length} khóa học trong giỏ hàng</span>
        </div>

        <div className={cx("emty-cart")}>
          <img
            alt="Lỗi ảnh"
            src="https://firebasestorage.googleapis.com/v0/b/app-e-learning-3f826.appspot.com/o/he_thong%2Fimg-cart-null%2Fundraw_Add_notes_re_ln36%20(1).png?alt=media&token=53dc8d6b-6f46-4d96-be55-499b9d5baa33"
          />
          <p>
            Giỏ hàng của bạn đang trống. Hãy tiếp tục mua sắm để tìm một khóa
            học !
          </p>
          <LinkCmp>Tiếp tục mua sắm</LinkCmp>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={cx("wrapper")}>
        <ToastContainer />
        <>
          <div className={cx("heading")}>
            <h1>Giỏ hàng</h1>
            <span>{dsGioHang && dsGioHang.length} khóa học trong giỏ hàng</span>
          </div>

          <div className={cx("content")}>
            <div className={cx("list-item")}>
              {dsGioHang &&
                dsGioHang.map((item, index) => (
                  <div className={cx("item")} key={index}>
                    <div className={cx("check")}>
                      {/* {console.log(dsKhoaHocMua.includes(item.maKh))} */}
                      <Checkbox
                        onChange={(e) => handleCheckboxChange(e, item)}
                        // checked={state.khoaHocSelect[index].includes(item.maKh)}
                      ></Checkbox>
                    </div>
                    <div className={cx("info-course")}>
                      <div className={cx("img")}>
                        <img src={item.hinh} />
                      </div>
                      <div className={cx("wrap-course")}>
                        <div className={cx("name-course")}>
                          <h4>{item.tenKh}</h4>
                        </div>
                        <div className={cx("name-mentor")}>{item.tenGv}</div>
                        <div className={cx("describe")}>
                          <span>{item.tongChuong} chương</span>
                          <span>• {item.tongBaiGiang} bài giảng</span>
                        </div>
                      </div>
                    </div>
                    <div className={cx("wrap-fuc")}>
                      <div className={cx("btn")}>
                        <span onClick={() => handleDeleteXoaKhoaHoc(item.maKh)}>
                          Xóa
                        </span>
                      </div>
                    </div>
                    <div className={cx("price-course")}>
                      {item.gia == item.giaGiam ? (
                        <span> {numeral(item.gia).format("0,0")} đ</span>
                      ) : (
                        <>
                          <span> {numeral(item.gia).format("0,0")} đ</span>

                          <span> {numeral(item.giaGiam).format("0,0")} đ</span>
                        </>
                      )}
                    </div>
                  </div>
                ))}
            </div>

            <div className={cx("price")}>
              <h3>Tổng tiền: </h3>
              <div className={cx("sum-price")}>
                <span>
                  {numeral(
                    dsKhoaHocMua.reduce((acc, item) => acc + item.gia, 0)
                  ).format("0,0")}{" "}
                  đ
                </span>
              </div>
              <div className={cx("btn-thanh-toan")}>
                <Button
                  disabled={
                    dsKhoaHocMua && dsKhoaHocMua.length > 0 ? false : true
                  }
                  className={cx("custom-btn")}
                  type={"primary"}
                  onClick={handleThanhToan}
                >
                  Thanh toán
                </Button>
              </div>
            </div>
          </div>
        </>
      </div>
    </>
  );
}
