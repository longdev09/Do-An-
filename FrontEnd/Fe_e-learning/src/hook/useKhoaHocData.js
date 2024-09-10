import { useState, useEffect } from "react";
import * as khoaHocApi from "../services/api/khoaHocApi";
import useCustomToast from "./useCustomToast";
import { useStore } from "../store";
export default function useKhoaHocData(maKh) {
  // lay tokenGv
  const { state } = useStore();

  const [loadingKh, setLoadingKh] = useState(false);
  const [dsKhoaHocGv, setDsKhoaHocGv] = useState();

  const [dsKhoaHocRandDom, setDsKhoaHocRandDom] = useState();
  const [dsKhoaHocDanhGiaCao, setDsKhoaHocDanhGiaCao] = useState();

  const [detailKhoaHoc, setDetailKhoaHoc] = useState();

  const [thongTinKhoaHocGv, setThongTinKhoaHocGv] = useState();

  const { showSuccessToast, showErrorToast } = useCustomToast();

  const createKhoaHoc = async (data) => {
    try {
      setLoadingKh(true);
      const res = await khoaHocApi.createKhoaHoc(data, state.tokenGv);
      setLoadingKh(false);
      if (res.status === 201) {
        showSuccessToast("Tạo khóa học thành công");
        return res;
      } else {
        showErrorToast("Lỗi server");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getKhoaHocGiangVien = async () => {
    try {
      setLoadingKh(true);
      const res = await khoaHocApi.getKhoaHocGv(state.tokenGv);
      setDsKhoaHocGv(res.data);
      setLoadingKh(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getThongTinKhoaHocGiangVien = async () => {
    try {
      setLoadingKh(true);
      const res = await khoaHocApi.getThongTinKhoaHocGv(maKh, state.tokenGv);
      setThongTinKhoaHocGv(res.data);
      setLoadingKh(false);
    } catch (error) {
      console.log(error);
    }
  };

  // get khoa hoc cho trang home

  const getRandomDsKhoaHoc = async () => {
    try {
      setLoadingKh(true);
      const res = await khoaHocApi.getRandomDsKhoaHoc();
      setDsKhoaHocRandDom(res.data);
      setLoadingKh(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getKhoaHocDanhGiaCao = async () => {
    try {
      setLoadingKh(true);
      const res = await khoaHocApi.getKhoaHocDanhGiaCao();
      setDsKhoaHocDanhGiaCao(res.data);
      setLoadingKh(false);
    } catch (error) {
      console.log(error);
    }
  };
  // lay chi tiet khoa hoc

  const getDetailKhoaHoc = async () => {
    try {
      setLoadingKh(true);
      const res = await khoaHocApi.getDetailKhoaHoc(maKh);
      setDetailKhoaHoc(res.data);
      setLoadingKh(false);
    } catch (error) {
      console.log(error);
    }
  };

  const updateKhoaHoc = async (data) => {
    try {
      setLoadingKh(true);
      const res = await khoaHocApi.updateKhoaHoc(data, state.tokenGv);
      setLoadingKh(false);
      if (res.data.success === true) {
        showSuccessToast(res.data.message);
      } else {
        showErrorToast(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateGiaKhoaHoc = async (data) => {
    try {
      setLoadingKh(true);
      const res = await khoaHocApi.updateGiaKhoaHoc(data, state.tokenGv);
      setLoadingKh(false);
      if (res.data.success === true) {
        showSuccessToast(res.data.message);
      } else {
        showErrorToast(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateTrangThaiKhoaHoc = async (
    maKh,
    trangThai,
    messageSuccess,
    messageError
  ) => {
    try {
      setLoadingKh(true);
      const res = await khoaHocApi.updateTrangThai(maKh, trangThai);
      setLoadingKh(false);
      if (res.data.success === true) {
        showSuccessToast(messageSuccess);
      } else {
        showErrorToast(messageError);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getKhoaHocGiangVien();
    getRandomDsKhoaHoc();
    getKhoaHocDanhGiaCao();
    if (maKh) {
      getThongTinKhoaHocGiangVien();
      getDetailKhoaHoc();
    }
  }, []);

  return {
    loadingKh,
    createKhoaHoc,
    dsKhoaHocGv,
    dsKhoaHocRandDom,
    detailKhoaHoc,
    thongTinKhoaHocGv,
    updateKhoaHoc,
    updateGiaKhoaHoc,
    updateTrangThaiKhoaHoc,
    dsKhoaHocDanhGiaCao,
  };
}
