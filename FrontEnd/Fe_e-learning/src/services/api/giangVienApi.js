import * as request from "../../utils/request";

// api tao giang vien
export const createGiangVien = async (data) => {
  try {
    const res = await request.post(`/GiangVien/tao-giang-vien`, data);
    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getThongTinGiangVien = async (tokenGv) => {
  try {
    const res = await request.get(`GiangVien/lay-thong-tin-giang-vien`, {
      headers: {
        Authorization: `Bearer ${tokenGv}`,
      },
    });

    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getDanhSachTaiKhoanGvChuaDuyet = async () => {
  try {
    const res = await request.get(
      `GiangVien/lay-danh-sach-tai-khoan-gv-chua-duyet`
    );
    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getDanhSachTaiKhoanGvDaDuyet = async () => {
  try {
    const res = await request.get(
      `GiangVien/lay-danh-sach-tai-khoan-gv-da-duyet`
    );
    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// cap nhat duyet nguoi dung giang vien
export const updateDuyetGiangVien = async (maNg, trangThai) => {
  try {
    const res = await request.put(
      `GiangVien/duyet-giang-vien?maNg=${maNg}&trangThai=${trangThai}`
    );
    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
