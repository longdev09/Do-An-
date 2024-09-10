import * as request from "../../utils/request";
export const createGioHang = async (data, tokenHv) => {
  try {
    const res = await request.post(`GioHang/tao-gio-hang`, data, {
      headers: {
        Authorization: `Bearer ${tokenHv}`,
      },
    });

    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getGioHangHocVien = async (tokenHv) => {
  try {
    const res = await request.get(
      `GioHang/lay-danh-sach-gio-hang-ma-hoc-vien`,
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

export const deleteGioHang = async (maKh, tokenHv) => {
  try {
    const res = await request.del(`GioHang/xoa-khoa-hoc-gio?maKh=${maKh}`, {
      headers: {
        Authorization: `Bearer ${tokenHv}`,
      },
    });

    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
