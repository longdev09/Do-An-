import { Button, Table, Tag } from "antd";
import classNames from "classnames/bind";
import dayjs from "dayjs";
import numeral from "numeral";
import { useEffect, useState, useMemo } from "react";
import style from "./PayAdmin.module.scss";
import * as lichSuThanhToan from "../../services/api/lichSuThanhToan";
import * as thongTinThanhToan from "../../services/api/thongTinThanhToan";

import PayModalAdmin from "../../component/Modal/PayModalAdmin";
const cx = classNames.bind(style);
export default function PayAdmin() {
  const [showContent, setShowContent] = useState(1);

  const handlSetContent = (id) => {
    setShowContent(id);
  };
  const [tongTien, setTongTien] = useState(0);
  const [soNg, setSoNg] = useState(0);
  const [dsChuaThanhToan, setDsChuaThanhToan] = useState();
  const getLsThanhToanChoSuLy = async () => {
    const uniqueMaGv = {};

    var res = await lichSuThanhToan.layDsThanhToanAdmin("Đang chờ xử lý");

    setTongTien(res.data.data.reduce((sum, item) => sum + item.donGiaRut, 0));

    res.data.data.forEach((item) => {
      const { maGv } = item;
      uniqueMaGv[maGv] = true;
    });

    setSoNg(Object.keys(uniqueMaGv).length);

    setDsChuaThanhToan(res.data.data);
  };
  useEffect(() => {
    getLsThanhToanChoSuLy();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // xu ly thanh toan
  const [infoNganHang, setInfoNganHang] = useState();
  const [donGiaRut, setDonGiaRut] = useState();

  const handleThanhToan = async (maGv, donGiaRut) => {
    var res = await thongTinThanhToan.getthongTinThanhToanAdmin(maGv);
    setInfoNganHang(res.data.data);
    setDonGiaRut(donGiaRut);
    setIsModalOpen(true);
  };

  const modalComponent = useMemo(() => {
    return isModalOpen ? (
      <PayModalAdmin
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        item={infoNganHang}
        donGia={donGiaRut}
      />
    ) : null;
  }, [isModalOpen]);

  const filter = [
    {
      id: 1,
      title: "CHỜ THANH TOÁN",
      content: (
        <ChoThanhToan
          dsChuaThanhToan={dsChuaThanhToan}
          handleThanhToan={handleThanhToan}
        />
      ),
    },
    {
      id: 2,
      title: "ĐÃ THANH TOÁN",
      content: <DaThanhToan />,
    },
  ];

  return (
    <div className={cx("wrap")}>
      <div className={cx("heading")}>
        <h2>Thanh toán </h2>
      </div>
      <div className={cx("list-card")}>
        <ItemCart item={tongTien} title={"Tổng số tiền cần thanh toán (VND)"} />
        <ItemCart item={soNg} title={"Tổng số người cần thanh toán"} />
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

      {modalComponent}
    </div>
  );
}

function ItemCart({ item, title }) {
  return (
    <div className={cx("item-card")}>
      <div className={cx("card-title")}>
        <h2>{title}</h2>
        <span>{numeral(item).format("0,0")}</span>
      </div>
      {/* <div className={cx("icon")}>
        <FontAwesomeIcon icon={faMoneyBill1Wave} style={{ color: "#0072ff" }} />
      </div> */}
    </div>
  );
}

function ChoThanhToan({ dsChuaThanhToan, handleThanhToan }) {
  const columns = [
    { title: "Mã hóa đơn rút", dataIndex: "maLs", key: "maLs" },
    { title: "Mã giảng viên", dataIndex: "maGv", key: "maGv" },
    { title: "Tên giảng viên", dataIndex: "tenGv", key: "tenGv" },
    {
      title: "Tổng rút",
      dataIndex: "donGiaRut",
      key: "donGiaRut",
      render: (text) => {
        return (
          <div style={{ color: "red", fontWeight: "700" }}>
            - {numeral(text).format("0,0")} đ
          </div>
        );
      },
    },
    {
      title: "Ngày rút",
      dataIndex: "ngayRut",
      key: "ngayRut",
      render: (text) => dayjs(text).format("DD/MM/YYYY"),
    },
    {
      title: "Ngày rút",
      dataIndex: "ngayThanhToan",
      key: "ngayThanhToan",
      render: (text) => dayjs(text).format("DD/MM/YYYY"),
    },

    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      key: "trangThai",
      render: (text) => {
        let color = "";
        if (text === "Đang chờ xử lý") {
          color = "volcano"; // Màu đỏ cho trạng thái 'BanNhap'
        } else if (text === "Thanh toán thành công") {
          color = "green"; // Màu xanh cho trạng thái 'Duyet'
        } else if (text === "Thanh toán thất bại") {
          color = "yellow"; // Màu xanh cho trạng thái 'Duyet'
        }

        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: "Action",
      dataIndex: "ngayThanhToan",
      key: "ngayThanhToan",
      render: (text, _res) => (
        <Button onClick={() => handleThanhToan(_res.maGv, _res.donGiaRut)}>
          Thanh toán
        </Button>
      ),
    },
  ];
  return <Table columns={columns} dataSource={dsChuaThanhToan} />;
}
function DaThanhToan() {
  return <div>Đã thanh toán</div>;
}
