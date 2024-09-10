import * as request from "../../utils/request";

export const createVideo = async (maKh, data, tokenGv) => {
  try {
    const res = await request.post(`Video/tao-video?maKh=${maKh}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${tokenGv}`,
      },
    });
    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getVideoMaNd = async (maNd) => {
  try {
    const res = await request.get(
      `Video/lay-video-theo-ma-noi-dung?maNd=${maNd}`
    );
    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
