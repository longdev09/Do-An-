import { Table, Modal } from "antd";
import numeral from "numeral";
import { useEffect, useState } from "react";
import * as hoaDonApi from "../../../services/api/hoaDonApi";
export default function ViewDetailBillModal({
  isModalOpen,
  handleCancel,
  maHd,
}) {
  const columns = [
    { title: "Mã khóa học", dataIndex: "maKh", key: "maKh" },
    {
      title: "Tên khóa học",
      dataIndex: "tenKh",
      key: "tenKh",
    },
    {
      title: "Hình",
      dataIndex: "hinh",
      key: "hinh",
      render: (text) => {
        return (
          <>
            <img src={text} style={{ width: "50px" }} />
          </>
        );
      },
    },

    {
      title: "Giá",
      dataIndex: "giaGoc",
      key: "giaGoc",
      render: (text) => {
        return <>{numeral(text).format("0,0")} đ</>;
      },
    },
    {
      title: "Giá mua khóa học",
      dataIndex: "giaMua",
      key: "giaMua",
      render: (text) => {
        return <>{numeral(text).format("0,0")} đ</>;
      },
    },
  ];
  const [dsCt, setDsCt] = useState([]);
  const getCtHd = async () => {
    var res = await hoaDonApi.getChiTietHoaDon(maHd);
    setDsCt(res.data.data);
  };

  useEffect(() => {
    getCtHd();
  }, []);
  return (
    <Modal
      title="Chi tiết hóa đơn"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      width={1000}
    >
      <Table columns={columns} dataSource={dsCt && dsCt} />
    </Modal>
  );
}
