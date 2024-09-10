import * as request from "../../utils/request";

export const layDsThanhToanGiangVien = async (tokenGv) => {
  try {
    const res = await request.get(
      `LichSuThanhToan/lay-danh-sach-thanh-toan-giang-vien`,
      {
        headers: {
          Authorization: `Bearer ${tokenGv}`,
        },
      }
    );
    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const layDsThanhToanAdmin = async (trangThai) => {
  try {
    const res = await request.get(
      `LichSuThanhToan/lay-danh-sach-thanh-toan?trangThai=${trangThai}`
    );
    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const taoThanhToanGiangVien = async (data, tokenGv) => {
  try {
    const res = await request.post(
      `LichSuThanhToan/tao-thanh-toan-giang-vien`,
      data,
      {
        headers: {
          Authorization: `Bearer ${tokenGv}`,
        },
      }
    );
    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
