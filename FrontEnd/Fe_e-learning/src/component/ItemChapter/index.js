import {
  faFile,
  faPenToSquare,
  faPlus,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popconfirm } from "antd";
import useNoiDungData from "../../hook/useNoiDungData";
import ItemLesson from "../ItemLesson";
import Loading from "../Loading";
import AddContentModal from "../Modal/Add_ContentModal";
import UpdateChuong from "../Update_Cmp/Update_Chuong";
import ItemMultipleChoice from "../ItemMultiple-choice";
import classNames from "classnames/bind";
import { useMemo, useState } from "react";
import style from "./ItemChapter.module.scss";

const cx = classNames.bind(style);

export default function ItemChapter({ item }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { loadingNd, dsNd, refreshNoiDung } = useNoiDungData(item.maCh);
  const [showUpdate, setShowUpdate] = useState(true);

  const [updatedTenChuong, setUpdatedTenChuong] = useState(null);
  const dsNdSorted = dsNd && [...dsNd].sort((a, b) => a.stt - b.stt);
  //
  const hanhdleShowUpdate = () => {
    setShowUpdate(!showUpdate);
  };

  // cap nhat ten
  const handleUpdateTenChuong = (newTenChuong) => {
    setUpdatedTenChuong(newTenChuong);
  };

  // xoa chuong

  const handleDeleteChuong = async () => {
    console.log(item);
  };

  // dong modal them noi dung
  const handleCancel = () => {
    setIsModalOpen(false);
    refreshNoiDung();
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  // mo modal
  const modalComponent = useMemo(() => {
    return isModalOpen ? (
      <AddContentModal
        maCh={item.maCh}
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
      />
    ) : null;
  }, [isModalOpen]);

  return (
    <div className={cx("wrap")}>
      <div
        className={cx("heading")}
        style={{ display: showUpdate ? "flex" : "none" }}
      >
        <div className={cx("title")}>
          <span>Chương: {item.stt}</span>
          <span>
            <FontAwesomeIcon icon={faFile} />{" "}
            {updatedTenChuong ? updatedTenChuong : item.tenChuong}
          </span>
        </div>
        <div className={cx("btn-edit")}>
          {/* cap nhat ten chuong */}
          <span onClick={hanhdleShowUpdate}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </span>

          {/* xoa chuong */}
          <Popconfirm
            title="Xóa chương khóa học"
            description="Việc xóa này! sẽ xóa tất cả các nội dung đang có trong chương ?"
            onConfirm={handleDeleteChuong}
            // onCancel={cancel}
            okText="Có"
            cancelText="Không"
            // okButtonProps={{ loading: loadingGg }}
          >
            <span>
              <FontAwesomeIcon icon={faTrashCan} />
            </span>
          </Popconfirm>
        </div>
      </div>
      <div className={cx("update-chuong")}>
        <UpdateChuong
          item={item}
          show={showUpdate}
          handleShow={hanhdleShowUpdate}
          onUpdateTenChuong={handleUpdateTenChuong}
        />
      </div>

      {/* noi dung bai giang */}
      <div className={cx("content")}>
        {loadingNd ? (
          <Loading />
        ) : (
          <>
            {dsNd && dsNd.length > 0 && (
              <div className={cx("list-content-course")}>
                {dsNdSorted.map((item, index) =>
                  item.maLoaiNd == "LND01" ? (
                    <ItemLesson item={item} key={index} />
                  ) : (
                    <ItemMultipleChoice item={item} key={index} />
                  )
                )}
              </div>
            )}
          </>
        )}
      </div>
      {/*  cap nhat lai ten chuong */}

      {/*  mo modal them khoa hoc */}
      <div className={cx("add-content-course")} onClick={showModal}>
        <div className={cx("wrap")}>
          <span>
            <FontAwesomeIcon icon={faPlus} />
          </span>
          <span>Tạo bài giảng</span>
        </div>
      </div>
      {modalComponent}
    </div>
  );
}
