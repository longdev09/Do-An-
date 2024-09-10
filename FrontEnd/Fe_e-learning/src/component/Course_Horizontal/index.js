import { Rate } from "antd";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import style from "./CourseHorizontal.module.scss";
import numeral from "numeral";
const cx = classNames.bind(style);

export default function CourseHorizontal({ item }) {
  return (
    <div className={cx("wrap")}>
      <div className={cx("wrap-course")}>
        <div style={{ width: "30%" }}>
          <img src={item.hinh} />
        </div>
        <div className={cx("text")}>
          <h3>
            <Link>{item.tenKh}</Link>
          </h3>
          <span style={{ fontSize: "13px" }}>{item.tenGv}</span>
          <div className={cx("rate")}>
            <Rate
              style={{ fontSize: "13px" }}
              disabled
              defaultValue={Math.round(item.trungBinhDanhGia)}
            />
            <span style={{ marginLeft: "10px" }} className={cx("sum")}>
              ({item.tongDanhGia})
            </span>
          </div>
        </div>
        <div className={cx("pirce")}>
          {item.giaGiam == 0 ? (
            <span
              className={cx("price")}
              style={{ color: "red", fontWeight: "700", fontSize: "20px" }}
            >
              {numeral(item && item.gia).format("0,0")} ₫
            </span>
          ) : (
            <div className={cx("price-re")}>
              <span>{numeral(item && item.giaGiam).format("0,0")} ₫</span>
              <span>{numeral(item && item.gia).format("0,0")} ₫</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
