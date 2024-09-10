import * as request from "../../utils/request";

// thong ke giang vien

export const thongKeDoanhThuGiangVien = async (ngayBd, ngayKt, tokenGv) => {
  try {
    const res = await request.get(
      `ThongKe/thong-ke-doanh-thu-giang-vien?ngayBd=${ngayBd}&ngayKetThuc=${ngayKt}`,
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

export const thongKeDoanhThuGiangVienAll = async (tokenGv) => {
  try {
    const res = await request.get(`ThongKe/thong-ke-doanh-thu-giang-vien-all`, {
      headers: {
        Authorization: `Bearer ${tokenGv}`,
      },
    });
    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const thongKeLoiNhuanGiangVienAll = async (tokenGv) => {
  try {
    const res = await request.get(`ThongKe/thong-ke-loi-nhuan-giang-vien-all`, {
      headers: {
        Authorization: `Bearer ${tokenGv}`,
      },
    });
    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const thongKeLoiNhuan = async (ngayBd, ngayKt, tokenGv) => {
  try {
    const res = await request.get(
      `ThongKe/thong-ke-loi-nhuan-giang-vien?ngayBd=${ngayBd}&ngayKetThuc=${ngayKt}`,
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
