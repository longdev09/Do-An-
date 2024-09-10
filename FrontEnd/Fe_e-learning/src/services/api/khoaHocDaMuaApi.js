import * as request from "../../utils/request";

export const getKhoaHocDaMua = async (tokenHv) => {
  try {
    const res = await request.get(`KhoaHocDaMua/lay-khoa-hoa-da-mua`, {
      headers: {
        Authorization: `Bearer ${tokenHv}`,
      },
    });
    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getTienDoHocTap = async (tokenHv, maKh) => {
  try {
    const res = await request.get(
      `KhoaHocDaMua/lay-tien-do-hoc-tap?maKh=${maKh}`,
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

export const updateTienDoHocTap = async (maKh, tienDo, tokenHv) => {
  try {
    const res = await request.put(
      `KhoaHocDaMua/cap-nhat-tien-do-hoc-tap?maKh=${maKh}&tienDo=${tienDo}`,
      {},
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
