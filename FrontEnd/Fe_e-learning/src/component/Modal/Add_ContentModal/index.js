import { Form, Input, Radio, Typography, Row, Col, Button } from "antd";
import Modal from "antd/es/modal/Modal";
import classNames from "classnames/bind";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import style from "./AddContentModal.module.scss";
import useNoiDungData from "../../../hook/useNoiDungData";
import { useParams } from "react-router-dom";
const cx = classNames.bind(style);

// them noi dung khoa hoc
export default function AddContentModal({ maCh, isModalOpen, handleCancel }) {
  const [formToShow, setFormToShow] = useState("a");

  const { loadingNd, createNoiDung } = useNoiDungData();
  const handleRadioChange = (e) => {
    setFormToShow(e.target.value);
  };

  const ulr = useParams();

  // them noi dung
  const handlSumbitBaiGiang = async (values) => {
    const formData = new FormData();
    formData.append("tieuDe", values.tieuDe);
    formData.append("moTa", values.moTa);
    formData.append("maCh", maCh);
    formData.append("maLoaiNd", "LND01");
    await createNoiDung(ulr.makh, formData);
    handleCancel();
  };

  const handlSumbitTracNghiem = async (values) => {
    console.log(values);
    const formData = new FormData();
    formData.append("tieuDe", values.tieuDe);
    formData.append("moTa", values.moTa);
    formData.append("maCh", maCh);
    formData.append("maLoaiNd", "LND02");
    await createNoiDung(ulr.makh, formData);
    handleCancel();
  };
  return (
    <Modal
      width={900} // Set width to 600px
      title="THÊM NỘI DUNG CHO KHÓA HỌC"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
    >
      <div className={cx("wrap")}>
        <div className={cx("radio-group")}>
          <Radio.Group onChange={handleRadioChange} value={formToShow}>
            <Radio.Button value="a">Bài Giảng</Radio.Button>
            <Radio.Button value="b">Trắc Nghiệm</Radio.Button>
          </Radio.Group>
        </div>

        {/*  form bai giang */}
        {formToShow === "a" && (
          <Form className={cx("form-bai-giang")} onFinish={handlSumbitBaiGiang}>
            <div className={cx("input-item")}>
              <Typography.Title level={5}>Bài giảng mới</Typography.Title>
              <Form.Item
                name="tieuDe"
                rules={[
                  { required: true, message: "Vui lòng nhập tên khóa học !" },
                ]}
              >
                <Input
                  showCount
                  maxLength={60}
                  className={cx("custom-input")}
                />
              </Form.Item>
            </div>
            <div className={cx("intro-course")}>
              <Typography.Title level={5}>Mô tả cho bài giảng</Typography.Title>
              <Form.Item
                name="moTa"
                rules={[{ required: true, message: "Không được bỏ trống !" }]}
              >
                <ReactQuill
                  // style={{ height: "100px", marginBottom: "70px" }}
                  className={cx("text-edit")}
                  theme="snow"
                />
              </Form.Item>
            </div>
            <Form.Item>
              <Row justify="center">
                <Col>
                  <Button
                    loading={loadingNd}
                    type="primary"
                    htmlType="submit"
                    className={cx("btn-submit")}
                  >
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        )}

        {/*  form trac nghiem */}
        {formToShow === "b" && (
          <Form
            className={cx("form-bai-giang")}
            onFinish={handlSumbitTracNghiem}
          >
            <div className={cx("input-item")}>
              <Typography.Title level={5}>Trắc nghiệm mới</Typography.Title>
              <Form.Item
                name="tieuDe"
                rules={[
                  { required: true, message: "Vui lòng nhập tên khóa học !" },
                ]}
              >
                <Input
                  placeholder="Nhập tiêu đề"
                  showCount
                  maxLength={60}
                  className={cx("custom-input")}
                />
              </Form.Item>
            </div>
            <div className={cx("intro-course")}>
              <Typography.Title level={5}>
                Mô tả cho trắc nghiệm
              </Typography.Title>
              <Form.Item
                name="moTa"
                rules={[{ required: true, message: "Không được bỏ trống !" }]}
              >
                <ReactQuill className={cx("text-edit")} theme="snow" />
              </Form.Item>
            </div>
            <Form.Item>
              <Row justify="center">
                <Col>
                  <Button
                    loading={loadingNd}
                    type="primary"
                    htmlType="submit"
                    className={cx("btn-submit")}
                  >
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        )}
      </div>
    </Modal>
  );
}
