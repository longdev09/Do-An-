import { useState, useEffect } from "react";
import * as danhGiaKhoaHocApi from "../services/api/danhGiaKhoaHocApi";
import useCustomToast from "./useCustomToast";
import { useStore } from "../store";
export default function useDanhGiaKhoaHocData() {
  const [loadingDg, setLoadingDg] = useState(false);
  const { showSuccessToast, showErrorToast } = useCustomToast();
  const { state } = useStore();

  const createDanhGia = async (data) => {
    try {
      setLoadingDg(true);
      const res = await danhGiaKhoaHocApi.createDanhGiaKhoaHoc(
        data,
        state.tokenHv
      );
      setLoadingDg(false);
      if (res.data.success) {
        showSuccessToast(res.data.message);
        return 1; // true
      } else {
        showErrorToast(res.data.message);
      }
    } catch (error) {
      console.log("Error fetching  ", error);
    }
  };

  return {
    createDanhGia,
    loadingDg,
  };
}
