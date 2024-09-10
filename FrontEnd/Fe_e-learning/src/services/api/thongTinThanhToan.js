import * as request from "../../utils/request";

export const getthongTinThanhToan = async (tokenGv) => {
  try {
    const res = await request.get(
      `ThongTinThanhToan/lay-thong-tin-thanh-toan-giang-vien`,
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

export const getthongTinThanhToanAdmin = async (maGv) => {
  try {
    const res = await request.get(
      `ThongTinThanhToan/lay-thong-tin-thanh-toan-giang-vien-admin?maGv=${maGv}`
    );
    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const createThongTinThanhToan = async (data, tokenGv) => {
  try {
    const res = await request.post(
      `ThongTinThanhToan/tao-thong-tin-thanh-toan`,
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
