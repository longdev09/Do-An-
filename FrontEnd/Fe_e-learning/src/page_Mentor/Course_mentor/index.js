import TableKhoaHoc from "../../component/Table/Table_KhoaHoc";
import AddNewCourseModal from "../../component/Modal/Add_NewCourseModal";

import { useState } from "react";
import classNames from "classnames/bind";
import style from "./CourseMentor.module.scss";
import { Button } from "antd";

const cx = classNames.bind(style);
export default function CourseMentor() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={cx("main")}>
      <div className={cx("wrap")}>
        <div className={cx("heading")}>
          <div className={cx("")}>
            <Button onClick={showModal}>Khóa học mới</Button>
          </div>
        </div>

        <div className={cx("container")}>
          {/*  =hien thi cac khoa hoc cua giang vien */}
          <TableKhoaHoc />
        </div>
      </div>

      {/* cac modal */}

      {/* them khoa hoc moi */}
      <AddNewCourseModal
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
      />
    </div>
  );
}
