import { Button, Form, Modal, Rate } from "antd";
import classNames from "classnames/bind";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import style from "./AddEvaluateCourseModal.module.scss";
import useDanhGiaKhoaHocData from "../../../hook/useDanhGiaKhoaHocData";
import { useParams } from "react-router-dom";

const cx = classNames.bind(style);

export default function AddEvaluateCourseModal({ isModalOpen, handleCancel }) {
  const ulr = useParams();
  const { loadingDg, createDanhGia } = useDanhGiaKhoaHocData();
  const handlSumbitBaiGiang = (values) => {
    const formData = new FormData();
    formData.append("noiDung", values.noiDung);
    formData.append("soSao", values.soSao);
    formData.append("maKh", ulr.makh);
    createDanhGia(formData);
    handleCancel();
  };
  return (
    <>
      <Modal
        title="Đánh giá khóa học"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <div className={cx("wrapp")}>
          <div className={cx("evaluate")}>
            <Form onFinish={handlSumbitBaiGiang}>
              <div className={cx("star")}>
                <div style={{ marginBottom: "5px", fontSize: "15px" }}>
                  Mức độ đánh giá
                </div>
                <Form.Item
                  name="soSao"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng cung cấp mức độ đánh giá!",
                    },
                  ]}
                >
                  <Rate />
                </Form.Item>
              </div>
              <div className={cx("cmt")}>
                <div style={{ marginBottom: "5px", fontSize: "15px" }}>
                  Nội dung đánh giá của bạn
                </div>
                <Form.Item
                  name="noiDung"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng cung cấp nội dung đánh giá !",
                    },
                  ]}
                >
                  <ReactQuill className={cx("text-edit")} theme="snow" />
                </Form.Item>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button loading={loadingDg} type="primary" htmlType="submit">
                  Đánh giá khóa học
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </Modal>
    </>
  );
}
