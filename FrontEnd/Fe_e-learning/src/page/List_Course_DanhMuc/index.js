import { faTengeSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Radio, Rate } from "antd";
import classNames from "classnames/bind";
import style from "./List_Course_DanhMuc.module.scss";
import CourseHorizontal from "../../component/Course_Horizontal";
import * as khoaHocApi from "../../services/api/khoaHocApi";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../../component/Loading";
const cx = classNames.bind(style);

export default function ListCourseDanhMuc() {
  const ulr = useParams();
  const [loading, setLoading] = useState(false);
  const [dsKh, setDsKh] = useState();
  const getDanhSachDanhMuc = async () => {
    setLoading(true);
    var res = await khoaHocApi.getAllKhoaHocDanhMuc(ulr.maDm);
    setLoading(false);
    setDsKh(res.data.data);
  };
  useEffect(() => {
    getDanhSachDanhMuc();
  }, []);

  return (
    <div className={cx("wrap")}>
      <div className={cx("heading")}>
        <h2>Khóa học Kinh Doanh</h2>
      </div>
      <div className={cx("container")}>
        <div className={cx("fitter-pane")}>
          <div className={cx("btn-fitter")}>
            <span>
              <FontAwesomeIcon icon={faTengeSign} />
            </span>
            <span>Bộ Lọc</span>
          </div>
          <div style={{ fontSize: "18px", fontWeight: "700" }}>
            {dsKh && dsKh.length} kết quả
          </div>
        </div>
        <div className={cx("content")}>
          <div className={cx("filter")}>
            <div className={cx("rank")}>
              <h2>Xếp hạng</h2>

              <Radio.Group className={cx("radio-wrap")}>
                <Radio style={{ padding: "10px 0" }} value={1}>
                  <Rate
                    style={{ fontSize: "14px" }}
                    disabled
                    allowHalf
                    defaultValue={4.5}
                  />
                  <span style={{ fontSize: "14px", marginLeft: "5px" }}>
                    Từ 4.5 sao trở lên
                  </span>
                </Radio>
                <Radio style={{ padding: "10px 0" }} value={2}>
                  <Rate
                    style={{ fontSize: "14px" }}
                    disabled
                    allowHalf
                    defaultValue={4}
                  />
                  <span style={{ fontSize: "14px", marginLeft: "5px" }}>
                    Từ 4 sao trở lên
                  </span>
                </Radio>
                <Radio style={{ padding: "10px 0" }} value={3}>
                  <Rate
                    style={{ fontSize: "14px" }}
                    disabled
                    allowHalf
                    defaultValue={3}
                  />
                  <span style={{ fontSize: "14px", marginLeft: "5px" }}>
                    Từ 3 sao trở lên
                  </span>
                </Radio>
                <Radio style={{ padding: "10px 0" }} value={4}>
                  <Rate
                    style={{ fontSize: "14px" }}
                    disabled
                    allowHalf
                    defaultValue={1}
                  />
                  <span style={{ fontSize: "14px", marginLeft: "5px" }}>
                    Từ 1 sao trở lên
                  </span>
                </Radio>
              </Radio.Group>
            </div>
            <div className={cx("price")}>
              <h2>Giá</h2>
              <Radio.Group className={cx("radio-wrap")}>
                <Radio
                  style={{ padding: "10px 0", fontSize: "17px" }}
                  value={1}
                >
                  Từ thấp đến cao
                </Radio>
                <Radio
                  style={{ padding: "10px 0", fontSize: "17px" }}
                  value={2}
                >
                  Từ cao đến thấp
                </Radio>
              </Radio.Group>
            </div>
          </div>
          <div className={cx("list-course")}>
            {loading ? (
              <Loading />
            ) : (
              dsKh &&
              dsKh.map((item, index) => (
                <CourseHorizontal key={index} item={item} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
