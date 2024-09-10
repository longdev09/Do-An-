import { UploadOutlined } from "@ant-design/icons";
import {
  faPenToSquare,
  faTrashCan,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Table, Upload } from "antd";
import classNames from "classnames/bind";
import { useState } from "react";
import { useParams } from "react-router-dom";
import style from "./ItemLesson.module.scss";
import useVideoData from "../../hook/useVideoData";
const cx = classNames.bind(style);
export default function ItemLesson({ item }) {
  const [showAddVideo, setShowAddVideo] = useState(false);
  const { loadingVideo, createVideo, video, refreshVideo } = useVideoData(
    item.maNd
  );

  const handleShowAddVideo = () => {
    setShowAddVideo(!showAddVideo);
  };

  const hanhdleShowUpdate = () => {};
  const url = useParams();
  // tai len video
  const handleUpload = async ({ file }) => {
    const formData = new FormData();
    formData.append("video", file);
    formData.append("maNd", item.maNd);
    formData.append("ngay", new Date().toISOString());
    formData.append("tenFile", file.name);
    await createVideo(url.makh, formData);
    refreshVideo();
  };

  return (
    <div className={cx("wrapp")}>
      <div style={{ padding: "15px" }} className={cx("wrapp-heading")}>
        <div className={cx("left")}>
          <div className={cx("title")}>
            <span>Bài giảng {item.stt} :</span>
            <span>{item.tieuDe}</span>
          </div>

          {/* chinh sua noi dung  */}
          <div className={cx("btn-edit")}>
            <span onClick={hanhdleShowUpdate}>
              <FontAwesomeIcon icon={faPenToSquare} />
            </span>
            <span>
              <FontAwesomeIcon icon={faTrashCan} />
            </span>
          </div>
        </div>

        {/* nut de mo phan them video */}
        <div className={cx("right")}>
          {/* nut mo add video */}
          <Button onClick={handleShowAddVideo}>
            <FontAwesomeIcon icon={faVideo} />
          </Button>
        </div>
      </div>

      <div
        className={cx("wrapp-add-video")}
        style={{ display: showAddVideo ? "block" : "none" }}
      >
        {/* neu video co thi an upload, con lai thi hien thi */}
        <div className={cx("container")}>
          {video ? (
            " "
          ) : (
            <div className={cx("upload-video")}>
              <Upload
                maxCount={1}
                className={cx("custom-upload")}
                customRequest={handleUpload}
                accept=".mp4"
                showUploadList={false}
              >
                <Button
                  loading={loadingVideo}
                  disabled={loadingVideo}
                  icon={<UploadOutlined />}
                >
                  Tải lên video
                </Button>
              </Upload>
            </div>
          )}

          {/*  hien thi video */}
          {video ? (
            <div className={cx("video-succse")}>
              <div className={cx("wrap-video")}>
                <div className={cx("video")}>
                  <video src={video && video.videoUlr} />
                </div>
                <div className={cx("content")}>
                  <div className={cx("name-file")}>
                    {video && video.tenFile}
                  </div>
                  <div className={cx("edit-video")}>
                    <span>
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </span>
                    <span>Thay đổi video </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
