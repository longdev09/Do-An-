import {
  Button,
  Form,
  Input,
  Table,
  Typography,
  Select,
  Row,
  Col,
  Tag,
} from "antd";
import classNames from "classnames/bind";
import dayjs from "dayjs";
import numeral from "numeral";
import { useEffect, useState, useMemo } from "react";
import * as hoaDonMuaKhApi from "../../services/api/hoaDonMuaKhApi";
import * as thongTinThanhToan from "../../services/api/thongTinThanhToan";
import useCustomToast from "../../hook/useCustomToast";
import axios from "axios";
import * as thongKeApi from "../../services/api/thongKeApi";
import * as lichSuThanhToan from "../../services/api/lichSuThanhToan";

import { useStore } from "../../store";
import style from "./PayMento.module.scss";
import { ToastContainer } from "react-toastify";
import WithdrawModal from "../../component/Modal/WithdrawModal";
const cx = classNames.bind(style);

export default function PayMentor() {
  const [showContent, setShowContent] = useState(1);

  const { state } = useStore();
  const handlSetContent = (id) => {
    setShowContent(id);
  };
  const [tongDoanhThu, setTongDoanhThu] = useState(0);
  const [tongLoiNhuan, setTongLoiNhuan] = useState(0);
  const [thongTinTT, setThongTinTT] = useState({});
  const [dsNh, setDsNh] = useState();

  const [dsHd, setDsHd] = useState();
  const [dsLs, setDsLs] = useState();

  const { showSuccessToast, showErrorToast } = useCustomToast();
  // cac api
  const getThongKeDoanhThuGiangVien = async () => {
    const res = await thongKeApi.thongKeDoanhThuGiangVienAll(state.tokenGv);
    const ress = await thongKeApi.thongKeLoiNhuanGiangVienAll(state.tokenGv);
    const tt = await thongTinThanhToan.getthongTinThanhToan(state.tokenGv);
    const dataNganHang = await axios.get("https://api.vietqr.io/v2/banks");
    setDsNh(dataNganHang.data.data);
    setThongTinTT(tt.data.data);
    setTongDoanhThu(res.data.tongTien);
    setTongLoiNhuan(ress.data.tongLoiNhuan);
  };
  const getDsThanhToanGiangVien = async () => {
    var res = await lichSuThanhToan.layDsThanhToanGiangVien(state.tokenGv);
    setDsLs(res.data.data);
  };

  const getHdGiangVien = async () => {
    var res = await hoaDonMuaKhApi.getHdGiangVien(state.tokenGv);
    // get daoanh thu giang vien
    await setDsHd(res.data);
  };

  /***************************** */

  useEffect(() => {
    getThongKeDoanhThuGiangVien();
    getHdGiangVien();
    getDsThanhToanGiangVien();
  }, []);

  const [loadingSumbit, setLoadingSumbit] = useState(false);
  const handleSumbit = async (values) => {
    const splitText = values.tenNganHang.split(",");
    const formData = new FormData();
    formData.append("stk", values.stk);
    formData.append("nguoiThuHuong", values.nguoiThuHuong);
    formData.append("tenNganHang", splitText[0]);
    formData.append("logoNganHang", splitText[1]);
    var res = await thongTinThanhToan.createThongTinThanhToan(
      formData,
      state.tokenGv
    );
    if (res.data.data) {
      showSuccessToast(res.data.message);
    } else {
      showErrorToast(res.data.message);
    }
  };

  /// modal

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    getDsThanhToanGiangVien();
    getThongKeDoanhThuGiangVien();
  };

  const modalComponent = useMemo(() => {
    return isModalOpen ? (
      <WithdrawModal
        tongLoiNhuan={tongLoiNhuan}
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
      />
    ) : null;
  }, [isModalOpen]);

  const filter = [
    {
      id: 1,
      title: "LỊCH SỬ NHẬN TIỀN",
      content: <NhanTien dsHd={dsHd} />,
    },
    {
      id: 2,
      title: "LỊCH SỬ RÚT TIỀN",
      content: <RutTien dsLs={dsLs} />,
    },
  ];

  return (
    <div className={cx("wrap")}>
      <ToastContainer />
      <div className={cx("heading")}>
        {thongTinTT == null ? (
          <>
            <div className={cx("form-tt")}>
              <h2 style={{ marginBottom: "20px" }}>
                Thêm thông tin thanh toán
              </h2>
            </div>

            <Form onFinish={handleSumbit}>
              <Typography.Title level={5}>Số tài khoản</Typography.Title>
              <Form.Item
                name="stk"
                rules={[{ required: true, message: "Vui lòng nhập stk !" }]}
              >
                <Input
                  style={{ height: "45px" }}
                  className={cx("custom-input")}
                />
              </Form.Item>

              <Typography.Title level={5}>Tên người thủ hưởng</Typography.Title>
              <Form.Item
                name="nguoiThuHuong"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên người thủ hưởng !",
                  },
                ]}
              >
                <Input
                  style={{ height: "45px" }}
                  className={cx("custom-input")}
                />
              </Form.Item>

              <Typography.Title level={5}>Thông tin ngân hàng</Typography.Title>
              <Form.Item
                name="tenNganHang"
                rules={[
                  { required: true, message: "Vui lòng chọn tên ngân hàng !" },
                ]}
              >
                <Select
                  style={{ height: "45px" }}
                  className={cx("custom-select")}
                  showSearch
                  placeholder="Search to Select"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  options={
                    dsNh &&
                    dsNh.map((item) => ({
                      value: item.shortName + "," + item.logo,
                      label: item.shortName,
                    }))
                  }
                />
              </Form.Item>
              <Form.Item>
                <Row justify="center">
                  <Col>
                    <Button
                      loading={loadingSumbit}
                      type="primary"
                      htmlType="submit"
                      className={cx("btn-submit")}
                    >
                      Cập nhật ngân hàng
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
            </Form>
          </>
        ) : (
          <div className={cx("bank-card")}>
            <h2>Tài khoản thanh toán</h2>
            <div className={cx("card")}>
              <div className={cx("logo")}>
                <img src={thongTinTT.loGoNganHang} />
              </div>
              <div className={cx("text")}>
                <span>{thongTinTT.stk}</span>
                <span>{thongTinTT.nguoiThuHuong}</span>
              </div>
              <div className={cx("edit")}>
                <span>Chỉnh sửa</span>
              </div>
            </div>
          </div>
        )}

        <div className={cx("revenue")}>
          <h2>Lợi nhuận tạm tính</h2>
          <div className={cx("revenue-detail")}>
            <div className={cx("item")}>
              <span>Doanh Thu tạm tính</span>
              <h2>{numeral(tongDoanhThu).format("0,0")} đ</h2>
            </div>
            <div className={cx("item")}>
              <span>Lợi nhuận tạm tính</span>
              <h2>{numeral(tongLoiNhuan).format("0,0")} đ</h2>
              <Button
                onClick={showModal}
                style={{ marginTop: "10px" }}
                type="primary"
              >
                RÚT TIỀN
              </Button>
            </div>
          </div>
        </div>
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

function NhanTien({ dsHd }) {
  const columns = [
    { title: "Mã hóa đơn", dataIndex: "maHd", key: "maHd" },
    { title: "Tên học viên", dataIndex: "tenHv", key: "tenHv" },
    { title: "Tên khóa học", dataIndex: "tenKh", key: "tenKh" },
    {
      title: "Đơn giá",
      dataIndex: "donGia",
      key: "donGia",
      render: (text) => {
        return <>{numeral(text).format("0,0")} đ</>;
      },
    },
    {
      title: "Ngày mua",
      dataIndex: "ngayMua",
      key: "ngayMua",
      render: (text) => dayjs(text).format("DD/MM/YYYY"),
    },
    {
      title: "Lợi nhuận thu được",
      dataIndex: "loiNhuan",
      key: "loiNhuan",
      render: (text) => {
        return (
          <div style={{ color: "#0eba33", fontWeight: "700" }}>
            + {numeral(text).format("0,0")} đ
          </div>
        );
      },
    },
  ];

  return <Table columns={columns} dataSource={dsHd} />;
}

function RutTien({ dsLs }) {
  const columns = [
    { title: "Mã hóa đơn rút", dataIndex: "maLs", key: "maLs" },

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
  ];

  return <Table columns={columns} dataSource={dsLs} />;
}
