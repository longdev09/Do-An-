import { useState, useEffect } from "react";
import * as danhMucApi from "../services/api/danhMucApi";
export default function useDanhMucData() {
  const [dsDm, setDsDm] = useState();
  const [loadingDm, setLoadingDm] = useState(true);

  const fetchApiDsDm = async () => {
    try {
      const res = await danhMucApi.getAllDanhMuc();
      setDsDm(res.data);
    } catch (error) {
      console.log("Error fetching danh muc ", error);
    } finally {
      setLoadingDm(false);
    }
  };

  useEffect(() => {
    fetchApiDsDm();
  }, []);

  return { dsDm, loadingDm };
}
