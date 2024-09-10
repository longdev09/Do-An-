import { Modal, Image } from "antd";
import classNames from "classnames/bind";
import style from "./Browse_Account_Mentor_Modal.module.scss";
const cx = classNames.bind(style);
export default function BrowseAccountMentorModal({
  isModalOpen,
  handleCancel,
  item,
}) {
  return (
    <Modal
      title="Duyệt giảng viên"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      width={1000}
    >
      <div className={cx("wrap")}>
        <div className={cx("heading")}>
          <div className={cx("info_Cccd")}>
            <div>
              
            </div>
          </div>
          {/* <div className={cx("img-cccd")}>
            <Image src={item.macTrc} />
            <Image width={200} src={item.macSau} />
          </div> */}
        </div>
      </div>
    </Modal>
  );
}
