import * as request from "../../utils/request";

export const createNoiDung = async (maKh, data) => {
  try {
    const res = await request.post(`NoiDung/tao-noi-dung?maKh=${maKh}`, data);
    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getNoiDungChuong = async (maCh) => {
  try {
    const res = await request.get(`NoiDung/get-noi-dung-chuong?maCh=${maCh}`);
    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
