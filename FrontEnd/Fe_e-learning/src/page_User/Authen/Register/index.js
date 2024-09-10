import { Button, Col, Form, Input, Row, Typography } from "antd";
import classNames from "classnames/bind";
import style from "./Register.module.scss";
import { ToastContainer } from "react-toastify";
import Logo from "../../../component/Logo";
import useHocVienData from "../../../hook/useHocVienData";

const cx = classNames.bind(style);

export default function Register() {

  const { loadingHv, createHocVien } = useHocVienData();
  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("hoTen", values.hoTen);
    formData.append("email", values.email);
    await createHocVien(values.email, values.password, "VTHV", formData);
  
  };
  return (
    <div className={cx("wrap")}>
      <ToastContainer />
      <div className={cx("container")}>
        <div className={cx("heading")}>
          <Logo />
        </div>

        <div className={cx("content")}>
          <div className={cx("wrap-content")}>
            <div className={cx("header")}>
              <h2>Đăng ký tài khoản học viên </h2>
            </div>
            <Form onFinish={onFinish}>
              <div className={cx("item-input")}>
                <div className={cx("item")}>
                  <Typography.Title level={5}>Tên của bạn</Typography.Title>
                  <Form.Item
                    name="hoTen"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng cung cấp họ tên của bạn!",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Tên của bạn"
                      style={{ height: "50px" }}
                    />
                  </Form.Item>
                </div>

                <div className={cx("item")}>
                  <Typography.Title level={5}>Email</Typography.Title>
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        type: "email",
                        message: "Nhập đúng đinh dạng email!",
                      },
                      {
                        required: true,
                        message: "Vui lòng cung cấp email của bạn!",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Email của bạn"
                      style={{ height: "50px" }}
                    />
                  </Form.Item>
                </div>
              </div>
              <div className={cx("item-input")}>
                <div className={cx("item")}>
                  <Typography.Title level={5}>Mật khẩu</Typography.Title>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng cung cấp mật khẩu của bạn!!",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input.Password
                      placeholder="Mật khẩu của bạn"
                      style={{ height: "50px" }}
                    />
                  </Form.Item>
                </div>

                <div className={cx("item")}>
                  <Typography.Title level={5}>
                    Nhập lại mật khẩu
                  </Typography.Title>
                  <Form.Item
                    name="confirm"
                    dependencies={["password"]}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng xác nhận mật khẩu của bạn!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("Mật khẩu mới bạn nhập không khớp!")
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      placeholder="Nhập lại mật khẩu"
                      style={{ height: "50px" }}
                    />
                  </Form.Item>
                </div>
              </div>
              <Form.Item>
                <Row justify="center">
                  <Col>
                    <Button
                      loading={loadingHv}
                      type="primary"
                      htmlType="submit"
                      className={cx("btn-submit")}
                    >
                      Đăng Ký
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
