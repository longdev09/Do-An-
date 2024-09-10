import axios from "axios";

const request = axios.create({
  baseURL: `https://localhost:44309/api`,
});

export const get = async (api, options = {}) => {
  const res = await request.get(api, options);
  return res;
};

export const post = async (api, data, option = {}) => {
  const res = await request.post(api, data, option);
  return res;
};

export const put = async (api, data, option = {}) => {
  const res = await request.put(api, data, option);
  return res;
};

export const del = async (api, option = {}) => {
  const res = await request.delete(api, option);
  return res;
};

export default request;
