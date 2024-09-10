import * as request from "../../utils/request";

export const getAllDanhMuc = async () => {
  try {
    const res = await request.get(`/DanhMuc/get-all-danh-muc`);
    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
