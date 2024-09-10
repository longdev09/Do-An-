import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Modal } from "antd";
import axios from "axios";
import classNames from "classnames/bind";
import numeral from "numeral";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as hoaDonApi from "../../../services/api/hoaDonApi";
import { useStore } from "../../../store";
import style from "./PayModal.module.scss";
import routeConfig from "../../../config/routeConfig";
const cx = classNames.bind(style);

export default function PayModal({ isModalOpen, handleCancel, item }) {
  const [timeLeft, setTimeLeft] = useState(5 * 60); // 5 minutes in seconds
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const [ndGD] = useState(generateRandomCode(5));
  const [stopPolling, setStopPolling] = useState(false);

  // checkThanh toan thanh cong
  const [checkPaySuccess, setCheckPaySuccess] = useState(false);

  let tongTien = item.reduce((acc, item) => acc + item.gia, 0);
  const navigate = useNavigate();
  const { state } = useStore();

  const createHoaDon = async () => {
    const formData = new FormData();
    formData.append("tongTien", tongTien);
    item.forEach((item, index) => {
      formData.append(`ChiTietHoaDon[${index}].donGia`, item.gia);
      formData.append(`ChiTietHoaDon[${index}].maKh`, item.maKh);
    });
    await hoaDonApi.createHoaDon(formData, state.tokenHv);
  };

  const myBank = {
    BANK_ID: "970422",
    ACCOUNT_NO: "0001687898828",
    TEMPLATE: "qr_only",
  };

  const Qr = `https://img.vietqr.io/image/${myBank.BANK_ID}-${myBank.ACCOUNT_NO}-${myBank.TEMPLATE}.png?amount=${tongTien}&addInfo=${ndGD}`;

  function generateRandomCode(length) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "TT";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const API_KEY =
    "AK_CS.aebb60d012de11ef8bed6bbca93dfee0.Ibft7miifwWAgcjRQEkim9VDDZqoRUycx1mcd1mWlKFMbBsI2t9Kveo7VTvFUhYVT9cK7ojN";
  const API_GET = `https://oauth.casso.vn/v2/transactions?pageSize=50`;

  const checkPaid = async () => {
    try {
      const response = await axios.get(API_GET, {
        headers: {
          Authorization: `apikey ${API_KEY}`,
          "Content-Type": "application/json",
        },
      });
      console.log(response.data.data.records);
      const latestTransaction =
        response.data.data.records[response.data.data.records.length - 1];
      if (
        latestTransaction.amount === tongTien &&
        latestTransaction.description.includes(ndGD)
      ) {
        setStopPolling(true);
        // alert("Thanh toán thành công");
        await createHoaDon();
        localStorage.removeItem("khoaHocSelect");
        setCheckPaySuccess(true);
        // handleCancel(); // Đóng modal sau khi thanh toán thành công
        // navigate("/"); // Điều hướng đến trang chính
      }
    } catch (error) {
      console.error("Error checking paid status:", error);
    }
  };

  useEffect(() => {
    let interval;
    if (!stopPolling) {
      interval = setInterval(checkPaid, 2000);
    }
    return () => clearInterval(interval);
  }, [stopPolling]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setStopPolling(true);
      handleCancel(); // Đóng modal khi hết thời gian
    }
  }, [timeLeft]);

  // time chuyen huong sang khi thanh toan thanh cong
  useEffect(() => {
    if (checkPaySuccess) {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(timer);
            // Thực hiện chuyển hướng sau khi đếm ngược kết thúc
            navigate(routeConfig.myCourse);
          }
          return prevCountdown - 1;
        });
        return () => clearInterval(timer); // Dọn dẹp timer khi component bị hủy
      }, 1000);
    }
  }, [checkPaySuccess]);

  const [countdown, setCountdown] = useState(3);

  if (checkPaySuccess) {
    return (
      <Modal
        width={370}
        open={isModalOpen}
        footer={null}
        closeIcon={null}
        onCancel={handleCancel}
        styles={{
          content: { backgroundColor: "#272a31" },
        }}
      >
        <div className={cx("pay-success")}>
          <div className={cx("wrap-icon")}>
            <div className={cx("icon")}>
              <FontAwesomeIcon icon={faCheck} />
            </div>
          </div>

          <span>Thanh toán thành công</span>

          <div className={cx("direction")}>
            Chuyển hướng sau {countdown} giây
          </div>
        </div>
      </Modal>
    );
  }

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
            <div className={cx("text")}>
              <span>Mã QR thanh toán tự động</span>
              <span>(Xác nhận tự động - Thường không quá 3')</span>
            </div>
          </div>
          <div className={cx("info")}>
            <div className={cx("item-info")}>
              <span>Số tiền: </span>
              <span>{numeral(tongTien).format("0,0")} đ</span>
            </div>
            <div className={cx("item-info")}>
              <span>Nội dụng (bắt buộc): </span>
              <b style={{ color: "#009dff" }}>{ndGD}</b>
            </div>
            <div className={cx("item-info")}>
              <span>Stk: </span>
              <span>{myBank.ACCOUNT_NO} (MB BANK)</span>
            </div>
            <div className={cx("item-info")}>
              <span>Người thụ hưởng: </span>
              <span>NGUYỄN BẠCH LONG</span>
            </div>
          </div>
          <div className={cx("loading")}>
            <div className={cx("text-loading")}>
              <span>Chờ thanh toán</span>
              <span>
                {minutes.toString().padStart(2, "0")}:
                {seconds.toString().padStart(2, "0")}
              </span>
            </div>
            <div className={cx("line-loading")}></div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
