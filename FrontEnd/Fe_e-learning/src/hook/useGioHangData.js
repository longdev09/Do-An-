import { useEffect, useState } from "react";
import * as gioHangApi from "../services/api/gioHangApi";
import { useStore } from "../store";
import useCustomToast from "./useCustomToast";
export default function useGiangVienData() {
  const { state } = useStore();
  const { showSuccessToast, showErrorToast } = useCustomToast();
  const [loadingGh, setLoadingGh] = useState(false);

  const createGioHang = async (data) => {
    try {
      setLoadingGh(true);
      const res = await gioHangApi.createGioHang(data, state.tokenHv);
      setLoadingGh(false);
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

  return { loadingGh, createGioHang };
}
