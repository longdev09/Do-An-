import classNames from "classnames/bind";
import style from "./Discount.module.scss";
import { Button, Table, Tag, Popconfirm } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useStore } from "../../store";
import * as giamGiaApi from "../../services/api/giamGiaApi";
import Loading from "../../component/Loading";
import AddDiscount from "../../component/Modal/Add_Discount";
import { ToastContainer } from "react-toastify";
import useGiamGiaData from "../../hook/useGiamGiaData";
import dayjs from "dayjs";

const cx = classNames.bind(style);

export default function Discount() {
  const { state } = useStore();
  const [dsGiamGia, setDsGiamGia] = useState([]);
  const [loading, setLoading] = useState(false);

  const { loadingGg, deleteGiamGia } = useGiamGiaData();
  const getDs = async () => {
    try {
      setLoading(true);
      var res = await giamGiaApi.getGiamGia(state.tokenGv);
      setDsGiamGia(res.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDs();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCancel = () => {
    setIsModalOpen(false);
    getDs();
  };

  const handleModal = async () => {
    setIsModalOpen(true);
    getDs();
  };

  const modalComponent = useMemo(() => {
    return isModalOpen ? (
      <AddDiscount isModalOpen={isModalOpen} handleCancel={handleCancel} />
    ) : null;
  }, [isModalOpen]);

  // xoa giam gia
  const handleDelete = async (maGg) => {
    await deleteGiamGia(maGg);
    getDs();
  };

  const columns = [
    {
      title: "Mã giảm giá",
      dataIndex: "maGg",

      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.name.includes(value),
      width: "30%",
    },
    {
      title: "Phần trăm giảm",
      dataIndex: "phanTramGiam",
      sorter: (a, b) => a.phanTramGiam - b.phanTramGiam,
    },
    {
      title: "Ghi chú",
      dataIndex: "ghiChu",
    },
    {
      title: "Ngày tạo",
      dataIndex: "ngayTao",
      render: (text) => dayjs(text).format("DD/MM/YYYY HH:mm:ss"),
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <>
          <Popconfirm
            title="Xóa giảm giá"
            description="Bạn có chắc chắn xóa giảm giá này không?"
            onConfirm={() => handleDelete(record.maGg)}
            // onCancel={cancel}
            okText="Có"
            cancelText="Không"
            okButtonProps={{ loading: loadingGg }}
          >
            <Tag color="#fa3f19">
              <a>Delete</a>
            </Tag>
          </Popconfirm>
        </>
      ),
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <div className={cx("wrap")}>
      <ToastContainer />
      <div className={cx("heading")}>
        <h2>Giảm Giá</h2>
        <div className={cx("btn")}>
          <Button
            onClick={handleModal}
            style={{ height: "45px", fontSize: "15px" }}
            type="primary"
          >
            Tạo mã giảm giá
          </Button>
        </div>
      </div>

      <div className={cx("table")}>
        {loading ? (
          <Loading />
        ) : (
          <Table columns={columns} dataSource={dsGiamGia} onChange={onChange} />
        )}
      </div>
      {modalComponent}
    </div>
  );
}
