import { Modal, Input, Form, Typography, Row, Col, Button } from "antd";
import classNames from "classnames/bind";
import style from "./WithdrawModal.module.scss";
import numeral from "numeral";
import * as lichSuThanhToan from "../../../services/api/lichSuThanhToan";
import { useState } from "react";
import { useStore } from "../../../store";
import useCustomToast from "../../../hook/useCustomToast";
const cx = classNames.bind(style);
export default function WithdrawModal({
  isModalOpen,
  handleCancel,
  tongLoiNhuan,
}) {
  const { showSuccessToast, showErrorToast } = useCustomToast();
  const [loiNhuanConLai, setLoiNhuanConLai] = useState(tongLoiNhuan);
  const [tongRut, setTongRut] = useState(0);
  const [check, setCheck] = useState(false);

  const { state } = useStore();

  const onchange = (e) => {
    setLoiNhuanConLai(tongLoiNhuan - e.target.value);
    setTongRut(e.target.value);
    if (e.target.value > Number(tongLoiNhuan)) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  };

  const onFinish = async (value) => {
    const formData = new FormData();
    formData.append("donGiaRut", value.donGiaRut);
    var res = await lichSuThanhToan.taoThanhToanGiangVien(
      formData,
      state.tokenGv
    );
    if (res.data.success) {
      showSuccessToast(res.data.message);
      handleCancel();
    } else {
      showErrorToast(res.data.message);
    }
  };

  return (
    <Modal
      title="Rút tiền"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
    >
      <div className={cx("wrap")}>
        <div className={cx("heading")}>
          <div className={cx("text")}>
            <span>Tổng lợi nhuận hiện có</span>
            <span>{numeral(30000).format("0,0")} đ</span>
          </div>
          <div className={cx("text-r")}>
            <span>Lợi nhuận còn lại</span>
            <span>{numeral(loiNhuanConLai).format("0,0")} đ</span>
          </div>

          <div className={cx("text-r")}>
            <span>Tổng tiền rút</span>
            <span>{numeral(tongRut).format("0,0")} đ</span>
          </div>
        </div>
        <Form style={{ marginTop: "30px" }} onFinish={onFinish}>
          <Typography.Title level={5}>Nhập số tiền muốn rút</Typography.Title>
          <Form.Item
            name="donGiaRut"
            validateStatus={check ? "error" : ""}
            help={check ? "Số tiền rút không được vượt quá tổng lợi nhuận" : ""}
          >
            <Input
              onChange={onchange}
              style={{ height: "45px" }}
              className={cx("custom-input")}
            />
          </Form.Item>
          <Form.Item>
            <Row justify="center">
              <Col>
                <Button
                  disabled={tongRut <= 0 || check}
                  // loading={loadingSumbit}
                  type="primary"
                  htmlType="submit"
                  className={cx("btn-submit")}
                >
                  Cập nhật ngân hàng
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}
