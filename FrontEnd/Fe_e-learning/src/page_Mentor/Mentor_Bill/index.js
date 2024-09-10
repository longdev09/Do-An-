import { Table, Tag } from "antd";
import classNames from "classnames/bind";
import dayjs from "dayjs";
import numeral from "numeral";
import { useEffect, useMemo, useState } from "react";
import ViewDetailBillModal from "../../component/Modal/View_DetailBillModal";
import * as hoaDonApi from "../../services/api/hoaDonApi";
import { useStore } from "../../store";
import style from "./MentorBill.module.scss";
const cx = classNames.bind(style);
export default function Mentor_Bill() {
  const { state } = useStore();
  const [dsHd, setDsHd] = useState([]);

  const getDsHd = async () => {
    const res = await hoaDonApi.getHoaDonGv(state.tokenGv);

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
    { title: "Tên học viên", dataIndex: "tenHv", key: "tenHv" },
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
      render: (text) => dayjs(text).format("DD/MM/YYYY HH:mm:ss"),
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
    <div className={cx("wrap")}>
      <div className={cx("heading")}>
        <h2>Hóa đơn mua khóa học</h2>
      </div>
      <div className={cx("container")}>
        <Table columns={columns} dataSource={dsHd && dsHd} />
      </div>
      {modalComponent}
    </div>
  );
}
