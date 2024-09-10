import { useState, useEffect } from "react";
import * as nguoiDungApi from "../services/api/nguoiDungApi";
import useCustomToast from "./useCustomToast";

export default function useKhoaHocData() {
  const [loadingNg, setLoadingNg] = useState(false);
  const { showSuccessToast, showErrorToast } = useCustomToast();

  const loginNguoiDungGiangVien = async (data) => {
    try {
      setLoadingNg(true);
      const res = await nguoiDungApi.loginNguoiDungGiangVien(data);
      setLoadingNg(false);
      if (res.data.success == true) {
        return res.data.data;
      } else {
        showErrorToast("Tài khoản hoặc mật khẩu không đúng");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loginNguoiDungHocVien = async (data) => {
    try {
      setLoadingNg(true);
      const res = await nguoiDungApi.loginNguoiDungHocVien(data);
      setLoadingNg(false);
      if (res.data.success == true) {
        return res;
      } else {
        showErrorToast("Tài khoản hoặc mật khẩu không đúng");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { loadingNg, loginNguoiDungGiangVien, loginNguoiDungHocVien };
}
