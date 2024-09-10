import { Modal, Input } from "antd";
import useChuongData from "../../../hook/useChuongData";
import { useParams } from "react-router-dom";
import classNames from "classnames/bind";
import style from "./AddChapterModal.module.scss";
import { useState } from "react";
const cx = classNames.bind(style);

export default function AddChapterModal({ isModalOpen, handleCancel }) {
  const url = useParams();
  const { loadingCh, createChuong } = useChuongData();
  
  const [newChuong, setNewChuong] = useState({
    tenChuong: "",
    maKh: url.makh,
  });

  const handleOk = async () => {
    await createChuong(newChuong);
    handleCancel();
    setNewChuong({
      // Đặt lại giá trị của ô input thành rỗng sau khi thêm chương thành công
      tenChuong: "",
      maKh: url.makh,
    });
  };

  const handlChang = (index, value) => {
    setNewChuong((prev) => ({
      ...prev,
      [index]: value,
    }));
  };
  return (
    <>
      <Modal
        confirmLoading={loadingCh}
        title="Thêm chương khóa học"
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleOk}
      >
        <div className={cx("input")}>
          <Input
            onChange={(e) => handlChang("tenChuong", e.target.value)}
            placeholder="Tên chương của bạn"
            className={cx("custom-input")}
          />
        </div>
      </Modal>
    </>
  );
}
