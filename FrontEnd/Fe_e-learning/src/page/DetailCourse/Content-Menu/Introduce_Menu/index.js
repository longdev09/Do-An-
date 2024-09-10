import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import style from "./IntroduceMenu.module.scss";
const cx = classNames.bind(style);

export default function IntroduceMenu({ gioiThieu, kqdd }) {
  const [extractedTextArray, setExtractedTextArray] = useState([]);

  useEffect(() => {
    setExtractedTextArray(extractTextFromHTML(kqdd));
  }, [kqdd]); // Thêm kqdd vào dependency array để useEffect được gọi lại khi kqdd thay đổi

  const extractTextFromHTML = (htmlString) => {
    const doc = new DOMParser().parseFromString(htmlString, "text/html");
    const items = doc.querySelectorAll("li");
    // Lấy nội dung văn bản từ mỗi thẻ <li>
    const textArray = Array.from(items).map((item) => item.textContent);
    return textArray;
  };

  return (
    <div className={cx("wrap")}>
      <div className={cx("heading1")}>
        <h2>Giới thiệu về khóa học</h2>
        <div
          className={cx("text")}
          dangerouslySetInnerHTML={{ __html: gioiThieu }}
        />
      </div>
      <div className={cx("heading2")}>
        <h2>Kết quả đạt được</h2>
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
      </div>
    </div>
  );
}
