import { useState, useEffect } from "react";
import * as chuongKhoaHocApi from "../services/api/chuongKhoaHocApi";
import useCustomToast from "./useCustomToast";

export default function useChuongKhoaHocData(maKh) {
  const [loadingCh, setLoadingCh] = useState(false);
  const { showSuccessToast, showErrorToast } = useCustomToast();
  const [dsChuongMaKh, setDsChuongMaKh] = useState([]);

  const createChuong = async (data) => {
    try {
      setLoadingCh(true);
      const res = await chuongKhoaHocApi.createChuongKhoaHoc(data);
      setLoadingCh(false);
      if (res.status === 201) {
        showSuccessToast("Tạo chương thành công");
      } else {
        showErrorToast("Lỗi server");
      }
    } catch (error) {
      console.log("Error fetching  ", error);
    }
  };

  const updateChuong = async (data) => {
    try {
      setLoadingCh(true);
      const res = await chuongKhoaHocApi.updateChuong(data);
      setLoadingCh(false);
    } catch (error) {
      console.log("Error fetching ", error);
    }
  };

  const fetchApiChuongMaKh = async () => {
    try {
      setLoadingCh(true);
      const res = await chuongKhoaHocApi.getChuongMaKh(maKh);
      setLoadingCh(false);
      setDsChuongMaKh(res.data);
      return res;
    } catch (error) {
      console.log("Error fetching  ", error);
    }
  };

  const deleteChuong = async (maCh) => {
    try {
      setLoadingCh(true);
      const res = await chuongKhoaHocApi.deleteChuong(maCh);
      setLoadingCh(false);
      if (res.data.success) {
        showSuccessToast(res.data.message);
      } else {
        showErrorToast(res.data.message);
      }
    } catch (error) {
      console.log("Error fetching  ", error);
    }
  };

  useEffect(() => {
    if (maKh) {
      fetchApiChuongMaKh();
    }
  }, [maKh]);

  const refreshChuong = async () => {
    await fetchApiChuongMaKh();
  };

  return {
    createChuong,
    loadingCh,
    dsChuongMaKh,
    updateChuong,
    refreshChuong,
    deleteChuong,
  };
}
