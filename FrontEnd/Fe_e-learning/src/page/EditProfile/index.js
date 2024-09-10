import { SettingOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Select,
  Image,
  Typography,
  Upload,
  Row,
  Col,
} from "antd";
import classNames from "classnames/bind";
import style from "./EditProfile.module.scss";
import { useEffect, useState } from "react";
import Loading from "../../component/Loading";
import * as hocVienApi from "../../services/api/hocVienApi";
import { useStore } from "../../store";
const cx = classNames.bind(style);

export default function EditProfile() {
  const { state } = useStore();

  const [hv, setHv] = useState();
  const [loading, setLoading] = useState(false);
  const [avata, setAvata] = useState();
  const getHv = async () => {
    setLoading(true);
    var res = await hocVienApi.getHocVien(state.tokenHv);
    setHv(res.data.data);
  };
  console.log(hv);

  useEffect(() => {
    getHv();
  }, []);

  const onFinish = () => {};

  const handleAvataPreview = async (file) => {
    console.log(file);
    try {
      // const imageUrl = URL.createObjectURL(file.fileList[0].originFileObj);
      setAvata(file); // Cập nhật state với URL của hình ảnh
    } catch (error) {
      console.error("Error generating preview URL:", error);
    }
  };

  return (
    <div className={cx("wrap")}>
      <div className={cx("heading")}>
        <h2>Thông tin cá nhân</h2>
      </div>
      <div className={cx("container")}>
        <div className={cx("heading")}>Thông tin của bạn</div>

        <div className={cx("info")}>
          {hv && (
            <Form
              className={cx("wrap-form")}
              onFinish={onFinish}
              initialValues={{
                hoTen: hv.hoTen,
                sdt: hv.sdt,
                email: hv.email,
              }}
            >
              <div style={{ display: "flex" }}>
                <div className={cx("item-img")}>
                  <Form.Item
                    name="avata"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng tải lên ảnh !",
                      },
                    ]}
                  >
                    <div className={cx("upload-img")}>
                      {avata ? (
                        <Image
                          width={200}
                          src={URL.createObjectURL(
                            avata.fileList[0].originFileObj
                          )}
                          style={{ marginBottom: "20px" }}
                        />
                      ) : (
                        <Upload
                          showUploadList={false}
                          beforeUpload={() => {
                            return false;
                          }}
                          accept=".jpg,.jpeg,.png,.gif"
                          maxCount={1}
                          onChange={handleAvataPreview}
                        >
                          <div
                            className={cx("wrap-text")}
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <p className="icon">
                              <UploadOutlined style={{ fontSize: "40px" }} />
                            </p>
                            <p className="ant-upload-text">
                              Tải lên ảnh đại duyện của bạn
                            </p>
                          </div>
                        </Upload>
                      )}
                    </div>
                  </Form.Item>
                </div>

                {/* ten giang vien va sdt */}
                <div className={cx("item-input")}>
                  <div className={cx("item")}>
                    <Typography.Title level={5}>Họ tên</Typography.Title>
                    <Form.Item
                      name="hoTen"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập tên !",
                        },
                      ]}
                    >
                      <Input
                        defaultValue={hv.hoTen}
                        placeholder="Họ tên"
                        className={cx("custom-input")}
                      />
                    </Form.Item>
                  </div>

                  <div className={cx("item")}>
                    <Typography.Title level={5}>Số điện thoại</Typography.Title>
                    <Form.Item
                      name="sdt"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập số điện thoại !",
                        },
                      ]}
                    >
                      <Input
                        // defaultValue={hv.sdt}
                        placeholder="Số điện thoại"
                        className={cx("custom-input")}
                      />
                    </Form.Item>
                  </div>
                  <div className={cx("item")}>
                    <Typography.Title level={5}>Email</Typography.Title>
                    <Form.Item name="email">
                      <Input
                        disabled
                        defaultValue={hv.email}
                        placeholder="Email"
                        className={cx("custom-input")}
                      />
                    </Form.Item>
                  </div>
                </div>
              </div>

              <Form.Item>
                <Row justify="center">
                  <Col>
                    <Button
                      //   loading={loadingGv}
                      type="primary"
                      htmlType="submit"
                      className={cx("btn-submit")}
                    >
                      Cập nhật
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
}
