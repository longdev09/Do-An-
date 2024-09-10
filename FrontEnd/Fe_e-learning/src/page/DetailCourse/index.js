import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import numeral from "numeral";
import Button from "../../component/CustomButton";
import classNames from "classnames/bind";
import style from "./DetailCourse.module.scss";
import { useState } from "react";
import useKhoaHocData from "../../hook/useKhoaHocData";
import { useParams } from "react-router-dom";
import IntroduceMenu from "./Content-Menu/Introduce_Menu";
import Programme from "./Content-Menu/Programme";
const cx = classNames.bind(style);

export default function DetailCourse() {
  const ulr = useParams();

  const [showContent, setShowContent] = useState(1);
  const { detailKhoaHoc } = useKhoaHocData(ulr.makh);
  const handlSetContent = (id) => {
    setShowContent(id);
  };
  const headingNav = [
    {
      id: 1,
      title: "TỔNG QUAN",
      content: (
        <IntroduceMenu
          gioiThieu={detailKhoaHoc && detailKhoaHoc.gioiThieu}
          kqdd={detailKhoaHoc && detailKhoaHoc.kqdd}
        />
      ),
    },
    {
      id: 2,
      title: "CHƯƠNG TRÌNH HỌC",
      content: <Programme dsChuong={detailKhoaHoc && detailKhoaHoc.dsChuong} />,
    },
    {
      id: 3,
      title: "Menu 3",
      content: "Nội dung của Menu 3",
    },
  ];
  return (
    <div className={cx("wrap")}>
      <div className={cx("main")}>
        <div className={cx("left")}>
          <div className={cx("wrap-left")}>
            <div className={cx("course-top")}>
              <div className={cx("title-course")}>
                <h2 className={cx("name-course")}>
                  {detailKhoaHoc && detailKhoaHoc.tenKh}
                </h2>
              </div>
            </div>

            <div className={cx("course-bottom")}>
              <div className={cx("heading")}>
                <ul className={cx("nav")}>
                  {headingNav.map((item, index) => (
                    <li
                      className={cx("item-nav", {
                        active: item.id == showContent,
                      })}
                      key={index}
                      onClick={() => handlSetContent(item.id)}
                    >
                      <FontAwesomeIcon icon={faBookmark} />
                      <span>{item.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {showContent && (
                <div className={cx("content")}>
                  {headingNav.find((item) => item.id === showContent).content}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={cx("right")}>
          <div className={cx("sider-bar")}>
            <div className={cx("course-about")}>
              <div className={cx("img-course")}>
                <img src={detailKhoaHoc && detailKhoaHoc.hinh} />
              </div>

              <div className={cx("price")}>
                <span>
                  {numeral(detailKhoaHoc && detailKhoaHoc.gia).format("0,0")} ₫
                </span>
                <span> {numeral(1000000).format("0,0")} ₫</span>
              </div>
              <div className={cx("btn")}>
                <Button w100>Thêm vào giỏ</Button>
                <Button w100>Mua ngay</Button>
              </div>

              <div className={cx("info-course")}>
                <h2>Thông tin khóa học</h2>
                <ul className={cx("list-item")}>
                  <li>
                    <FontAwesomeIcon
                      icon={faLayerGroup}
                      style={{ color: "#0d5ef4" }}
                    />
                    <span>Cấp độ khóa học: </span>
                  </li>
                  <li>
                    <FontAwesomeIcon
                      icon={faLayerGroup}
                      style={{ color: "#0d5ef4" }}
                    />
                    <span>
                      Giảng viên: {detailKhoaHoc && detailKhoaHoc.tenGV}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
