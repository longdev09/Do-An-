import { useState } from "react";
import * as tracNghiemApi from "../services/api/tracNghiemApi";
import useCustomToast from "./useCustomToast";
export default function useTracNghiemData() {
  const { showSuccessToast, showErrorToast } = useCustomToast();
  const [loadingTrn, setLoadingTrn] = useState(false);

  const createTracNghiem = async (data) => {
    try {
      setLoadingTrn(true);
      const res = await tracNghiemApi.createTracNghiem(data);
      setLoadingTrn(false);
      if (res.data.success) {
        showSuccessToast(res.data.message);
      } else {
        showErrorToast(res.data.message);
      }
    } catch (error) {
      console.log("Error fetching  ", error);
    }
  };

  return { loadingTrn, createTracNghiem };
}
