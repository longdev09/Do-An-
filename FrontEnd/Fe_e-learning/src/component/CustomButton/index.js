import { Button } from "antd";
import classNames from "classnames/bind";
import style from "./Button.module.scss";
import { Link } from "react-router-dom";
const cx = classNames.bind(style);

export default function CustomButton({
  loading,
  onClick,
  children,
  className,
  w100,
}) {
  const propsStyle = cx("custom-button", {
    [className]: className,
    w100,
  });
  return (
    <Button
      className={propsStyle}
      loading={loading}
      disabled={loading}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
