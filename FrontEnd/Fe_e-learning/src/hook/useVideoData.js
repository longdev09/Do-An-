import { useEffect, useState } from "react";
import * as videoApi from "../services/api/videoApi";
import useCustomToast from "./useCustomToast";
import { useStore } from "../store";
export default function useVideoData(maNd) {
  const [loadingVideo, setLoadingVideo] = useState(true);
  const [video, setVideo] = useState(true);

  const { showSuccessToast, showErrorToast } = useCustomToast();
  const { state } = useStore();

  // const createVideo = async (data, setUploadProgress) => {
  //   try {
  //     setLoadingVideo(true);
  //     const res = await videoApi.createVideo(data, setUploadProgress);
  //     setLoadingVideo(false);
  //     if (res.status === 201) {
  //       showSuccessToast("Tạo khóa học thành công");
  //       return res;
  //     } else {
  //       showErrorToast("Lỗi server");
  //     }
  //   } catch (error) {
  //     showErrorToast("Lỗi server");
  //   }
  // };
  const createVideo = async (makh, data) => {
    try {
      setLoadingVideo(true);
      const res = await videoApi.createVideo(makh, data, state.tokenGv);
      setLoadingVideo(false);
      if (res.data.success) {
        showSuccessToast(res.data.message);
        return res;
      } else {
        showErrorToast(res.data.message);
      }
    } catch (error) {
      showErrorToast("Lỗi server");
    }
  };

  const getVideoTheoMaNd = async () => {
    try {
      setLoadingVideo(true);
      const res = await videoApi.getVideoMaNd(maNd);
      setLoadingVideo(false);
      if (res.data.success) {
        setVideo(res.data.data);
      } else {
        setVideo(res.data.data);
      }
    } catch (error) {}
  };
  useEffect(() => {
    if (maNd != null) {
      console.log("heh");
      getVideoTheoMaNd();
    }
  }, [maNd]);

  const refreshVideo = async () => {
    if (maNd != null) {
      await getVideoTheoMaNd();
    }
  };

  return { loadingVideo, video, createVideo, refreshVideo };
}
