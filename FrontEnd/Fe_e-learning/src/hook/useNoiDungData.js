import useCustomToast from "./useCustomToast";
import { useState, useEffect } from "react";
import * as noiDungApi from "../services/api/noiDungApi";

export default function useNoiDungData(maCh) {
  const { showSuccessToast, showErrorToast } = useCustomToast();
  const [dsNd, setDsNd] = useState();
  const [loadingNd, setLoadingNd] = useState(false);

  const createNoiDung = async (maKh, data) => {
    try {
      setLoadingNd(true);
      const res = await noiDungApi.createNoiDung(maKh, data);
      setLoadingNd(false);
      if (res.data.success === true) {
        showSuccessToast(res.data.message);
      } else {
        showErrorToast("Lỗi server");
      }
    } catch (error) {
      console.log("Error fetching  ", error);
    }
  };
  const fetchApiNoiDungChuong = async () => {
    try {
      setLoadingNd(true);
      const res = await noiDungApi.getNoiDungChuong(maCh);
      setLoadingNd(false);
      setDsNd(res.data);
      return res;
    } catch (error) {
      console.log("Error fetching  ", error);
    }
  };

  useEffect(() => {
    if (maCh) {
      fetchApiNoiDungChuong();
    }
  }, [maCh]);

  const refreshNoiDung = async () => {
    await fetchApiNoiDungChuong();
  };

  return { dsNd, loadingNd, createNoiDung, refreshNoiDung };
}
