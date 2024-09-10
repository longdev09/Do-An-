import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as hocVienApi from "../services/api/hocVienApi";
import useCustomToast from "./useCustomToast";
export default function useHocVienData() {
  let navigate = useNavigate();
  const { showSuccessToast, showErrorToast } = useCustomToast();
  const [loadingHv, setLoadingHv] = useState(false);
  const createHocVien = async (tenDn, matKhau, vaiTro, data) => {
    try {
      setLoadingHv(true);
      const res = await hocVienApi.createHocVien(tenDn, matKhau, vaiTro, data);
      setLoadingHv(false);
      if (res.data.success) {
        showSuccessToast(res.data.message);
        navigate("/user/login");
      } else {
        showErrorToast(res.data.message);
      }
    } catch (error) {
      console.log("Error fetching  ", error);
    }
  };
  return { loadingHv, createHocVien };
}
