import {
  DatePicker,
  Form,
  Modal,
  Typography,
  Select,
  Row,
  Col,
  Button,
} from "antd";
import classNames from "classnames/bind";
import numeral from "numeral";
import { useEffect, useState } from "react";
import * as giamGiaApi from "../../../services/api/giamGiaApi";
import { useStore } from "../../../store";
import style from "./Add_Discount_Course.module.scss";
import useGiamGiaData from "../../../hook/useGiamGiaData";
const cx = classNames.bind(style);
const { RangePicker } = DatePicker;
export default function AddDiscountCourse({ isModalOpen, handleCancel, item }) {
  const { state } = useStore();

  const [dsGiamGia, setDsGiamGia] = useState([]);
  const getDsGiamGia = async () => {
    try {
      const res = await giamGiaApi.getGiamGia(state.tokenGv);
      setDsGiamGia(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDsGiamGia();
  }, []);

  const [tienGiam, setTienGiam] = useState(0);
  const [tongTien, setTongTien] = useState(item.gia);

  const { loadingGg, createChiTietGiamGia } = useGiamGiaData();
  const onFinish = async (values) => {
    console.log(values.ngay[0].$d.toISOString());
    const formData = new FormData();
    formData.append("maGg", values.maGg);
    formData.append("maKh", item.maKh);
    formData.append("ngayBatDau", values.ngay[0].$d.toISOString());
    formData.append("ngayKetThuc", values.ngay[1].$d.toISOString());
    await createChiTietGiamGia(tongTien, formData);
    handleCancel();
  };

  const handle = (value) => {
    const phanTramGiam = dsGiamGia.find((i) => i.maGg === value);
    setTienGiam((phanTramGiam.phanTramGiam * item.gia) / 100);
    setTongTien(item.gia - (phanTramGiam.phanTramGiam * item.gia) / 100);
  };
  return (
    <Modal
      title="Áp dụng giảm giá cho khóa học"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
    >
      <div className={cx("wrap")}>
        <div className={cx("heading")}>
          <h2>{item.tenKh}</h2>
        </div>
        <div className={cx("content")}>
          <div className={cx("price")}>
            <div className={cx("price-origin")}>
              <span>Giá gốc</span>
              <span>{numeral(item.gia).format("0,0")} đ</span>
            </div>

            <div className={cx("price-sale")}>
              <span>Mã giảm giá áp dụng</span>
              <span style={{ color: "red" }}>
                - {numeral(tienGiam).format("0,0")} đ
              </span>
            </div>

            <div className={cx("price-sum")}>
              <span>Tổng tiền</span>
              <span>{numeral(tongTien).format("0,0")} đ</span>
            </div>
          </div>
          <Form
            onFinish={onFinish}
            style={{ marginTop: "20px", width: "100%" }}
          >
            <Typography.Title level={5}>
              Chọn ngày bắt đầu và kết thúc
            </Typography.Title>
            <Form.Item
              name="ngay"
              rules={[
                {
                  required: true,
                  message: "Vui lòng không bỏ trống!",
                },
              ]}
            >
              <RangePicker
                style={{ height: "40px", width: "100%" }}
                format="DD/MM/YYYY"
              />
            </Form.Item>

            <Typography.Title level={5}>Chọn mã giảm giá</Typography.Title>
            <Form.Item
              name="maGg"
              rules={[
                { required: true, message: "Vui lòng chọn mã giảm giá !" },
              ]}
            >
              <Select
                onChange={(value) => handle(value)}
                className={cx("custom-select")}
                showSearch
                placeholder="Chọn mã giảm giá"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={
                  dsGiamGia &&
                  dsGiamGia.map((item) => ({
                    value: item.maGg,
                    label: item.maGg + " " + item.ghiChu,
                  }))
                }
              />
            </Form.Item>
            <Form.Item>
              <Row justify="center">
                <Col>
                  <Button
                    loading={loadingGg}
                    type="primary"
                    htmlType="submit"
                    className={cx("btn-submit")}
                  >
                    Áp dụng
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Modal>
  );
}
