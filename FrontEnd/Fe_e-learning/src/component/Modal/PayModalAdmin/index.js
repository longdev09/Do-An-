import { Button, Modal } from "antd";
import classNames from "classnames/bind";
import style from "./PayModalAdmin.module.scss";
import numeral from "numeral";
const cx = classNames.bind(style);
export default function PayModalAdmin({
  isModalOpen,
  handleCancel,
  item,
  donGia,
}) {
  const Qr = `https://img.vietqr.io/image/${item.tenNganHang}-
  ${item.stk}-${"qr_only"}.png?amount=${donGia}`;

  const handleXacNhan = () => {};
  return (
    <Modal
      width={370}
      styles={{
        content: { backgroundColor: "#272a31" },
      }}
      closeIcon={null}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
    >
      <div className={cx("wrap")}>
        <div className={cx("content")}>
          <div className={cx("pay-qr")}>
            <div className={cx("img")}>
              <img src={Qr} />
            </div>
          </div>
          <div className={cx("info")}>
            <div className={cx("item-info")}>
              <span>Số tiền: </span>
              <span>{numeral(donGia).format("0,0")} đ</span>
            </div>

            <div className={cx("item-info")}>
              <span>Stk: </span>
              <span>
                {item.stk} ({item.tenNganHang})
              </span>
            </div>
            <div className={cx("item-info")}>
              <span>Người thụ hưởng: </span>
              <span>{item.nguoiThuHuong}</span>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "20px",
            justifyContent: "center",
          }}
        >
          <Button
            onClick={handleXacNhan}
            type="primary"
            style={{ marginRight: "10px" }}
          >
            Xác nhận thanh toán
          </Button>
          <Button>Từ chối thanh toán</Button>
        </div>
      </div>
    </Modal>
  );
}
