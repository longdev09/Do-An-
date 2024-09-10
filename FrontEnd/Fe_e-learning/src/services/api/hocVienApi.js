import * as request from "../../utils/request";
export const createHocVien = async (tenDn, matKhau, vaiTro, data) => {
  try {
    const res = await request.post(
      `/HocVien/tao-tai-khoan-hoc-vien?tenDn=${tenDn}&matKhau=${matKhau}&vaiTro=${vaiTro}`,
      data
    );
    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getHocVien = async (tokenHv) => {
  try {
    const res = await request.get(`/HocVien/lay-thong-tin-hoc-vien`, {
      headers: {
        Authorization: `Bearer ${tokenHv}`,
      },
    });
    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
