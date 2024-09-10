import { Button, Table, Tag } from "antd";
import numeral from "numeral";
import classNames from "classnames/bind";
import style from "./CourseAdmin.module.scss";
import { NavLink } from "react-router-dom";
import routes from "../../config/routeConfig";
import { useEffect, useState } from "react";
import * as khoaHocApi from "../../services/api/khoaHocApi";
import { ToastContainer } from "react-toastify";
const cx = classNames.bind(style);

function TableCourseOnSale() {
  const [dsKhDangBan, setDsDangBan] = useState([]);
  const getKhDangBan = async () => {
    var res = await khoaHocApi.getAllKhoaHocAdmin("Đang bán");

    setDsDangBan(res.data.data);
  };

  useEffect(() => {
    getKhDangBan();
  }, []);

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
          return record.trangThai == "Đang bán" ? (
            <Tag
              style={{ opacity: "0.3", cursor: "not-allowed" }}
              color={"#1a8f7d"}
            >
              Áp dụng
            </Tag>
          ) : (
            <Tag color={"#1a8f7d"} style={{ cursor: "pointer" }}>
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
              <span style={{ color: "red", cursor: "pointer" }}></span>
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
          {record.trangThai == "Đang bán" ? (
            <Tag style={{ cursor: "pointer" }} color="#fa3f19">
              Khóa khóa học
            </Tag>
          ) : (
            <Tag
              style={{
                cursor: "pointer",
                opacity: "0.3",
                cursor: "not-allowed",
              }}
              color="#fa3f19"
            >
              Khóa khóa học
            </Tag>
          )}
        </>
      ),
    },
  ];
  return <Table columns={columns} dataSource={dsKhDangBan} />;
}

function TableCoursePending() {
  const [dsKh, setDsKh] = useState([]);
  const getKh = async () => {
    var res = await khoaHocApi.getAllKhoaHocAdmin("Đang chờ duyệt");

    setDsKh(res.data.data);
  };

  useEffect(() => {
    getKh();
  }, []);

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
          return record.trangThai == "Đang chờ duyệt" ? (
            <Tag
              style={{ opacity: "0.3", cursor: "not-allowed" }}
              color={"#1a8f7d"}
            >
              Áp dụng
            </Tag>
          ) : (
            <>
              <div>
                <span style={{ marginRight: "10px" }}>
                  {numeral(text).format("0,0")} đ
                </span>
                <span style={{ color: "red", cursor: "pointer" }}></span>
              </div>
            </>
          );
        }
      },
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <NavLink
          to={routes.admin_Preview_Course_Admin.replace(":makh", record.maKh)}
        >
          <Tag style={{ cursor: "pointer" }} color="#38aff1">
            Duyệt khóa học
          </Tag>
        </NavLink>
      ),
    },
  ];
  return <Table columns={columns} dataSource={dsKh} />;
}

export default function CourseAdmin() {
  const [showContent, setShowContent] = useState(1);

  const handlSetContent = (id) => {
    setShowContent(id);
  };
  const filter = [
    {
      id: 1,
      title: "KHOÁ HỌC ĐANG BÁN",
      content: <TableCourseOnSale />,
    },
    {
      id: 2,
      title: "KHÓA HỌC CHỜ DUYỆT",
      content: <TableCoursePending />,
    },
  ];

  return (
    <div className={cx("wrap")}>
      <ToastContainer />
      <div className={cx("heading")}>
        <h2>Quản Lý Khóa Học</h2>
      </div>
      <div className={cx("filter")}>
        <div className={cx("header")}>
          <ul className={cx("nav")}>
            {filter.map((item, index) => (
              <li
                className={cx("item-nav", {
                  active: item.id == showContent,
                })}
                key={index}
                onClick={() => handlSetContent(item.id)}
              >
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={cx("container")}>
        {showContent && (
          <div className={cx("content")}>
            {filter.find((item) => item.id === showContent).content}
          </div>
        )}
      </div>
    </div>
  );
}
