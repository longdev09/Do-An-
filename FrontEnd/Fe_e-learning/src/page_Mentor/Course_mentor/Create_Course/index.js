import { Button, message, Steps, theme } from "antd";
import { useState } from "react";
import StepGioiThieu from "./Step_GioiThieu";
import StepChuong from "./Step_Chuong";
import classNames from "classnames/bind";
import style from "./Create_Course.module.scss";
import StepGia from "./Step_Gia";
import StepXuatBan from "./Step_Xuat_Ban";
const cx = classNames.bind(style);

// steps
const steps = [
  {
    title: "GIỚI THIỆU",
    component: StepGioiThieu,
  },
  {
    title: "NỘI DUNG BÀI GIẢNG",
    component: StepChuong,
  },

  {
    title: "GIÁ KHÓA HỌC",
    component: StepGia,
  },
  {
    title: "XUẤT BẢN KHÓA HỌC",
    component: StepXuatBan,
  },
];

export default function CreateCourse() {
  const [current, setCurrent] = useState(0);
  const items = steps.map((item) => ({ key: item.title, title: item.title }));
  const CurrentComponent = steps[current].component;

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <div className={cx("main")}>
      <div className={cx("wrap")}>
        <div className={cx("heading-step")}>
          <Steps current={current} items={items} />
        </div>

        <div className={cx("content")}>
          <CurrentComponent />
        </div>

        <div className={cx("btn")}>
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => message.success("Processing complete!")}
            >
              Done
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
              Previous
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
