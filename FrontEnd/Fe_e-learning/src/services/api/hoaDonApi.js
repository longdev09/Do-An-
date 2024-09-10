import * as request from "../../utils/request";
export const createHoaDon = async (data, tokenHv) => {
  try {
    const res = await request.post(`/HoaDon/tao-hoa-don`, data, {
      headers: {
        Authorization: `Bearer ${tokenHv}`,
      },
    });
    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getHoaDonHv = async (tokenHv) => {
  try {
    const res = await request.get(`/HoaDon/lay-danh-sach-hoa-don-hoc-vien`, {
      headers: {
        Authorization: `Bearer ${tokenHv}`,
      },
    });
    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getHoaDonGv = async (tokenGv) => {
  try {
    const res = await request.get(`/HoaDon/lay-hoa-don-giang-vien`, {
      headers: {
        Authorization: `Bearer ${tokenGv}`,
      },
    });
    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getChiTietHoaDon = async (maHd) => {
  try {
    const res = await request.get(
      `/HoaDon/lay-danh-sach-chi-tiet-hoa-don?maHd=${maHd}`
    );
    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
