import { Table, Tag } from "antd";
import classNames from "classnames/bind";
import numeral from "numeral";
import { useEffect, useMemo, useState } from "react";
import ViewDetailBillModal from "../../component/Modal/View_DetailBillModal";
import * as hoaDonApi from "../../services/api/hoaDonApi";
import { useStore } from "../../store";
import style from "./DetailBill.module.scss";
const cx = classNames.bind(style);

export default function DetailBill() {
  const [showContent, setShowContent] = useState(1);

  const handlSetContent = (id) => {
    setShowContent(id);
  };
  const menu = [
    {
      id: 1,
      title: "Hóa đơn mua",
      content: <Bill />,
    },
    {
      id: 2,
      title: "Hoàn tiền",
      content: <Refund />,
    },
  ];

  return (
    <div className={cx("wrap")}>
      <div className={cx("heading")}>
        <h1>Lịch sử mua</h1>
      </div>
      <div className={cx("container")}>
        <div className={cx("menu")}>
          <ul className={cx("nav")}>
            {menu.map((item, index) => (
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

      {showContent && (
        <div className={cx("content")}>
          {menu.find((item) => item.id === showContent).content}
        </div>
      )}
    </div>
  );
}

function Bill() {
  const { state } = useStore();
  const [dsHd, setDsHd] = useState([]);

  const getDsHd = async () => {
    const res = await hoaDonApi.getHoaDonHv(state.tokenHv);
    setDsHd(res.data.data);
  };
  useEffect(() => {
    getDsHd();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [maHd, setMaHd] = useState();

  const showModal = (maHd) => {
    setMaHd(maHd);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const modalComponent = useMemo(() => {
    return isModalOpen ? (
      <ViewDetailBillModal
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        maHd={maHd}
      />
    ) : null;
  }, [isModalOpen]);

  const columns = [
    { title: "Mã hóa đơn", dataIndex: "maHd", key: "maHd" },
    {
      title: "Tổng tiền",
      dataIndex: "tongTien",
      key: "tongTien",
      render: (text) => {
        return <>{numeral(text).format("0,0")} đ</>;
      },
    },
    {
      title: "Ngày mua",
      dataIndex: "ngayMua",
      key: "ngayMua",
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <Tag
          onClick={() => showModal(record.maHd)}
          style={{ cursor: "pointer" }}
          color="rgb(56, 175, 241)"
        >
          Xem chi tiết
        </Tag>
      ),
    },
  ];

  return (
    <>
      <div className={cx("bill")}>
        <Table columns={columns} dataSource={dsHd && dsHd} />
      </div>
      {modalComponent}
    </>
  );
}

function Refund() {
  return <div>Đang cập nhật</div>;
}
