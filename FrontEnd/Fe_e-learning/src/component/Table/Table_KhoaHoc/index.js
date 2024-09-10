import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";

import { Button, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import AddDiscountCourse from "../../../component/Modal/Add_Discount_Course";
import Loading from "../../Loading";
import * as khoaHocApi from "../../../services/api/khoaHocApi";
import { useStore } from "../../../store";
import numeral from "numeral";
import useGiamGiaData from "../../../hook/useGiamGiaData";
// api

//
import { useMemo } from "react";
import routes from "../../../config/routeConfig";
import { ToastContainer } from "react-toastify";

export default function TableKhoaHoc() {
  const { state } = useStore();
  const [itemSelect, setItemSelect] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dsKhoaHoc, setDsKhoaHoc] = useState([]);
  const getKhoaHocGiangVien = async () => {
    try {
      setLoading(true);
      const res = await khoaHocApi.getKhoaHocGv(state.tokenGv);
      setDsKhoaHoc(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddDiscout = (maKh, tenKh, gia) => {
    setItemSelect({
      maKh,
      tenKh,
      gia,
    });
    setIsModalOpen(true);
  };

  const handleCancel = async () => {
    setIsModalOpen(false);
    getKhoaHocGiangVien();
  };

  useEffect(() => {
    getKhoaHocGiangVien();
  }, []);
  const modalComponent = useMemo(() => {
    return isModalOpen ? (
      <AddDiscountCourse
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        item={itemSelect}
      />
    ) : (
      ""
    );
  });
  const { deleteChiTietGiamGia } = useGiamGiaData();
  const handleXoaGiamGia = async (maKh) => {
    await deleteChiTietGiamGia(maKh);
    getKhoaHocGiangVien();
  };
  const columns = [
    { title: "Tên khóa học", dataIndex: "tenKh", key: "tenKh" },
    { title: "Danh mục", dataIndex: "tenDm", key: "tenDm" },
    {
      title: "Ảnh khóa học",
      dataIndex: "hinh",
      key: "hinh",
      render: (t) => <img style={{ width: "50px" }} src={t} />,
    },
    {
      title: "Giá gốc",
      dataIndex: "gia",
      key: "gia",
      render: (text) => {
        return <>{numeral(text).format("0,0")} đ</>;
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      key: "trangThai",
      render: (text) => {
        let color = "";
        if (text === "Bản nháp") {
          color = "volcano"; // Màu đỏ cho trạng thái 'BanNhap'
        } else if (text === "Đang chờ duyệt") {
          color = "green"; // Màu xanh cho trạng thái 'Duyet'
        } else if (text === "Đang bán") {
          color = "green"; // Màu xanh cho trạng thái 'Duyet'
        }

        return <Tag color={color}>{text}</Tag>;
      },
    },

    {
      title: "Giá giảm",
      dataIndex: "giaGiam",
      key: "giaGiam",
      render: (text, record) => {
        if (text === 0 || text === null) {
          return record.trangThai == "Bản nháp" ||
            record.trangThai == "Đang chờ duyệt" ||
            record.trangThai == "Ngừng bán" ? (
            <Tag
              style={{ opacity: "0.3", cursor: "not-allowed" }}
              color={"#1a8f7d"}
            >
              Áp dụng
            </Tag>
          ) : (
            <Tag
              onClick={() =>
                handleAddDiscout(record.maKh, record.tenKh, record.gia)
              }
              color={"#1a8f7d"}
              style={{ cursor: "pointer" }}
            >
              Áp dụng
            </Tag>
          );
        }
        return (
          <>
            <div>
              <span style={{ marginRight: "10px" }}>
                {numeral(text).format("0,0")} đ
              </span>
              <span
                style={{ color: "red", cursor: "pointer" }}
                onClick={() => handleXoaGiamGia(record.maKh)}
              >
                <FontAwesomeIcon icon={faDeleteLeft} />
              </span>
            </div>
          </>
        );
      },
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <>
          <Tag color="#38aff1">
            <a>Xem</a>
          </Tag>

          {record.trangThai == "Đang chờ duyệt" ? (
            <Tag
              style={{ opacity: "0.3", cursor: "not-allowed" }}
              color="#f4a62a"
            >
              Sửa
            </Tag>
          ) : (
            <Tag color="#f4a62a">
              <NavLink
                to={routes.mentor_Course_Create_Update.replace(
                  ":makh",
                  record.maKh
                )}
              >
                Sửa
              </NavLink>
            </Tag>
          )}

          {record.trangThai == "Bản nháp" ||
          record.trangThai == "Đang chờ duyệt" ? (
            <Tag
              style={{ opacity: "0.3", cursor: "not-allowed" }}
              color="#fa3f19"
            >
              Ngừng bán
            </Tag>
          ) : (
            <Tag color="#fa3f19">Ngừng bán</Tag>
          )}
        </>
      ),
    },
  ];
  return (
    <>
      <ToastContainer />
      {loading ? (
        <Loading />
      ) : (
        <Table dataSource={dsKhoaHoc} columns={columns} />
      )}

      {modalComponent}
    </>
  );
}
