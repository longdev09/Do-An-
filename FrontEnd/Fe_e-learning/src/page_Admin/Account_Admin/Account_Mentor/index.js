import { Button, Image, Table, Tag } from "antd";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import useGiangVienData from "../../../hook/useGiangVienData";
import * as giangVienApi from "../../../services/api/giangVienApi";
import style from "./AccountMentor.module.scss";
import Loading from "../../../component/Loading";
import { ToastContainer } from "react-toastify";
const cx = classNames.bind(style);

export default function AccountMentor() {
  const filter = [
    {
      id: 1,
      title: "TÀI KHOẢN CHỜ DUYỆT",
      content: <TableChoDuyet />,
    },
    {
      id: 2,
      title: "TÀI KHOẢN ĐÃ DUYỆT",
      content: <TableDaDuyet />,
    },
  ];

  const [showContent, setShowContent] = useState(1);

  const handlSetContent = (id) => {
    setShowContent(id);
  };

  return (
    <div className={cx("wrap")}>
      <div className={cx("heading")}>
        <h2>Tài Khoản Giảng Viên</h2>
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

function TableChoDuyet() {
  const [dsGv, setDsGv] = useState([]);
  const { loadingGv, updateTrangThaiGiangVien } = useGiangVienData();
  const [loading, setLoading] = useState(false);
  const getDsGv = async () => {
    setLoading(true);
    var res = await giangVienApi.getDanhSachTaiKhoanGvChuaDuyet();
    setDsGv(res.data.data);
    setLoading(false);
  };

  useEffect(() => {
    getDsGv();
  }, []);

  // cap nhat trang thai giang vien

  const handleDuyetTaiKhoan = async (maNg) => {
    await updateTrangThaiGiangVien(maNg, "Đã duyệt");
    getDsGv();
  };

  const columns = [
    { title: "Mã giảng viên", dataIndex: "maGv", key: "maGv" },
    { title: "Tên giảng viên", dataIndex: "tenGv", key: "tenGv" },
    {
      title: "Ngày Sinh",
      dataIndex: "ngaySinh",
      key: "ngaySinh",
    },
    {
      title: "Số điện thoại",
      dataIndex: "sdt",
      key: "sdt",
    },
    {
      title: "Ảnh đại diện",
      dataIndex: "anh",
      key: "anh",
      render: (text) => {
        return <Image width={50} src={text} />;
      },
    },

    {
      title: "Cccd mặt trước",
      dataIndex: "macTrc",
      key: "macTrc",
      render: (text) => {
        return <Image width={50} src={text} />;
      },
    },
    {
      title: "Cccd mặt sau",
      dataIndex: "macSau",
      key: "macSau",
      render: (text) => {
        return <Image width={50} src={text} />;
      },
    },
    {
      title: "Lĩnh vực giảng dạy",
      dataIndex: "linhVuc",
      key: "linhVuc",
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      key: "trangThai",
      render: (text) => {
        return <Tag>{text}</Tag>;
      },
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Button
          type="primary"
          loading={loadingGv}
          style={{ cursor: "pointer" }}
          color="#38aff1"
          onClick={() => handleDuyetTaiKhoan(record.maNg)}
        >
          Duyệt tài khoản
        </Button>
      ),
    },
  ];

  return (
    <>
      <ToastContainer />

      {loading ? <Loading /> : <Table columns={columns} dataSource={dsGv} />}
    </>
  );
}

function TableDaDuyet() {
  const [dsGv, setDsGv] = useState([]);
  const { loadingGv, updateTrangThaiGiangVien } = useGiangVienData();
  const [loading, setLoading] = useState(false);

  const getDsGv = async () => {
    setLoading(true);
    var res = await giangVienApi.getDanhSachTaiKhoanGvDaDuyet();
    setDsGv(res.data.data);
    setLoading(false);
  };

  useEffect(() => {
    getDsGv();
  }, []);

  // cap nhat trang thai giang vien

  const handleDuyetTaiKhoan = async (maNg) => {
    await updateTrangThaiGiangVien(maNg, "Khóa tài khoản");
    getDsGv();
  };

  const columns = [
    { title: "Mã giảng viên", dataIndex: "maGv", key: "maGv" },
    { title: "Tên giảng viên", dataIndex: "tenGv", key: "tenGv" },
    {
      title: "Ngày Sinh",
      dataIndex: "ngaySinh",
      key: "ngaySinh",
    },
    {
      title: "Số điện thoại",
      dataIndex: "sdt",
      key: "sdt",
    },
    {
      title: "Ảnh đại diện",
      dataIndex: "anh",
      key: "anh",
      render: (text) => {
        return <Image width={50} src={text} />;
      },
    },

    {
      title: "Cccd mặt trước",
      dataIndex: "macTrc",
      key: "macTrc",
      render: (text) => {
        return <Image width={50} src={text} />;
      },
    },
    {
      title: "Cccd mặt sau",
      dataIndex: "macSau",
      key: "macSau",
      render: (text) => {
        return <Image width={50} src={text} />;
      },
    },
    {
      title: "Lĩnh vực giảng dạy",
      dataIndex: "linhVuc",
      key: "linhVuc",
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      key: "trangThai",
      render: (text) => {
        return <Tag>{text}</Tag>;
      },
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Button
          type="primary"
          loading={loadingGv}
          style={{ cursor: "pointer" }}
          color="#38aff1"
          onClick={() => handleDuyetTaiKhoan(record.maNg)}
        >
          Khóa tài khoản
        </Button>
      ),
    },
  ];

  return (
    <>
      <ToastContainer />

      {loading ? <Loading /> : <Table columns={columns} dataSource={dsGv} />}
    </>
  );
}
