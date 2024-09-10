import * as request from "../../utils/request";

export const createChuongKhoaHoc = async (data) => {
  try {
    const res = await request.post(`/ChuongKhoaHoc/tao-chuong`, data);
    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getChuongMaKh = async (makh) => {
  try {
    const res = await request.get(
      `/ChuongKhoaHoc/lay-danh-sach-chuong-theo-ma-khoa-hoc?maKh=${makh}`
    );
    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const updateChuong = async (data) => {
  try {
    const res = await request.put(`/ChuongKhoaHoc/cap-nhat-chuong`, data);
    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const deleteChuong = async (maCh) => {
  try {
    const res = await request.del(`/ChuongKhoaHoc/xoa-chuong?maCh=${maCh}`);
    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
