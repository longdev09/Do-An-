import { faMoneyBill1Wave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, DatePicker } from "antd";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import classNames from "classnames/bind";
import moment from "moment";
import numeral from "numeral";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import * as thongKeApi from "../../services/api/thongKeApi";
import { useStore } from "../../store";
import style from "./DashboardMentor.module.scss";
const cx = classNames.bind(style);
const { RangePicker } = DatePicker;
// Đăng ký các thành phần của Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function ItemCart({ item, title }) {
  return (
    <div className={cx("item-card")}>
      <div className={cx("card-title")}>
        <h2>{title}</h2>
        <span>{numeral(item).format("0,0")} đ</span>
      </div>
      <div className={cx("icon")}>
        <FontAwesomeIcon icon={faMoneyBill1Wave} style={{ color: "#0072ff" }} />
      </div>
    </div>
  );
}

// Dữ liệu cho biểu đồ cột
const dataBarChart = {
  labels: ["Course 1", "Course 2", "Course 3", "Course 4", "Course 5"],
  datasets: [
    {
      label: "Số lượt mua",
      data: [12, 19, 3, 5, 2],
      backgroundColor: [
        "rgba(255, 0, 0, 0.5)",
        "rgba(0, 0, 255, 0.5)",
        "rgba(255, 255, 0, 0.5)",
        "rgba(0, 255, 0, 0.5)",
        "rgba(128, 0, 128, 0.5)",
        "rgba(255, 165, 0, 0.5)",
        "rgba(0, 255, 255, 0.5)",
        "rgba(255, 0, 255, 0.5)",
        "rgba(165, 42, 42, 0.5)",
        "rgba(128, 128, 128, 0.5)",
      ],
      borderColor: [
        "red",
        "blue",
        "yellow",
        "green",
        "purple",
        "orange",
        "cyan",
        "magenta",
        "brown",
        "gray",
      ],
      borderWidth: 1,
    },
  ],
};

///*****************************************/
const optionsLoiNhuan = {
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right",
    },
    title: {
      display: true,
      text: "Biểu đồ thanh ngang với hai cột",
    },
  },
  scales: {
    x: {
      ticks: {
        callback: function (value) {
          return value.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          });
        },
      },
    },
  },
};

const dataLoiNhuans = {
  labels: ["Lập trình"],
  datasets: [
    {
      label: "Lợi nhuận",
      data: [3, 19, 3, 5, 2, 3, 9, 6, 7],
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
    },
    {
      label: "Tổng tiền",
      data: [1, 9, 3, 7, 8, 3, 2, 6, 4],
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 1,
    },
  ],
};

///*****************************************/

export default function DashboardMentor() {
  const { state } = useStore();
  // Tính toán ngày bắt đầu và ngày kết thúc của tháng hiện tại
  const startOfMonth = moment().startOf("month");
  const endOfMonth = moment().endOf("month");

  // State để lưu trữ giá trị của RangePicker
  const [range, setRange] = useState();

  // data du lieu

  const [tongDoanhThu, setTongDoanhThu] = useState(0);
  const [dataLoiNhuan, setDataLoiNhuan] = useState();

  // Hàm xử lý khi thay đổi giá trị của RangePicker
  const onChange = async (dates) => {
    setRange(dates);
  };

  // set ngay
  const handleSet = async () => {
    var res = await thongKeApi.thongKeDoanhThuGiangVien(
      range[0].toISOString(),
      range[1].toISOString(),
      state.tokenGv
    );
    setTongDoanhThu(res.data.tongTien);

    //*************************** */
    const ress = await thongKeApi.thongKeLoiNhuan(
      range[0].toISOString(),
      range[1].toISOString(),
      state.tokenGv
    );
    const labels = ress.data.map((item) => item.tenKh); // Lấy tên các khóa học làm nhãn
    const dataLoiNhuan = ress.data.map((item) => item.tongLoiNhuanThuDc); // Lấy tổng lợi nhuận tương ứng với mỗi khóa học
    const dataTongTien = ress.data.map((item) => item.tongDonGia); // Lấy tổng lợi nhuận tương ứng với mỗi khóa học

    setDataLoiNhuan((prev) => ({
      ...prev,
      labels: labels,
      datasets: [
        {
          label: "Lợi nhuận thu được", // Đặt nhãn cho dữ liệu
          data: dataLoiNhuan, // Đặt dữ liệu cho biểu đồ
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
        {
          label: "Tổng tiền ", // Đặt nhãn cho dữ liệu
          data: dataTongTien, // Đặt dữ liệu cho biểu đồ
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    }));
  };

  const getThongKeDoanhThu = async () => {
    const res = await thongKeApi.thongKeDoanhThuGiangVien(
      startOfMonth._d.toISOString(),
      endOfMonth._d.toISOString(),
      state.tokenGv
    );

    setTongDoanhThu(res.data.tongTien);
  };

  const getThongLoiNhuan = async () => {
    const res = await thongKeApi.thongKeLoiNhuan(
      startOfMonth._d.toISOString(),
      endOfMonth._d.toISOString(),
      state.tokenGv
    );
    const labels = res.data.map((item) => item.tenKh); // Lấy tên các khóa học làm nhãn
    const dataLoiNhuan = res.data.map((item) => item.tongLoiNhuanThuDc); // Lấy tổng lợi nhuận tương ứng với mỗi khóa học
    const dataTongTien = res.data.map((item) => item.tongDonGia); // Lấy tổng lợi nhuận tương ứng với mỗi khóa học

    setDataLoiNhuan((prev) => ({
      ...prev,
      labels: labels,
      datasets: [
        {
          label: "Lợi nhuận thu được", // Đặt nhãn cho dữ liệu
          data: dataLoiNhuan, // Đặt dữ liệu cho biểu đồ
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
        {
          label: "Tổng tiền ", // Đặt nhãn cho dữ liệu
          data: dataTongTien, // Đặt dữ liệu cho biểu đồ
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    }));
  };

  useEffect(() => {
    getThongKeDoanhThu();
    getThongLoiNhuan();
  }, []);

  return (
    <div className={cx("wrap")}>
      <div className={cx("heading")}>
        <h2>THỐNG KÊ</h2>
        <div style={{ display: "flex", alignItems: "center" }}>
          <RangePicker
            style={{ height: "40px", width: "100%" }}
            format="DD/MM/YYYY"
            defaultValue={[startOfMonth, endOfMonth]}
            onChange={onChange} // Hàm xử lý khi giá trị thay đổi
            value={range} // Gán giá trị hiện tại của RangePicker
          />
          <Button
            type="primary"
            style={{ marginLeft: "10px" }}
            onClick={handleSet}
          >
            Chọn
          </Button>
        </div>
      </div>
      <div>
        <div className={cx("list")}>
          <ItemCart item={tongDoanhThu} title={"Tổng doanh thu bán khóa học"} />
          <ItemCart title={"Doanh thu "} />
          <ItemCart title={"Khóa học mới"} />
        </div>
        <div className={cx("wrap-tong-quan")}>
          <div className={cx("top")}>
            <div className={cx("course-buys")}>
              <h2>Top khóa học mua nhiều nhất của giảng viên</h2>
              <div className={cx("bar-course-buys")}>
                <Bar
                  data={dataBarChart}
                  options={{
                    scales: {
                      x: {
                        type: "category",
                      },
                    },
                  }}
                />
              </div>
            </div>
            <div className={cx("course-buys")}>
              <h2>Top khóa học mua nhiều khóa học nhất</h2>
              <div className={cx("bar-course-buys")}>
                <Bar
                  data={dataBarChart}
                  options={{
                    scales: {
                      x: {
                        type: "category",
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={cx("wrap-loi-nhuan")}>
          {dataLoiNhuan && (
            <Bar data={dataLoiNhuan} options={optionsLoiNhuan} />
          )}
        </div>
      </div>
    </div>
  );
}
