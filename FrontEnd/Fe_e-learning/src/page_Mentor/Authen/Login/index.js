import { Button, Col, Form, Input, Row, Typography } from "antd";
import classNames from "classnames/bind";
import { Link, useNavigate } from "react-router-dom"; // Import hook useNavigate
import { ToastContainer } from "react-toastify";
import Logo from "../../../component/Logo";
import useNguoiDungData from "../../../hook/useNguoiDungData";
import { useStore } from "../../../store";
import routeConfig from "../../../config/routeConfig";
import style from "./Login.module.scss";
const cx = classNames.bind(style);

export default function Login() {
  const { dispatch } = useStore();

  let navigate = useNavigate(); // Sử dụng hook useNavigate để lấy hàm chuyển hướng

  const { loadingNg, loginNguoiDungGiangVien } = useNguoiDungData();

  // Chuyển hàm onFinish vào trong component Login
  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("tenDn", values.tenDn);
    formData.append("matKhau", values.matKhau);
    const res = await loginNguoiDungGiangVien(formData);
    if (res != null) {
      dispatch({ type: "LOGIN_MENTOR", payload: res });
      navigate("/mentor/dashboard"); // Chuyển hướng sau khi đăng nhập thành công
    }
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
              <h2>Đăng nhập tài khoản giảng viên</h2>
            </div>
            <Form onFinish={onFinish}>
              {/* ten giang vien va email */}
              <div className={cx("item-input")}>
                <div className={cx("item")}>
                  <Typography.Title level={5}>Tên đăng nhập</Typography.Title>
                  <Form.Item
                    name="tenDn"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên đăng nhập !",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Tên đăng nhập của bạn"
                      style={{ height: "40px" }}
                    />
                  </Form.Item>
                </div>

                <div className={cx("item")}>
                  <Typography.Title level={5}>Mật khẩu</Typography.Title>
                  <Form.Item
                    name="matKhau"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập mật khẩu !",
                      },
                    ]}
                  >
                    <Input.Password
                      placeholder="Mật khẩu của bạn"
                      style={{ height: "40px" }}
                    />
                  </Form.Item>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                Quên mật khẩu ?
              </div>

              <Form.Item>
                <Row justify="center">
                  <Col>
                    <Button
                      loading={loadingNg}
                      type="primary"
                      htmlType="submit"
                      className={cx("btn-submit")}
                    >
                      Đăng nhập
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
            </Form>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <span>Bạn chưa có tài khoản ? </span>
              <Link to={routeConfig.mentor_Register}> Đăng ký ngay</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
