import {
  Form,
  Input,
  InputNumber,
  Modal,
  Typography,
  Row,
  Col,
  Button,
} from "antd";
import classNames from "classnames/bind";
import style from "./Add_Discount.module.scss";
import giamGiaData from "../../../hook/useGiamGiaData";
const cx = classNames.bind(style);

export default function AddDiscount({ isModalOpen, handleCancel }) {
  const { createGiamGia, loadingGg } = giamGiaData();
  const handleSumbit = async (values) => {
    const formData = new FormData();
    formData.append("phanTramGiam", values.phanTramGiam);
    formData.append("ghiChu", values.ghiChu);
    await createGiamGia(formData);
    handleCancel();
  };
  return (
    <Modal
      title="Tạo mã giảm giá"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
    >
      <div className={cx("wrap")}>
        <Form onFinish={handleSumbit} className={cx("custom-form")}>
          <div className={cx("input-wrap")}>
            <div className={cx("input-item")}>
              <Typography.Title level={5}>Phần trăm giảm</Typography.Title>
              <Form.Item name="phanTramGiam">
                <InputNumber
                  min={1}
                  max={99}
                  style={{ width: "222px", lineHeight: "50px" }}
                />
              </Form.Item>
            </div>
            <div className={cx("input-item")}>
              <Typography.Title level={5}>Ghi chú</Typography.Title>
              <Form.Item
                name="ghiChu"
                rules={[
                  { required: true, message: "Vui lòng không bỏ trống !" },
                ]}
              >
                <Input
                  showCount
                  maxLength={60}
                  className={cx("custom-input")}
                />
              </Form.Item>
            </div>
          </div>

          <Form.Item>
            <Row justify="center">
              <Col>
                <Button
                  loading={loadingGg}
                  type="primary"
                  htmlType="submit"
                  className={cx("btn-submit")}
                >
                  Tạo giảm giá
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}
