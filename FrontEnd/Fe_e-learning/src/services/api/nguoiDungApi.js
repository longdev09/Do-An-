import * as request from "../../utils/request";

export const loginNguoiDungGiangVien = async (data) => {
  try {
    const res = await request.post(
      `/NguoiDung/login-nguoi-dung-giang-vien`,
      data
    );
    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
export const loginNguoiDungHocVien = async (data) => {
  try {
    const res = await request.post(
      `/NguoiDung/login-nguoi-dung-hoc-vien`,
      data
    );
    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
