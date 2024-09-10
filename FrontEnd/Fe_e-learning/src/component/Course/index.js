import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Popover, Rate } from "antd";
import { FaCartArrowDown } from "react-icons/fa";
// import CustomButton from "../Button";
import classNames from "classnames/bind";
import numeral from "numeral";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import routeConfig from "../../config/routeConfig";
import useGioHangData from "../../hook/useGioHangData";
import { useStore } from "../../store";
import style from "./Course.module.scss";
const cx = classNames.bind(style);

export default function Course({ item }) {
  const { loadingGh, createGioHang } = useGioHangData();
  const { dispatch } = useStore();

  const handleAddCart = async () => {
    const formData = new FormData();
    formData.append("maKh", item && item.maKh);
    const res = await createGioHang(formData);

    // them vao khoa hoc gio
    if (res == 1) {
      dispatch({ type: "ADD_TO_CART", payload: item });
    }
  };

  const [extractedTextArray, setExtractedTextArray] = useState([]);

  const extractTextFromHTML = (htmlString) => {
    const doc = new DOMParser().parseFromString(htmlString, "text/html");
    const items = doc.querySelectorAll("li");
    // Lấy nội dung văn bản từ mỗi thẻ <li>
    const textArray = Array.from(items)
      .map((item) => item.textContent)
      .slice(0, 3);
    return textArray;
  };
  useEffect(() => {
    setExtractedTextArray(extractTextFromHTML(item && item.ketQuaDatDuoc));
  }, [item && item.ketQuaDatDuoc]); // Thêm kqdd vào dependency array để useEffect được gọi lại khi kqdd thay đổi

  const content = (
    <div style={{ width: "300px" }}>
      <h2 style={{ fontSize: "18px" }}>{item && item.tenKh}</h2>

      <div
        className={cx("text")}
        dangerouslySetInnerHTML={{ __html: item && item.gioiThieu }}
      />
      <ul className={cx("list-result")}>
        {extractedTextArray.map(
          (
            item,
            index // Thêm index vào để tránh lỗi React key
          ) => (
            <li key={index} className={cx("item")}>
              <span>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span>{item}</span>
            </li>
          )
        )}
      </ul>
      <div className={cx("btn")}>
        <Button
          className={cx("custom-btn")}
          type="primary"
          loading={loadingGh}
          onClick={handleAddCart}
        >
          <div className={cx("btn-text")}>
            <FaCartArrowDown />
            <span>Thêm vào giỏ hàng</span>
          </div>
        </Button>
      </div>
    </div>
  );

  return (
    <Popover placement="right" content={content}>
      <Card
        hoverable
        style={{
          width: 240,
        }}
        bodyStyle={{ padding: "10px 18px" }} // Remove padding from card body
        cover={
          <Link
            to={routeConfig.detail_course.replace(":makh", item && item.maKh)}
          >
            <img
              style={{ height: "160px", width: "240px" }}
              src={item && item.hinh}
            />
          </Link>
        }
      >
        <div className={cx("course-describe")}>
          <h2 className={cx("course-title")}>{item && item.tenKh}</h2>
          <span className={cx("course-name-mentor")}>{item && item.tenGv}</span>
          <div className={cx("star")}>
            <span className={cx("point")}>{item && item.trungBinhDanhGia}</span>
            <Rate
              style={{ fontSize: "15px" }}
              disabled
              defaultValue={Math.round(item && item.trungBinhDanhGia)}
            />
            <span className={cx("sum")}>({item && item.tongDanhGia})</span>
          </div>

          <div className={cx("course-price")}>
            <div className={cx("wrapp")}>
              <span className={cx("reduced-price")}>
                {numeral(item && item.gia).format("0,0")} ₫
              </span>

              {/* gia giam */}
              {item && item.giaGiam === 0 ? (
                ""
              ) : (
                <span className={cx("price")}>
                  {numeral(item && item.giaGiam).format("0,0")}₫
                </span>
              )}
            </div>
          </div>
        </div>
      </Card>
    </Popover>
  );
}
