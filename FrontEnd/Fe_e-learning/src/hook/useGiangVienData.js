import { useEffect, useState } from "react";
import * as giangVienApi from "../services/api/giangVienApi";
import useCustomToast from "./useCustomToast";
import { useStore } from "../store";
export default function useGiangVienData() {
  const { state } = useStore();
  console.log(state);
  const { showSuccessToast, showErrorToast } = useCustomToast();
  const [loadingGv, setLoadingGv] = useState(false);
  const [thongTinGv, setThongTinGv] = useState();

  // tao tai khoan giang vien
  const createGiangVien = async (data) => {
    try {
      setLoadingGv(true);
      const res = await giangVienApi.createGiangVien(data);
      setLoadingGv(false);
      if (res.data.success) {
        showSuccessToast(res.data.message);
      } else {
        showErrorToast(res.data.message);
      }
    } catch (error) {
      console.log("Error fetching  ", error);
    }
  };

  const getThongTinGiangVien = async () => {
    try {
      setLoadingGv(true);
      const res = await giangVienApi.getThongTinGiangVien(state.tokenGv);
      setLoadingGv(false);
      setThongTinGv(res.data);
      return res;
    } catch (error) {
      console.log("Error fetching  ", error);
    }
  };

  const updateTrangThaiGiangVien = async (maNg, trangThai) => {
    try {
      setLoadingGv(true);
      const res = await giangVienApi.updateDuyetGiangVien(maNg, trangThai);
      setLoadingGv(false);
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
    getThongTinGiangVien();
  }, []);

  return { createGiangVien, loadingGv, thongTinGv, updateTrangThaiGiangVien };
}
