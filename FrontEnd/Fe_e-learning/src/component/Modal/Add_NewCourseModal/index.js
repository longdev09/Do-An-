import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  Modal,
  Row,
  Select,
  Typography,
  Upload,
} from "antd";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import routeConfig from "../../../config/routeConfig";
//api
import useDanhMucData from "../../../hook/useDanhMucData";
import useKhoaHocData from "../../../hook/useKhoaHocData";
//
import classNames from "classnames/bind";
import style from "./AddNewCourse.module.scss";
const cx = classNames.bind(style);

// get base 64
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

// btn add img
const uploadButton = (
  <button
    style={{
      border: 0,
      background: "none",
    }}
    type="button"
  >
    <PlusOutlined />
    <div
      style={{
        marginTop: 8,
      }}
    >
      Upload
    </div>
  </button>
);
export default function AddNewCourseModal({ isModalOpen, handleCancel }) {
  const { dsDm } = useDanhMucData();
  const { createKhoaHoc, loadingKh } = useKhoaHocData();

  let nav = useNavigate();

  const onFinish = async (values) => {
    const formsData = new FormData();
    formsData.append("maDm", values.maDm);
    formsData.append("tenKh", values.tenKh);
    formsData.append("gioiThieu", values.gioiThieu);
    formsData.append("ketQuaDatDuoc", values.ketQuaDatDuoc);
    formsData.append("hinh", values.hinh[0].originFileObj);
    const res = await createKhoaHoc(formsData);
    nav(routeConfig.mentor_Course_Create_Update.replace(":makh", res.data));
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChange = ({ fileList }) => setFileList(fileList);
  return (
    <Modal
      confirmLoading={loadingKh}
      width={1000}
      title="Khóa học mới"
      open={isModalOpen}
      onCancel={handleCancel}
      okButtonProps={{ style: { display: "none" } }} // Ẩn nút OK
    >
      {/*  form gui du lieu */}

      <Form name="newKhoaHoc" onFinish={onFinish} className={cx("wrapp")}>
        {/* ten khoa hoc, danh muc */}
        <div className={cx("title-course")}>
          <div className={cx("left")}>
            <Typography.Title level={5}>Tên khóa học</Typography.Title>
            <Form.Item
              name="tenKh"
              rules={[
                { required: true, message: "Vui lòng nhập tên khóa học !" },
              ]}
            >
              <Input showCount maxLength={60} className={cx("custom-input")} />
            </Form.Item>
          </div>
          <div className={cx("right")}>
            <Typography.Title level={5}>Danh mục khóa học</Typography.Title>
            <Form.Item
              name="maDm"
              rules={[
                { required: true, message: "Vui lòng chọn mã danh mục !" },
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
          <Typography.Title level={5}>Giới thiệu khóa học</Typography.Title>
          <Form.Item
            name="gioiThieu"
            rules={[{ required: true, message: "Không được bỏ trống !" }]}
          >
            <ReactQuill
              // style={{ height: "100px", marginBottom: "70px" }}
              className={cx("text-edit")}
              theme="snow"
            />
          </Form.Item>
        </div>

        <div className={cx("intro-course")}>
          <Typography.Title level={5}>Kết quả đạt được</Typography.Title>
          <Form.Item
            name="ketQuaDatDuoc"
            rules={[{ required: true, message: "Không được bỏ trống !" }]}
          >
            <ReactQuill
              // style={{ height: "100px", marginBottom: "70px" }} // Set height here
              className={cx("text-edit")}
              theme="snow"
            />
          </Form.Item>
        </div>

        <div className={cx("upload_img_avata")}>
          <Form.Item
            name="hinh"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[
              {
                required: true,
                message: "Vui lòng tải lên ảnh đại diện cho khóa học !",
              },
            ]}
          >
            <Upload
              beforeUpload={() => {
                return false;
              }}
              accept=".jpg,.jpeg,.png,.gif"
              maxCount={1}
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
          </Form.Item>

          {previewImage && (
            <Image
              wrapperStyle={{ display: "none" }}
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
                afterOpenChange: (visible) => !visible && setPreviewImage(""),
              }}
              src={previewImage}
            />
          )}
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
                Tạo khóa học
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Modal>
  );
}
