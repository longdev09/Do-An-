import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faCirclePlay,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import classNames from "classnames/bind";
import style from "./Programme.module.scss";
const cx = classNames.bind(style);

export default function Programme({ dsChuong }) {
  const dsChuongSorted = [...dsChuong].sort((a, b) => a.stt - b.stt);

  const [openedChapters, setOpenedChapters] = useState({});
  const [expandAll, setExpandAll] = useState(false);

  const toggleChapter = (maChuong) => {
    setOpenedChapters((prevState) => ({
      ...prevState,
      [maChuong]: !prevState[maChuong],
    }));
  };

  const toggleExpandAll = () => {
    setExpandAll(!expandAll);
    setOpenedChapters({}); // Đặt trạng thái của mỗi chương về mặc định khi mở rộng hoặc thu gọn tất cả
  };
  return (
    <div className={cx("wrap")}>
      <div className={cx("content")}>
        <h2>Nội dung bài học</h2>
        <div className={cx("heading")}>
          <ul>
            <li>11 Chương </li>
            <li>138 bài học</li>
            <li>Thời lượng 10 giờ 29 phút </li>
          </ul>
          <div onClick={toggleExpandAll} style={{ cursor: "pointer" }}>
            <span>{expandAll ? "Thu gọn tất cả" : "Mở rộng tất cả"}</span>
          </div>
        </div>

        <div className={cx("wrap-course")}>
          {dsChuongSorted.map((itemC, index) => (
            <>
              <div
                className={cx("pane")}
                key={index}
                onClick={() => toggleChapter(itemC.maChuong)}
              >
                <div className={cx("pane-heading")}>
                  <div className={cx("text")}>
                    <FontAwesomeIcon
                      icon={
                        openedChapters[itemC.maChuong] || expandAll
                          ? faMinus
                          : faPlus
                      }
                      style={{ marginRight: "10px" }}
                    />
                    <span>{itemC.stt}. </span>
                    <span>{itemC.tenChuong}</span>
                  </div>
                  <div className={cx("sum-course")}>
                    <span style={{ marginRight: "4px" }}>
                      {itemC.noiDungChuongs.length}
                    </span>
                    <span>bài học</span>
                  </div>
                </div>
              </div>

              {/* noi dung chuong */}
              {/* Nội dung của mỗi chương */}
              {(expandAll || openedChapters[itemC.maChuong]) && (
                <div className={cx("pane-course")}>
                  {itemC.noiDungChuongs.map((itemND, indexND) => (
                    <div className={cx("sub-pane")} key={indexND}>
                      <div className={cx("pane-heading")}>
                        <div className={cx("text")}>
                          <FontAwesomeIcon
                            icon={faCirclePlay}
                            style={{ marginRight: "10px" }}
                          />
                          <span>{itemND.stt}. </span>
                          <span>{itemND.tenNoiDung}</span>
                        </div>
                        <div className={cx("sum-course")}>
                          <span>{itemND.thoiLuong}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ))}
          {/* chuong */}
        </div>
      </div>
    </div>
  );
}
