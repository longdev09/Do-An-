import * as request from "../../utils/request";

export const createTracNghiem = async (data) => {
  try {
    const res = await request.post(`TracNghiem/tao-trac-nghiem`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getTracNghiem = async (maNd) => {
  try {
    const res = await request.get(`TracNghiem/lay-trac-nghiem?maNd=${maNd}`);
    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
