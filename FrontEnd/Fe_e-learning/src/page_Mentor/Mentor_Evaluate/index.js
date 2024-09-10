import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Rate, Space, Table } from "antd";
import classNames from "classnames/bind";
import dayjs from "dayjs";
import { useEffect, useState, useRef } from "react";
import Highlighter from "react-highlight-words";
import * as danhGiaKhoaHocApi from "../../services/api/danhGiaKhoaHocApi";
import { useStore } from "../../store";
import style from "./MentorEvaluate.module.scss";
const cx = classNames.bind(style);
export default function MentorEvaluate() {
  const [danhGia, setDanhGia] = useState();
  const [loading, setLoading] = useState(false);
  const { state } = useStore();
  const getDsDanhGia = async () => {
    try {
      setLoading(true);
      var res = await danhGiaKhoaHocApi.getDanhGiaGiangVien(state.tokenGv);
      setDanhGia(res.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDsDanhGia();
  }, []);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Tìm
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Tên khóa học",
      dataIndex: "khoaHoc",
      key: "khoaHoc",
      ...getColumnSearchProps("khoaHoc"),
    },
    {
      title: "Tên học viên",
      dataIndex: "tenHocVien",
      key: "tenHocVien",
    },
    {
      title: "Nội dung",
      dataIndex: "danhGia",
      key: "danhGia",
    },
    {
      title: "Số sao",
      dataIndex: "soSao",
      key: "soSao",
      render: (text) => (
        <Rate
          style={{ fontSize: "15px" }}
          disabled
          defaultValue={Math.round(text)}
        />
      ),
    },
    {
      title: "Ngày đánh giá",
      dataIndex: "ngayDanhGia",
      key: "ngayDanhGia",
      render: (text) => dayjs(text).format("DD/MM/YYYY HH:mm:ss"),
    },
  ];

  return (
    <div className={cx("wrap")}>
      <div className={cx("heading")}>
        <h2>Đánh giá khóa học</h2>
      </div>
      <div className={cx("container")}>
        <Table
          columns={columns}
          dataSource={danhGia}
          pagination={{ pageSize: 8 }}
        />
      </div>
    </div>
  );
}
