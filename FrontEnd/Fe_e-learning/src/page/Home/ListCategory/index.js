import classNames from "classnames/bind";
import Category from "../../../component/Category";
import MultipleSlick from "../../../component/MultipleSlick";
import useDanhMucData from "../../../hook/useDanhMucData";
import style from "./ListCategory.module.scss";
const cx = classNames.bind(style);

export default function ListCategory() {
  const { loadingDm, dsDm } = useDanhMucData();
  console.log("sss", dsDm);
  return (
    <div className={cx("wrap-category")}>
      <div className={cx("text-category")}>
        <span>Danh mục các khóa học</span>
        <h2>Khám phá các danh mục hàng đầu</h2>
      </div>
      <MultipleSlick
        arraySide={
          dsDm
            ? dsDm.map((item, index) => (
                <Category nameDm={item.tenDm} maDm={item.maDm} key={index} />
              ))
            : []
        }
      />
    </div>
  );
}
