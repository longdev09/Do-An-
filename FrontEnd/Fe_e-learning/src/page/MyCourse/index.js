import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import Button from "../../component/CustomButton";
import Loading from "../../component/Loading";
import * as khoaHocDaMuaApi from "../../services/api/khoaHocDaMuaApi";
import CourseStudy from "./Course-Study";
import style from "./MyCourse.module.scss";
import { useStore } from "../../store";
import { Link } from "react-router-dom";
import routes from "../../config/routeConfig";
const cx = classNames.bind(style);

function ListCourseStudy() {
  const { state } = useStore();
  const [dsKhChuaHt, setDsKhChuaHt] = useState();
  const [loading, setLoading] = useState(false);
  const getDs = async () => {
    try {
      setLoading(true);
      const res = await khoaHocDaMuaApi.getKhoaHocDaMua(state.tokenHv);
      setDsKhChuaHt(res.data);
      setLoading(false);
    } catch (error) {
      console.log(console.error(error));
    }
  };
  useEffect(() => {
    getDs();
  }, []);
  console.log(dsKhChuaHt);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        dsKhChuaHt &&
        dsKhChuaHt.map((item, index) => <CourseStudy key={index} item={item} />)
      )}
    </>
  );
}

function ListCourseComplete({ arrCourseComplete }) {
  if (arrCourseComplete) {
    return "Sss";
    //   <CourseStudy />
    //   <CourseStudy />
    //   <CourseStudy />
    // </div>  // <div>
  }
  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "23px" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img
          style={{ width: "45%" }}
          src="https://cdn.dribbble.com/users/310943/screenshots/2792692/empty-state-illustrations.gif"
        />
        <span>Bạn chưa hoàn thành khóa học nào !!</span>
      </div>
    </div>
  );
}
export default function MyCourse() {
  const { state } = useStore();
  const [dsKhChuaHt, setDsKhChuaHt] = useState();
  const [loading, setLoading] = useState(false);
  const getDs = async () => {
    try {
      setLoading(true);
      const res = await khoaHocDaMuaApi.getKhoaHocDaMua(state.tokenHv);
      setDsKhChuaHt(res.data);
      setLoading(false);
    } catch (error) {
      console.log(console.error(error));
    }
  };
  useEffect(() => {
    getDs();
  }, []);

  return (
    // <div className={cx("wrap")}>
    //   <div style={{ marginTop: "50px" }}>
    //     <div className={cx("heading")}>
    //       <div className={cx("hello")}>
    //         <h2>Xin chào bạch long </h2>
    //         <span>Bạn vừa học khóa</span>

    //         {/* <CourseStudy /> */}
    //       </div>
    //       <div className={cx("img-banner")}>
    //         <img src="https://firebasestorage.googleapis.com/v0/b/app-e-learning-3f826.appspot.com/o/he_thong%2Fimg_banner%2Fundraw_Multitasking_re_ffpb.png?alt=media&token=9188b4f5-aedd-4f02-9361-41d065cf5d4b" />
    //       </div>
    //     </div>

    //     <div className={cx("content-bottom")}>
    //       <div className={cx("left")}>
    //         <div className={cx("heading-nav")}>
    //           <ul className={cx("nav")}>
    //             {navMenu.map((item, index) => (
    //               <li
    //                 className={cx("item-nav", {
    //                   active: item.id == showContent,
    //                 })}
    //                 key={index}
    //                 onClick={() => handlSetContent(item.id)}
    //               >
    //                 <span>{item.title}</span>
    //               </li>
    //             ))}
    //           </ul>
    //         </div>
    //         {showContent && (
    //           <div className={cx("content")}>
    //             {navMenu.find((item) => item.id === showContent).content}
    //           </div>
    //         )}
    //       </div>

    //       <div className={cx("right")}>
    //         <div className={cx("profile-number")}></div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className={cx("wrap")}>
      <div className={cx("header")}>
        <div className={cx("text-heading")}>
          <h2>Khóa học của tôi</h2>
          <span>Bạn chưa hoàn thành khóa học nào.</span>
        </div>
      </div>
      <div className={cx("wrap-list-course")}>
        <div className={cx("list-course")}>
          {dsKhChuaHt &&
            dsKhChuaHt.map((item, index) => (
              <ItemCourseBy item={item} key={index} />
            ))}
        </div>
      </div>
    </div>
  );
}

function ItemCourseBy({ item }) {
  const tongTienTinh = (item.tienTrinh / item.tongBaiGiang) * 100;
  const progressWidth = `${tongTienTinh}%`;

  return (
    <div className={cx("wrap-item-course")}>
      <div className={cx("item")}>
        <Link
          to={routes.learning_Course.replace(":makh", item.maKh)}
          className={cx("img")}
        >
          <Link
            to={routes.learning_Course.replace(":makh", item.maKh)}
            className={cx("btn-learn")}
          >
            Tiếp tục học
          </Link>
          <img src={item.hinh} />
        </Link>
        <div className={cx("name-course")}>
          <span>{item.tenKh}</span>
          <span>{item.tenGv}</span>
        </div>
        {item.tienTrinh == null ? (
          <span style={{ fontSize: "13px" }}>Bạn chưa học khóa này</span>
        ) : (
          <div
            className={cx("line-process")}
            style={{ "--progress-width": progressWidth }}
          ></div>
        )}
      </div>
    </div>
  );
}
