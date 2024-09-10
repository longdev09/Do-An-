import * as request from "../../utils/request";

// lay danh sach randdom khoa hoc

export const getRandomDsKhoaHoc = async () => {
  try {
    const res = await request.get(`KhoaHoc/lay-ramdom-danh-sach-khoa-hoc`);
    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getKhoaHocDanhGiaCao = async () => {
  try {
    const res = await request.get(`KhoaHoc/lay-khoa-hoc-danh-gia-cao`);
    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getDetailKhoaHoc = async (maKh) => {
  try {
    const res = await request.get(`KhoaHoc/chi-tiet-khoa-hoc?maKh=${maKh}`);
    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// tao khoa hoc moi , danh cho giang vien
export const createKhoaHoc = async (data, tokenGv) => {
  try {
    const res = await request.post(`KhoaHoc/tao-khoa-hoc`, data, {
      headers: {
        Authorization: `Bearer ${tokenGv}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// lay cac khoa hoc cua giang vien
export const getKhoaHocGv = async (tokenGv) => {
  try {
    const res = await request.get(`KhoaHoc/lay-danh-sach-khoa-hoc-gv`, {
      headers: {
        Authorization: `Bearer ${tokenGv}`,
      },
    });
    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// lay cac khoa hoc cua giang vien
export const getThongTinKhoaHocGv = async (maKh, tokenGv) => {
  try {
    const res = await request.get(
      `KhoaHoc/lay-thong-tin-khoa-hoc-gv?maKh=${maKh}`,
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

// cap nhat khoa hoc
export const updateKhoaHoc = async (data, tokenGv) => {
  try {
    const res = await request.put(`KhoaHoc/update-khoa-hoc`, data, {
      headers: {
        Authorization: `Bearer ${tokenGv}`,
      },
    });
    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const updateGiaKhoaHoc = async (data, tokenGv) => {
  try {
    const res = await request.put(`KhoaHoc/update-gia-khoa-hoc`, data, {
      headers: {
        Authorization: `Bearer ${tokenGv}`,
      },
    });
    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// lay thong tin khoa hoc de hoc

export const getThongTinHocKhoaHoc = async (maKh, tokenHv) => {
  try {
    const res = await request.get(
      `KhoaHoc/lay-thong-tin-hoc-khoa-hoc?maKh=${maKh}`,
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

/// cap nhat trang thai
export const updateTrangThai = async (maKh, trangThai) => {
  try {
    const res = await request.put(
      `KhoaHoc/cap-nhat-trang-thai?maKh=${maKh}&trangThai=${trangThai}`
    );
    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// admin
export const getAllKhoaHocAdmin = async (trangThai) => {
  try {
    const res = await request.get(
      `KhoaHoc/lay-danh-sach-khoa-hoc-admin?trangThai=${trangThai}`
    );
    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getAllKhoaHocDanhMuc = async (maDanhMuc) => {
  try {
    const res = await request.get(
      `KhoaHoc/lay-danh-sach-khoa-hoc-theo-danh-muc?maDanhMuc=${maDanhMuc}`
    );
    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
