import { Button } from "antd";
import { useMemo, useState } from "react";
import { ToastContainer } from "react-toastify";
import ItemChapter from "../../../../component/ItemChapter";
import Loading from "../../../../component/Loading";
import AddChapterModal from "../../../../component/Modal/Add_ChapterModal";
import useChuongData from "../../../../hook/useChuongData";

import classNames from "classnames/bind";
import { Link, useParams } from "react-router-dom";
import style from "./Step_Chuong.module.scss";
import routes from "../../../../config/routeConfig";
const cx = classNames.bind(style);

export default function StepChuong() {
  const url = useParams();

  //call api
  const { loadingCh, dsChuongMaKh, refreshChuong } = useChuongData(url.makh);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dsChuongSorted = [...dsChuongMaKh].sort((a, b) => a.stt - b.stt);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    refreshChuong();
  };

  const modalComponent = useMemo(() => {
    return isModalOpen ? (
      <AddChapterModal isModalOpen={isModalOpen} handleCancel={handleCancel} />
    ) : null;
  }, [isModalOpen]);

  return (
    <div className={cx("main")}>
      <ToastContainer />
      <div className={cx("wrapp")}>
        <div className={cx("chapter")}>
          <div>
            <h1>Chương trình giảng dạy</h1>
          </div>
          <div className={cx("btn-add-chapter")}>
            <Button className={cx("btn-custom")} onClick={showModal}>
              Thêm chương
            </Button>

            {dsChuongMaKh && dsChuongMaKh.length > 0 ? (
              <a
                target="_blank"
                href={routes.mentor_PreviewCourse.replace(":makh", url.makh)}
                className={cx("custom-link")}
              >
                Xem trước
              </a>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className={cx("wrap-list")}>
          {loadingCh ? (
            <Loading />
          ) : (
            <div className={cx("list-chapter")}>
              {dsChuongSorted.map((item, index) => (
                <div className={cx("item-chapter")} key={index}>
                  <ItemChapter item={item} key={index} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* cac modal */}
      {modalComponent}
    </div>
  );
}
