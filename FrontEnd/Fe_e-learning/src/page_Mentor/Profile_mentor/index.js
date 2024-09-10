import { SettingOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Space, Typography } from "antd";
import classNames from "classnames/bind";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Loading from "../../component/Loading";
import useGiangVienData from "../../hook/useGiangVienData";
import style from "./Profile_mentor.module.scss";
const cx = classNames.bind(style);
export default function ProfileMentors() {
  const { loadingGv, thongTinGv } = useGiangVienData();

  return (
    <div className={cx("wrap")}>
      {loadingGv ? (
        <Loading />
      ) : (
        <div className={cx("container")}>
          <div className={cx("heading")}>Thông tin của bạn</div>
          {thongTinGv ? (
            <div className={cx("content")}>
              <div className={cx("avata")}>
                <img src={thongTinGv.avata} />
              </div>
              <div className={cx("info")}>
                <Form>
                  {/* ten giang vien va sdt */}
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
                          defaultValue={thongTinGv.tenGv}
                          placeholder="Họ tên"
                          showCount
                          maxLength={60}
                          className={cx("custom-input")}
                        />
                      </Form.Item>
                    </div>

                    <div className={cx("item")}>
                      <Typography.Title level={5}>
                        Số điện thoại
                      </Typography.Title>
                      <Form.Item
                        name="sdt"
                        rules={[
                          {
                            type: "sdt",
                            required: true,
                            message: "Vui lòng nhập số điện thoại !",
                          },
                        ]}
                      >
                        <Input
                          defaultValue={thongTinGv.sdt}
                          placeholder="Số điện thoại"
                          className={cx("custom-input")}
                        />
                      </Form.Item>
                    </div>
                  </div>

                  {/* ngay sinh va phai*/}
                  <div className={cx("item-input")}>
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
                        <Input
                          defaultValue={
                            new Date(thongTinGv.ngaySinh)
                              .toISOString()
                              .split("T")[0]
                          }
                          type="date"
                          className={cx("custom-input")}
                        />
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
                          defaultValue={thongTinGv.phai}
                          placeholder="Giới tính"
                          style={{ height: "50px" }}
                          options={[
                            { label: "Nam", value: "Nam" },
                            { label: "Nữ", value: "Nữ" },
                          ]}
                        />
                      </Form.Item>
                    </div>
                  </div>

                  {/* linh vuc giang day  */}
                  {/* <div className={cx("item-input")}>
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
                          // loading={loadingDm}
                          style={{ height: "50px" }}
                          mode="multiple"
                          placeholder="Lĩnh vực giảng dạy"
                          // options={
                          //   dsDm &&
                          //   dsDm.map((item, index) => ({
                          //     value: item.maDm,
                          //     label: item.tenDm,
                          //   }))
                          // }
                        />
                      </Form.Item>
                    </div>
                  </div> */}

                  {/* thong tin tai khoan  */}
                  <div className={cx("item-input")}>
                    <div className={cx("item")}>
                      <Typography.Title level={5}>
                        Tên đăng nhập
                      </Typography.Title>
                      <Form.Item name="email">
                        <Input
                          disabled
                          placeholder="Email"
                          className={cx("custom-input")}
                        />
                      </Form.Item>
                    </div>

                    <div className={cx("item")}>
                      <Typography.Title level={5}>
                        Mật khẩu của bạn
                      </Typography.Title>
                      <Form.Item>
                        <Space.Compact
                          style={{
                            width: "100%",
                            height: "50px",
                          }}
                        >
                          <Input
                            disabled
                            className={cx("custom-input")}
                            defaultValue={"**********************"}
                          />
                          <Button
                            type="primary"
                            style={{
                              height: "50px",
                            }}
                          >
                            <SettingOutlined />
                          </Button>
                        </Space.Compact>
                      </Form.Item>
                    </div>
                  </div>

                  {/* Giới thiệu bản thân */}
                  <div
                    className={cx("into-input")}
                    style={{ padding: "0px 10px" }}
                  >
                    <Typography.Title level={5}>
                      Giới thiệu về bản thân
                    </Typography.Title>
                    <Form.Item
                      name="gioiThieu"
                      rules={[
                        { required: true, message: "Không được bỏ trống !" },
                      ]}
                    >
                      <ReactQuill
                        value={thongTinGv.gioiThieu}
                        placeholder="Giới thiệu càng chí tiết, sẽ được duyệt sớm hơn !"
                        className={cx("text-edit")}
                        theme="snow"
                      />
                    </Form.Item>
                  </div>
                </Form>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
}
