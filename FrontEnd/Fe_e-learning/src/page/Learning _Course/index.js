import {
  faAngleLeft,
  faChevronDown,
  faChevronUp,
  faCirclePlay,
  faLock,
  faSquareCheck,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import CustomButton from "../../component/CustomButton";
import Loading from "../../component/Loading";
import AddEvaluateCourseModal from "../../component/Modal/Add_EvaluateCourseModal";
import * as khoaHocApi from "../../services/api/khoaHocApi";
import * as khoaHocDaMuaApi from "../../services/api/khoaHocDaMuaApi";
import { useStore } from "../../store";
import style from "./LearningCourse.module.scss";
import { Button } from "antd";
import confetti from "canvas-confetti";
const cx = classNames.bind(style);

export default function Learning_Course() {
  const { state } = useStore();
  const ulr = useParams();
  const [kh, setDsKh] = useState();

  const [loading, setLoading] = useState(false);

  const [openedChapters, setOpenedChapters] = useState({});

  const [video, setVideo] = useState();

  const [selectedItem, setSelectedItem] = useState();

  const [itemUlock, setItemUlock] = useState();

  const [unlockInterval, setUnlockInterval] = useState(null);

  const [noiDungTracNghiem, setNoiDungTracNghiem] = useState();

  const [checkVideoDau, setCheckVideoDau] = useState(false);

  const [mota, setMoTa] = useState();
  /**********************************/
  // lay ds khoa hoc

  const getKh = async () => {
    try {
      setLoading(true);
      const res = await khoaHocApi.getThongTinHocKhoaHoc(
        ulr.makh,
        state.tokenHv
      );
      setItemUlock(res.data.tienTrinh);
      setSelectedItem(res.data.tienTrinh);

      res.data.dsChuong.map((item) =>
        item.noiDungChuongs.map((i) => {
          if (i.stt === res.data.tienTrinh) {
            if (i.loaiNoiDung === "LND01") {
              console.log("sss");
              setVideo(i.noiDungChiTiet.videoUlr);
              setMoTa(i.moTa);
            } else {
              setNoiDungTracNghiem(i.noiDungChiTiet);
            }
          }
        })
      );

      setLoading(false);
      setDsKh(res.data);
    } catch (error) {
      console.log("loi");
    }
  };

  const updateTienDoHocTap = async (tienDo) => {
    try {
      await khoaHocDaMuaApi.updateTienDoHocTap(ulr.makh, tienDo, state.tokenHv);
    } catch (error) {
      console.log("loi");
    }
  };

  useEffect(() => {
    getKh();
  }, []);

  /**********************************/

  // sap xep chuong
  const dsChuongDaSapXepNoiDung =
    kh && kh.dsChuong.sort((a, b) => a.stt - b.stt);

  dsChuongDaSapXepNoiDung &&
    dsChuongDaSapXepNoiDung.forEach((chuong) => {
      chuong.noiDungChuongs.sort((a, b) => a.stt - b.stt);
    });

  // mo chuong
  const toggleChapter = (maChuong) => {
    setOpenedChapters((prevState) => ({
      ...prevState,
      [maChuong]: !prevState[maChuong],
    }));
  };

  const [checkPlay, setCheckPlay] = useState(false);

  // play video dau tien
  const handlePlayVideo = () => {
    const videoPlayer = document.getElementById("videoPlayer");
    if (selectedItem == itemUlock) {
      videoPlayer.play();
      setCheckPlay(true);

      const videoDuration = videoPlayer.duration; // Thiết lập videoDuration tại đây
      let time = 0;
      const interval = setInterval(() => {
        time += 1;
        if ((time * 100) / videoDuration > 80) {
          updateTienDoHocTap(itemUlock + 1);
          setItemUlock((prev) => Math.max(prev, itemUlock + 1));
          clearInterval(interval);
        }
      }, 1000);
      // Save the interval ID
      setUnlockInterval(interval);
    }
    videoPlayer.play();
    setCheckPlay(true);
  };

  // // de chay video :v
  useEffect(() => {
    const videoPlayer = document.getElementById("videoPlayer");

    const handleCanPlay = () => {
      if (checkPlay) {
        videoPlayer.play();
      }

      videoPlayer.removeEventListener("canplay", handleCanPlay);
    };

    if (videoPlayer) {
      videoPlayer.addEventListener("canplay", handleCanPlay);
      videoPlayer.load();
    }

    return () => {
      if (videoPlayer) {
        videoPlayer.removeEventListener("canplay", handleCanPlay);
      }
    };
  }, [video]);

  // unlock video va bai giang la video

  const handleSetUnlock = (videoUlr, stt, moTa) => {
    if (unlockInterval) {
      clearInterval(unlockInterval);
      setUnlockInterval(null);
    }
    setSelectedItem(stt);
    setVideo(videoUlr);
    setMoTa(moTa);
    // Kiểm tra trạng thái mở khóa bài giảng
    if (itemUlock == stt) {
      const videoPlayer = document.getElementById("videoPlayer");
      let videoDuration; // lay thời lượng video

      videoPlayer.addEventListener("loadedmetadata", () => {
        videoDuration = videoPlayer.duration;
      });

      let time = 0;
      const interval = setInterval(() => {
        time += 1;
        if ((time * 100) / videoDuration > 80) {
          updateTienDoHocTap(stt + 1);
          setItemUlock((prev) => Math.max(prev, stt + 1));
          clearInterval(interval);
        }
      }, 1000);

      // Save the interval ID
      setUnlockInterval(interval);
    }
  };

  //************************************************************** */
  // trac nghiem

  const handleSetUnlockTracNghiem = (stt, ndChiTiet) => {
    setSelectedItem(stt);
    setVideo(null);
    setNoiDungTracNghiem(ndChiTiet);
  };

  //************************************************************** */

  //Su kien click trac nghiem
  //************************************************************** */

  const [activeAnswer, setActiveAnswer] = useState(-1);

  const [activeWrong, setActiveWrong] = useState(-1);
  const [activeCorrect, setActiveCorrect] = useState(-1);

  const handleSetAnswer = (sttDa) => {
    setActiveWrong(-1);
    setActiveCorrect(-1);
    setActiveAnswer(sttDa);
  };

  const handleReply = () => {
    if (noiDungTracNghiem.dapAnDung == activeAnswer) {
      setActiveCorrect(activeAnswer);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.9 },
      });

      updateTienDoHocTap(itemUlock + 1);
      setItemUlock((prev) => Math.max(prev + 1));
      return;
    }
    setActiveWrong(activeAnswer);
  };
  //************************************************************** */

  // phan mo modal danh gia khoa hoc
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //danh gia khoa hoc
  const modalComponent = useMemo(() => {
    return isModalOpen ? (
      <AddEvaluateCourseModal
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
      />
    ) : null;
  }, [isModalOpen]);

  return (
    <>
      <ToastContainer />
      {loading ? (
        <Loading />
      ) : (
        <div className={cx("wrap")}>
          <div className={cx("container")}>
            <div className={cx("heading")}>
              <div className={cx("icon-back-btn")}>
                <FontAwesomeIcon icon={faAngleLeft} />
              </div>
              <a className={cx("logo")}>{kh && kh.tenKh}</a>
              <div className={cx("action")}>
                <div className={cx("progress-bar")}>
                  <p>
                    {itemUlock} / {kh && kh.tongNoiDung} bài học
                  </p>
                </div>
              </div>
            </div>

            {/* hien thi ra noi dung khoa hoc */}
            <div className={cx("tracks")}>
              <div className={cx("track-list")}>
                <div className={cx("track-header")}>
                  <h3>Nội dung khóa học</h3>
                </div>
                <div className={cx("track-body")}>
                  {dsChuongDaSapXepNoiDung &&
                    dsChuongDaSapXepNoiDung.map((item, index) => (
                      <div className={cx("track-item")} key={index}>
                        {/* in ra ten chuong */}
                        <div
                          className={cx("item-heading")}
                          onClick={() => toggleChapter(item.maChuong)}
                        >
                          <div className={cx("text")}>
                            <div className={cx("text-chapter")}>
                              <span>{item.stt}. </span>
                              <span>{item.tenChuong}</span>
                            </div>
                            <div className={cx("sub-text")}>
                              <span>0 / {item.noiDungChuongs.length}</span>
                            </div>
                          </div>
                          <div style={{ width: "36px" }}>
                            <FontAwesomeIcon
                              icon={
                                openedChapters[item.maChuong]
                                  ? faChevronUp
                                  : faChevronDown
                              }
                              style={{ marginRight: "10px" }}
                            />
                          </div>
                        </div>

                        {openedChapters[item.maChuong] && (
                          <div className={cx("pane-list")}>
                            {item.noiDungChuongs.map((i, index) =>
                              i.loaiNoiDung == "LND01" ? (
                                // bai giang video
                                <div
                                  className={cx("wrap-pane", {
                                    selected: selectedItem == i.stt,
                                    active: i.stt <= itemUlock,
                                  })}
                                  onClick={() =>
                                    handleSetUnlock(
                                      i.noiDungChiTiet.videoUlr,
                                      i.stt,
                                      i.moTa
                                    )
                                  }
                                  key={index} // Add key here
                                >
                                  <div className={cx("pane-item")}>
                                    <div className={cx("text")}>
                                      <div className={cx("text-main")}>
                                        <span>{i.stt}. </span>
                                        <span>{i.tenNoiDung}</span>
                                      </div>
                                      <div className={cx("sub-text")}>
                                        <FontAwesomeIcon
                                          icon={faCirclePlay}
                                          style={{ marginRight: "10px" }}
                                        />
                                      </div>
                                    </div>
                                    <div className={cx("check-course")}>
                                      {i.stt <= itemUlock ? (
                                        <FontAwesomeIcon
                                          style={{ color: "red" }}
                                          icon={faSquareCheck}
                                        />
                                      ) : (
                                        <FontAwesomeIcon icon={faLock} />
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                //  bai tap trac nghiem
                                <div
                                  className={cx("wrap-pane", {
                                    selected: selectedItem === i.stt,
                                    active: i.stt <= itemUlock,
                                  })}
                                  onClick={() =>
                                    handleSetUnlockTracNghiem(
                                      i.stt,
                                      i.noiDungChiTiet
                                    )
                                  }
                                  key={index} // Add key here
                                >
                                  <div className={cx("pane-item")}>
                                    <div className={cx("text")}>
                                      <div className={cx("text-main")}>
                                        <span>{i.stt}. </span>
                                        <span>{i.tenNoiDung}</span>
                                      </div>
                                      <div className={cx("sub-text")}>
                                        <FontAwesomeIcon
                                          icon={faCirclePlay}
                                          style={{ marginRight: "10px" }}
                                        />

                                        {/* thoi luong video bai giang */}
                                      </div>
                                    </div>
                                    <div className={cx("check-course")}>
                                      <FontAwesomeIcon icon={faLock} />
                                    </div>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            </div>
            {video != null ? (
              <div className={cx("content-wrapp")}>
                <div className={cx("video-wrapp")}>
                  <div className={cx("video-bg")}>
                    <div className={cx("video-js")}>
                      <video
                        width="100%"
                        height="100%"
                        id="videoPlayer"
                        controls={checkPlay ? true : false}
                      >
                        <source type="video/mp4" src={video} />
                      </video>
                      <div
                        className={cx("video-post")}
                        style={{ display: checkPlay == true ? "none" : "" }}
                      >
                        <div className={cx("bg-post")}>
                          <div className={cx("btn-play")}>
                            <div
                              className={cx("btn-icon")}
                              onClick={handlePlayVideo}
                            >
                              <FontAwesomeIcon icon={faPlay} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={cx("video-content")}
                  dangerouslySetInnerHTML={{ __html: mota }}
                ></div>
              </div>
            ) : (
              // trac nghiem
              <div className={cx("content-wrap-trac-nghiem")}>
                <div className={cx("wrap")}>
                  <div className={cx("heading-")}>
                    <h1>Ôn tập useImperativeHandle hook</h1>
                  </div>
                  <div
                    className={cx("question")}
                    dangerouslySetInnerHTML={{
                      __html: noiDungTracNghiem && noiDungTracNghiem.tenCauHoi,
                    }}
                  ></div>

                  <div className={cx("answer")}>
                    {noiDungTracNghiem &&
                      noiDungTracNghiem.dsDapAn.map((answer, index) => (
                        <div
                          onClick={() => handleSetAnswer(answer.sttDa)}
                          key={index}
                          className={cx("item-answer", {
                            activeanswer: activeAnswer == answer.sttDa,
                            activeWrong: activeWrong == answer.sttDa,
                            activeCorrect: activeCorrect == answer.sttDa,
                          })}
                          dangerouslySetInnerHTML={{ __html: answer.tenDa }}
                        ></div>
                      ))}
                  </div>

                  <div className={cx("btn-reply")}>
                    <Button
                      onClick={handleReply}
                      disabled={activeAnswer == -1}
                      type="primary"
                    >
                      Trả lời
                    </Button>
                  </div>

                  <div className={cx("explain")}>
                    <h2
                      style={{
                        display:
                          activeWrong != -1 || activeCorrect != -1
                            ? "block"
                            : "none",
                      }}
                    >
                      Giải thích
                    </h2>
                    {noiDungTracNghiem &&
                      noiDungTracNghiem.dsDapAn.map((i, index) =>
                        i.sttDa == activeWrong || i.sttDa == activeCorrect ? (
                          <span>{i.giaiThich}</span>
                        ) : (
                          ""
                        )
                      )}
                  </div>
                </div>
              </div>
            )}

            <div className={cx("action-bar")}>
              <div>
                <CustomButton onClick={showModal}>
                  Đánh Giá Khóa Học
                </CustomButton>
              </div>
            </div>
          </div>

          {modalComponent}
        </div>
      )}
    </>
  );
}
