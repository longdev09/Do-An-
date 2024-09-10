import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useKhoaHocData from "../../../../hook/useKhoaHocData";
import classNames from "classnames/bind";
import style from "./StepXuatBan.module.scss";
import { Button } from "antd";
import { ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import routes from "../../../../config/routeConfig";
const cx = classNames.bind(style);
export default function StepXuatBan() {
  let navigate = useNavigate();
  const ulr = useParams();
  const { loadingKh, updateTrangThaiKhoaHoc } = useKhoaHocData();
  const handleSumbit = async () => {
    updateTrangThaiKhoaHoc(ulr.makh, "Đang chờ duyệt");
    navigate(routes.mentor_Course);
  };

  return (
    <div className={cx("wrap")}>
      <ToastContainer />
      <div className={cx("heading")}>
        <h2>Xuất Bản Khóa Học</h2>
        <span style={{ marginTop: "20px" }}>
          Lưu ý: Hãy đảm bảo đẩy đủ nội dung trước khi xuất bản !
        </span>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img src="https://firebasestorage.googleapis.com/v0/b/app-e-learning-3f826.appspot.com/o/he_thong%2Fimg_xuat-ban-khoa-hoc%2Fundraw_Creative_team_re_85gn.png?alt=media&token=f10521f4-1f08-421e-b6bf-5b38d7ce6476" />
      </div>
      <div>
        <p style={{ textAlign: "center", fontSize: "17px", fontWeight: 600 }}>
          Khóa học của bạn đang ở trạng thái nháp. Sau khi gửi yêu cầu phê
          duyệt, khóa sẽ được phê duyệt trong vòng 1 - 3 ngày !
        </p>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Button
          loading={loadingKh}
          onClick={handleSumbit}
          type="primary"
          style={{ color: "#fff" }}
        >
          <FontAwesomeIcon icon={faArrowUpFromBracket} />
          <span style={{ marginLeft: "10px" }}>Gửi yêu cầu phê duyệt</span>
        </Button>
      </div>
    </div>
  );
}
