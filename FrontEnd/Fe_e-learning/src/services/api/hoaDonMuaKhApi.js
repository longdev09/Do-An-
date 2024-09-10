import * as request from "../../utils/request";
export const getHdGiangVien = async (tokenHv) => {
  try {
    const res = await request.get(
      `HoaDonBanKh/lay-danh-sach-hoa-don-mua-giang-vien`,
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
