import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  Row,
  Select,
  Typography,
  Upload,
} from "antd";
import classNames from "classnames/bind";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ToastContainer } from "react-toastify";
import Logo from "../../../component/Logo";
import useDanhMucData from "../../../hook/useDanhMucData";
import useGiangVienData from "../../../hook/useGiangVienData";
import style from "./Register.module.scss";
const cx = classNames.bind(style);

export default function Register() {
  const { dsDm, loadingDm } = useDanhMucData();
  const { createGiangVien, loadingGv } = useGiangVienData();
  const [avataPreview, setAvataPreview] = useState();
  const [matTrcPreview, setMatTrcPreview] = useState();
  const [matSauPreview, setSauTrcPreview] = useState();

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("tenGv", values.tenGv);
    formData.append("email", values.email);
    formData.append("sdt", values.sdt);
    formData.append("ngaySinh", values.ngaySinh);
    formData.append("gioiTinh", values.phai);
    formData.append("linhVuc", values.linhVuc.join(","));
    formData.append("avata", avataPreview.fileList[0].originFileObj);
    formData.append("matTruocCccd", matTrcPreview.fileList[0].originFileObj);
    formData.append("matSauCccd", matSauPreview.fileList[0].originFileObj);
    await createGiangVien(formData);
  };

  const handleAvataPreview = async (file) => {
    try {
      // const imageUrl = URL.createObjectURL(file.fileList[0].originFileObj);
      setAvataPreview(file); // Cập nhật state với URL của hình ảnh
    } catch (error) {
      console.error("Error generating preview URL:", error);
    }
  };
  const handleMatTruocPreview = async (file) => {
    try {
      // const imageUrl = URL.createObjectURL(file.fileList[0].originFileObj);
      setMatTrcPreview(file); // Cập nhật state với URL của hình ảnh
      // console.log("Preview URL:", imageUrl);
    } catch (error) {
      console.error("Error generating preview URL:", error);
    }
  };
  const handleMatSauPreview = async (file) => {
    try {
      // const imageUrl = URL.createObjectURL(file.fileList[0].originFileObj);
      setSauTrcPreview(file); // Cập nhật state với URL của hình ảnh
      // console.log("Preview URL:", imageUrl);
    } catch (error) {
      console.error("Error generating preview URL:", error);
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
              <h2>Đăng ký tài khoản giảng viên</h2>
            </div>

            <Form
              className={cx("wrap-input")}
              name="newGiangVien"
              onFinish={onFinish}
            >
              {/* ten giang vien va email */}
              <div className={cx("item-input")}>
                <div className={cx("item")}>
                  <Typography.Title level={5}>Họ tên</Typography.Title>
                  <Form.Item
                    name="tenGv"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên !",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Họ tên"
                      showCount
                      maxLength={60}
                      className={cx("custom-input")}
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
                        required: true,
                        message: "Vui lòng nhập email !",
                      },
                    ]}
                  >
                    <Input placeholder="Email" className={cx("custom-input")} />
                  </Form.Item>
                </div>
              </div>

              {/* ngay sinh  va phai va sdt */}
              <div className={cx("item-input")}>
                <div className={cx("item")}>
                  <Typography.Title level={5}>Số điện thoại</Typography.Title>

                  <Form.Item
                    name="sdt"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên !",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Số điện thoại"
                      showCount
                      maxLength={10}
                      className={cx("custom-input")}
                    />
                  </Form.Item>
                </div>

                <div className={cx("item")}>
                  <Typography.Title level={5}>Ngày sinh</Typography.Title>
                  <Form.Item
                    name="ngaySinh"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập ngày sinh !",
                      },
                    ]}
                  >
                    <Input type="date" className={cx("custom-input")} />
                  </Form.Item>
                </div>

                <div className={cx("item")}>
                  <Typography.Title level={5}>Giới tính</Typography.Title>
                  <Form.Item
                    name="gioiTinh"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn giới tính !",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Giới tính"
                      style={{ height: "50px" }}
                      options={[
                        { label: "Nam", value: "nam" },
                        { label: "Nữ", value: "nữ" },
                      ]}
                    />
                  </Form.Item>
                </div>
              </div>

              {/* linh vuc giang day  */}
              <div className={cx("item-input")}>
                <div style={{ width: "100%", padding: "0px 10px" }}>
                  <Typography.Title level={5}>
                    Lĩnh vực giảng dạy
                  </Typography.Title>
                  <Form.Item
                    name="linhVuc"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn ít nhất một lĩnh vực",
                      },
                    ]}
                  >
                    <Select
                      loading={loadingDm}
                      style={{ height: "50px" }}
                      mode="multiple"
                      placeholder="Lĩnh vực giảng dạy"
                      options={
                        dsDm &&
                        dsDm.map((item, index) => ({
                          value: item.maDm,
                          label: item.tenDm,
                        }))
                      }
                    />
                  </Form.Item>
                </div>
              </div>

              {/* Giới thiệu bản thân */}
              <div className={cx("into-input")}>
                <Typography.Title level={5}>
                  Giới thiệu về bản thân
                </Typography.Title>
                <Form.Item
                  name="gioiThieu"
                  rules={[{ required: true, message: "Không được bỏ trống !" }]}
                >
                  <ReactQuill
                    placeholder="Giới thiệu càng chí tiết, sẽ được duyệt sớm hơn !"
                    // style={{ height: "100px", marginBottom: "70px" }}
                    className={cx("text-edit")}
                    theme="snow"
                  />
                </Form.Item>
              </div>

              <div className={cx("list-img")}>
                <div className={cx("item-img")}>
                  <Form.Item
                    fi
                    name="avata"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng tải lên ảnh đại diện !",
                      },
                    ]}
                  >
                    <div className={cx("upload-img")}>
                      {avataPreview ? (
                        <Image
                          width={200}
                          src={URL.createObjectURL(
                            avataPreview.fileList[0].originFileObj
                          )}
                          style={{ marginBottom: "20px" }}
                        />
                      ) : (
                        ""
                      )}
                      <Upload
                        showUploadList={false}
                        beforeUpload={() => {
                          return false;
                        }}
                        accept=".jpg,.jpeg,.png,.gif"
                        maxCount={1}
                        onChange={handleAvataPreview}
                      >
                        <div className={cx("wrap-text")}>
                          <p className="icon">
                            <UploadOutlined style={{ fontSize: "40px" }} />
                          </p>
                          <p className="ant-upload-text">
                            Tải lên ảnh đại diện của bạn
                          </p>
                        </div>
                      </Upload>
                    </div>
                  </Form.Item>
                </div>
                <div className={cx("item-img")}>
                  <Form.Item
                    name="matTruocCccd"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng tải lên ảnh !",
                      },
                    ]}
                  >
                    <div className={cx("upload-img")}>
                      {matTrcPreview ? (
                        <Image
                          width={200}
                          src={URL.createObjectURL(
                            matTrcPreview.fileList[0].originFileObj
                          )}
                          style={{ marginBottom: "20px" }}
                        />
                      ) : (
                        ""
                      )}
                      <Upload
                        showUploadList={false}
                        beforeUpload={() => {
                          return false;
                        }}
                        accept=".jpg,.jpeg,.png,.gif"
                        maxCount={1}
                        onChange={handleMatTruocPreview}
                      >
                        <div className={cx("wrap-text")}>
                          <p className="icon">
                            <UploadOutlined style={{ fontSize: "40px" }} />
                          </p>
                          <p className="ant-upload-text">
                            Tải lên mặt trước căn cước công dân
                          </p>
                        </div>
                      </Upload>
                    </div>
                  </Form.Item>
                </div>
                <div className={cx("item-img")}>
                  <Form.Item
                    name="matSauCccd"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng tải lên ảnh !",
                      },
                    ]}
                  >
                    <div className={cx("upload-img")}>
                      {matSauPreview ? (
                        <Image
                          width={200}
                          src={URL.createObjectURL(
                            matSauPreview.fileList[0].originFileObj
                          )}
                          style={{ marginBottom: "20px" }}
                        />
                      ) : (
                        ""
                      )}
                      <Upload
                        showUploadList={false}
                        beforeUpload={() => {
                          return false;
                        }}
                        accept=".jpg,.jpeg,.png,.gif"
                        maxCount={1}
                        onChange={handleMatSauPreview}
                      >
                        <div className={cx("wrap-text")}>
                          <p className="icon">
                            <UploadOutlined style={{ fontSize: "40px" }} />
                          </p>
                          <p className="ant-upload-text">
                            Tải lên ảnh mặt sau căn cước công dân
                          </p>
                        </div>
                      </Upload>
                    </div>
                  </Form.Item>
                </div>
              </div>

              <Form.Item>
                <Row justify="center">
                  <Col>
                    <Button
                      loading={loadingGv}
                      type="primary"
                      htmlType="submit"
                      className={cx("btn-submit")}
                    >
                      Đăng Ký Tài Khoản
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
