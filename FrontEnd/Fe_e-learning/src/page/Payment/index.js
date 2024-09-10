import { Button } from "antd";
import classNames from "classnames/bind";
import numeral from "numeral";
import { useMemo, useState } from "react";
import PayModal from "../../component/Modal/PayModal";
import { useStore } from "../../store";
import style from "./Payment.module.scss";
import CustomButton from "../../component/CustomButton";
const cx = classNames.bind(style);

export default function Payment() {
  const { state } = useStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const modalComponent = useMemo(() => {
    return isModalOpen ? (
      <PayModal
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        item={state.khoaHocSelect && state.khoaHocSelect}
      />
    ) : null;
  }, [isModalOpen]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("left")}>
          <h2>Thanh toán</h2>
          <div className={cx("methods")}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input type="radio" checked />
              <img src="https://i.gyazo.com/4914b35ab9381a3b5a1e7e998ee9550c.png" />
            </div>
            <span>Thanh toán bằng vnpay</span>
          </div>

          <div className={cx("info-bill")}>
            <h2>Thông tin đặt hàng</h2>
            <div className={cx("list-item")}>
              {state.khoaHocSelect &&
                state.khoaHocSelect.map((item) => (
                  <div className={cx("item")}>
                    <div className={cx("img")}>
                      <img src={item.hinh} />
                      <span>{item.tenKh}</span>
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
          </div>
        </div>
        <div className={cx("right")}>
          <div className={cx("bill")}>
            <h2>Tổng tiền</h2>
            <div className={cx("price-origin")}>
              <span>Giá gốc : </span>
              <span>
                {state.khoaHocSelect &&
                  state.khoaHocSelect.reduce((acc, item) => acc + item.gia, 0)}
                ₫
              </span>
            </div>
            <div className={cx("price")}>
              <span>Tổng : </span>
              <span>
                {numeral(
                  state.khoaHocSelect &&
                    state.khoaHocSelect.reduce((acc, item) => acc + item.gia, 0)
                ).format("0,0")}
                ₫
              </span>
            </div>
            <p>
              Bằng việc hoàn tất giao dịch mua, bạn đồng ý với
              <i style={{ color: "red" }}> Điều khoản dịch vụ</i> này.
            </p>
            <div style={{ width: "100%", marginTop: "20px" }}>
              <CustomButton w100 onClick={showModal} style={{ width: "100%" }}>
                Hoàn tất thanh toán
              </CustomButton>
            </div>
          </div>
        </div>
      </div>

      {modalComponent}
    </div>
  );
}
