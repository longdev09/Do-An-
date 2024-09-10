import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input, Button } from "antd";
import classNames from "classnames/bind";
import numeral from "numeral";
import { useState } from "react";
import style from "./StepGia.module.scss";
import { ToastContainer } from "react-toastify";
import useKhoaHocData from "../../../../hook/useKhoaHocData";
import { useParams } from "react-router-dom";
const cx = classNames.bind(style);

export default function StepGia() {
  const [inputValue, setInputValue] = useState("");
  const ulr = useParams();
  const { loadingKh, updateGiaKhoaHoc } = useKhoaHocData();
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handlSumbit = async () => {
    const formData = new FormData();
    formData.append("maKh", ulr.makh);
    formData.append("gia", inputValue);
    await updateGiaKhoaHoc(formData);
  };
  return (
    <div className={cx("wrap")}>
      <ToastContainer />
      <div className={cx("heading")}>
        <span>
          <FontAwesomeIcon icon={faExclamation} />
        </span>
        <span>
          Lưu ý: Giá khóa học sau khi cập nhật sẽ là cố định và không thay đổi,
          bạn có thể giảm giá bằng các khuyến mãi
        </span>
      </div>
      <div className={cx("content")}>
        <h3>Giá khóa học của bạn</h3>
        <div>
          <Input
            value={inputValue}
            style={{ height: "50px" }}
            onChange={handleChange}
          />
        </div>
        <div className={cx("price")}>
          <span>Giá bán: </span>
          <span>{numeral(inputValue).format("0,0")}</span>
          <span>VND</span>
        </div>
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button loading={loadingKh} onClick={handlSumbit}>
            Cập nhật
          </Button>
        </div>
      </div>
    </div>
  );
}
