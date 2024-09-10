import { Button, Checkbox, Form, Input } from "antd";

import useChuongKhoaHocData from "../../../hook/useChuongData";
import classNames from "classnames/bind";
import style from "./UpdateChuong.module.scss";
const cx = classNames.bind(style);

export default function UpdateChuong({
  item,
  show,
  handleShow,
  onUpdateTenChuong,
}) {
  const { updateChuong, loadingCh } = useChuongKhoaHocData();

  const onFinish = async (values) => {
    const formsData = new FormData();
    formsData.append("tenChuong", values.tenChuong);
    formsData.append("maCh", item.maCh);
    await updateChuong(formsData);
    onUpdateTenChuong(values.tenChuong);
    handleShow();
  };
  return (
    <Form
      onFinish={onFinish}
      className={cx("update-chapter")}
      style={{ display: show ? "none" : "block" }}
    >
      <div className={cx("wrap-update")}>
        <div className={cx("name-chapter")}>Chương {item.stt}:</div>
        <div className={cx("content-update-chapter")}>
          <div>
            <Form.Item
              name="tenChuong"
              rules={[{ required: true, message: "Vui lòng không bỏ trống !" }]}
            >
              <Input
                showCount
                maxLength={70}
                style={{ height: "48px" }}
                defaultValue={item.tenChuong}
                // onChange={handleChange}
              />
            </Form.Item>
          </div>

          <div className={cx("btn")}>
            <Form.Item>
              <Button style={{ marginRight: "10px" }} onClick={handleShow}>
                Hủy
              </Button>
              <Button type="primary" htmlType="submit" loading={loadingCh}>
                Cập nhật
              </Button>
            </Form.Item>
          </div>
        </div>
      </div>
    </Form>
  );
}
