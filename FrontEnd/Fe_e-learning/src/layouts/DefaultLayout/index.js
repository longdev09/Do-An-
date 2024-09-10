import Header from "./Header";
import Footer from "./Footer";
import classNames from "classnames/bind";
import styles from "./DefautLayout.module.scss";
const cx = classNames.bind(styles);

export default function DefaultLayout({ children }) {
  return (
    <div>
      <Header />
      <div className={cx("content")}>{children}</div>
      <Footer />
    </div>
  );
}
