import * as request from "../../utils/request";

export const getGiamGia = async (tokenGv) => {
  try {
    const res = await request.get(`/GiamGia/lay-danh-sach-giam-gia`, {
      headers: {
        Authorization: `Bearer ${tokenGv}`,
      },
    });
    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const createGiamGia = async (data, tokenGv) => {
  try {
    const res = await request.post(`/GiamGia/tao-giam-gia`, data, {
      headers: {
        Authorization: `Bearer ${tokenGv}`,
      },
    });
    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const deleteGiamGia = async (maGg, tokenGv) => {
  try {
    const res = await request.del(`/GiamGia/xoa-giam-gia?maGg=${maGg}`, {
      headers: {
        Authorization: `Bearer ${tokenGv}`,
      },
    });
    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// tao chi tiet giam gia

export const createChiTietGiamGia = async (tongTien, data) => {
  try {
    const res = await request.post(
      `/ChiTietGiamGia/tao-chi-tiet-giam-gia?tongTien=${tongTien}`,
      data,
      {
        headers: {
          "Content-Type": "application/json", // Đặt Content-Type là application/json
        },
      }
    );
    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const deleteChiTietGiamGia = async (maKh) => {
  try {
    const res = await request.del(
      `/ChiTietGiamGia/xoa-chi-tiet-giam-gia?maKh=${maKh}`
    );
    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
