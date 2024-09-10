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
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

//api
import useDanhMucData from "../../../../hook/useDanhMucData";

import useKhoaHocData from "../../../../hook/useKhoaHocData";
//
import classNames from "classnames/bind";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../../component/Loading";
import style from "./Step_GioiThieu.module.scss";
import { ToastContainer } from "react-toastify";
const cx = classNames.bind(style);

function StepGioiThieu() {
  const ulr = useParams();

  let nav = useNavigate();
  const { dsDm, loadingDm } = useDanhMucData();
  const { loadingKh, thongTinKhoaHocGv, updateKhoaHoc } = useKhoaHocData(
    ulr.makh
  );

  const [avataPreview, setAvataPreview] = useState();

  const handleAvataPreview = async (file) => {
    try {
      // const imageUrl = URL.createObjectURL(file.fileList[0].originFileObj);
      setAvataPreview(file); // Cập nhật state với URL của hình ảnh
    } catch (error) {
      console.error("Error generating preview URL:", error);
    }
  };

  // cap nhat kh hoc tai day
  const onFinish = async (values) => {
    const formsData = new FormData();
    formsData.append("maKh", ulr.makh);
    formsData.append("maDm", values.maDm);
    formsData.append("tenKh", values.tenKh);
    formsData.append("gioiThieu", values.gioiThieu);
    formsData.append("ketQuaDatDuoc", values.ketQuaDatDuoc);
    if (!avataPreview || !avataPreview.fileList[0]) {
      formsData.append("hinh", thongTinKhoaHocGv.hinh);
    } else {
      formsData.append("hinh", avataPreview.fileList[0].originFileObj);
    }
    await updateKhoaHoc(formsData);
  };

  return (
    <div className={cx("wrapp")}>
      <ToastContainer />
      {loadingKh && loadingDm ? (
        <Loading />
      ) : (
        <>
          {thongTinKhoaHocGv && (
            <Form
              onFinish={onFinish}
              initialValues={{
                tenKh: thongTinKhoaHocGv ? thongTinKhoaHocGv.tenKh : "", // Set giá trị mặc định cho trường 'tenKh'
                maDm: thongTinKhoaHocGv ? thongTinKhoaHocGv.maDm : "", // Set giá trị mặc định cho trường 'maDm'
                gioiThieu: thongTinKhoaHocGv ? thongTinKhoaHocGv.gioiThieu : "", // Set giá trị mặc định cho trường 'gioiThieu'
                ketQuaDatDuoc: thongTinKhoaHocGv
                  ? thongTinKhoaHocGv.ketQuaDatDuoc
                  : "", // Set giá trị mặc định cho trường 'ketQuaDatDuoc'
              }}
            >
              <div className={cx("title-course")}>
                <div className={cx("left")}>
                  <Typography.Title level={5}>
                    Tiêu đề khóa học
                  </Typography.Title>

                  <Form.Item
                    name="tenKh"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên khóa học !",
                      },
                    ]}
                  >
                    <Input
                      showCount
                      maxLength={60}
                      className={cx("custom-input")}
                    />
                  </Form.Item>
                </div>

                <div className={cx("right")}>
                  <Typography.Title level={5}>
                    Danh mục khóa học
                  </Typography.Title>
                  <Form.Item
                    name="maDm"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn mã danh mục !",
                      },
                    ]}
                  >
                    <Select
                      className={cx("custom-select")}
                      showSearch
                      placeholder="Search to Select"
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
              <div className={cx("intro-course")}>
                <Typography.Title level={5}>
                  Giới thiệu khóa học
                </Typography.Title>
                <Form.Item
                  name="gioiThieu"
                  rules={[{ required: true, message: "Không được bỏ trống !" }]}
                >
                  <ReactQuill className={cx("text-edit")} theme="snow" />
                </Form.Item>
              </div>
              <div className={cx("intro-course")}>
                <Typography.Title level={5}>Kết quả đạt được</Typography.Title>
                <Form.Item
                  name="ketQuaDatDuoc"
                  rules={[{ required: true, message: "Không được bỏ trống !" }]}
                >
                  <ReactQuill className={cx("text-edit")} theme="snow" />
                </Form.Item>
              </div>
              <div className={cx("upload_img_avata")}>
                <div className={cx("upload-img")}>
                  {!avataPreview || !avataPreview.fileList[0] ? (
                    <Image
                      width={200}
                      src={thongTinKhoaHocGv.hinh} // Đường dẫn của hình ảnh mặc định
                      style={{ marginBottom: "20px" }}
                    />
                  ) : (
                    <Image
                      width={200}
                      src={URL.createObjectURL(
                        avataPreview.fileList[0].originFileObj
                      )}
                      style={{ marginBottom: "20px" }}
                    />
                  )}
                  <Form.Item name="hinh">
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
                          Tải lên ảnh đại diện cho khóa học của bạn
                        </p>
                      </div>
                    </Upload>
                  </Form.Item>
                </div>
              </div>
              <Form.Item>
                <Row justify="center">
                  <Col>
                    <Button
                      loading={loadingKh}
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
        </>
      )}
    </div>
  );
}
export default StepGioiThieu;
