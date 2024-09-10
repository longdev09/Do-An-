import * as request from "../../utils/request";

export const createDanhGiaKhoaHoc = async (data, tokenHv) => {
  try {
    const res = await request.post(
      `/DanhGiaKhoaHoc/tao-danh-gia-khoa-hoc`,
      data,
      {
        headers: {
          Authorization: `Bearer ${tokenHv}`,
        },
      }
    );
    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getDanhGiaGiangVien = async (tokenGv) => {
  try {
    const res = await request.get(
      `/DanhGiaKhoaHoc/lay-danh-sach-danh-gia-giang-vien`,
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
