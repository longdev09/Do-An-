import { useState, useEffect } from "react";
import * as giamGiaApi from "../services/api/giamGiaApi";
import useCustomToast from "./useCustomToast";
import { useStore } from "../store";
export default function useGiamGiaData() {
  const [loadingGg, setLoadingGg] = useState(false);
  const { showSuccessToast, showErrorToast } = useCustomToast();

  const { state } = useStore();
  const createGiamGia = async (data) => {
    try {
      setLoadingGg(true);
      const res = await giamGiaApi.createGiamGia(data, state.tokenGv);
      setLoadingGg(false);
      if (res.data.success) {
        showSuccessToast(res.data.message);
      } else {
        showErrorToast("Lỗi server");
      }
    } catch (error) {
      console.log("Error fetching  ", error);
    }
  };

  const deleteGiamGia = async (maGg) => {
    try {
      setLoadingGg(true);
      const res = await giamGiaApi.deleteGiamGia(maGg, state.tokenGv);
      setLoadingGg(false);
      if (res.data.success) {
        showSuccessToast(res.data.message);
      } else {
        showErrorToast("Lỗi server");
      }
    } catch (error) {
      console.log("Error fetching  ", error);
    }
  };

  // tao chi tiet giam gia
  const createChiTietGiamGia = async (tongTien, data) => {
    try {
      setLoadingGg(true);
      const res = await giamGiaApi.createChiTietGiamGia(tongTien, data);
      setLoadingGg(false);
      if (res.data.success) {
        showSuccessToast(res.data.message);
      } else {
        showErrorToast(res.data.message);
      }
    } catch (error) {
      console.log("Error fetching  ", error);
    }
  };

  const deleteChiTietGiamGia = async (maKh) => {
    try {
      setLoadingGg(true);
      const res = await giamGiaApi.deleteChiTietGiamGia(maKh);
      setLoadingGg(false);
      if (res.data.success) {
        showSuccessToast(res.data.message);
      } else {
        showErrorToast(res.data.message);
      }
    } catch (error) {
      console.log("Error fetching  ", error);
    }
  };

  return {
    createGiamGia,
    loadingGg,
    deleteGiamGia,
    createChiTietGiamGia,
    deleteChiTietGiamGia,
  };
}
