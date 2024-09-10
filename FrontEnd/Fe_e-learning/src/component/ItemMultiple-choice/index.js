import {
  faPenToSquare,
  faQuestion,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Input, Radio, Typography, Row, Col } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import style from "./ItemMultipleChoice.module.scss";
import useTracNghiemData from "../../hook/useTracNghiemData";
import * as tracNghiemApi from "../../services/api/tracNghiemApi";
const cx = classNames.bind(style);

const toolbarOptions = [
  ["bold", "italic"],
  ["image"],
  ["code-block"],
  ["clean"], // remove formatting button
];

export default function ItemMultipleChoice({ item }) {
  const [showAddCauHoi, setShowAddCauHoi] = useState(false);
  const [tracNghiem, setTracNghiem] = useState();

  const getTracNghiem = async () => {
    const res = await tracNghiemApi.getTracNghiem(item.maNd);
    setTracNghiem(res.data.data);
  };

  // goi lay trac nghiem lan dau

  useEffect(() => {
    getTracNghiem();
  }, []);

  console.log(tracNghiem);
  const hanhdleShowUpdate = () => {};
  const handleShowAddCauHoi = () => {
    setShowAddCauHoi(!showAddCauHoi);
  };

  const modules = {
    toolbar: toolbarOptions,
  };
  // value dap an dung
  const [value, setValue] = useState(0);

  // gia tri  fieldsCount

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  // sumbit
  const { loadingTrn, createTracNghiem } = useTracNghiemData();
  const onFinish = async (values) => {
    console.log(values);
    const formData = new FormData();
    formData.append("tenCauHoi", values.question);
    formData.append("maNd", item.maNd);
    values.answer.forEach((item, index) => {
      console.log(index);
      formData.append(`dsDapAn[${index}].tenDa`, item.first);
      formData.append(`dsDapAn[${index}].giaiThich`, item.last);
    });
    formData.append("dapAnDung", value);
    await createTracNghiem(formData);
    getTracNghiem();
  };

  return (
    <div className={cx("wrapp")}>
      <div style={{ padding: "15px" }} className={cx("wrapp-heading")}>
        <div className={cx("left")}>
          <div className={cx("title")}>
            <span>Trắc nghiệm {item.stt} :</span>
            <span>{item.tieuDe}</span>
          </div>

          {/* chinh sua noi dung  */}
          <div className={cx("btn-edit")}>
            <span onClick={hanhdleShowUpdate}>
              <FontAwesomeIcon icon={faPenToSquare} />
            </span>
            <span>
              <FontAwesomeIcon icon={faTrashCan} />
            </span>
          </div>
        </div>

        <div className={cx("right")}>
          <Button type="primary" onClick={handleShowAddCauHoi}>
            <FontAwesomeIcon icon={faQuestion} />
          </Button>
        </div>
      </div>

      <div
        className={cx("wrapp-add-video")}
        style={{ display: showAddCauHoi ? "block" : "none" }}
      >
        <div className={cx("container")}>
          {tracNghiem && tracNghiem != null ? (
            <div className={cx("wrap-trac-nghiem")}>
              <div className={cx("text")}>
                <span>Câu hỏi: </span>
                <span
                  dangerouslySetInnerHTML={{ __html: tracNghiem.tenCauHoi }}
                ></span>
              </div>

              <div className={cx("btn-action")}>
                <span onClick={hanhdleShowUpdate}>
                  <FontAwesomeIcon icon={faPenToSquare} />
                </span>
                {/* xoa trắc nghiệm */}
                <span>
                  <FontAwesomeIcon icon={faTrashCan} />
                </span>
              </div>
            </div>
          ) : (
            <Form onFinish={onFinish}>
              <div className={cx("input-question")}>
                <Typography.Title level={5}>Đặt câu hỏi</Typography.Title>
                <Form.Item name="question">
                  <ReactQuill
                    modules={modules}
                    // style={{ height: "100px", marginBottom: "70px" }}
                    className={cx("text-edit")}
                    theme="snow"
                  />
                </Form.Item>
              </div>
              <div style={{ width: "100%" }}>
                <Form.List name="answer">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <div className={cx("input-answer")}>
                          <Radio.Group
                            style={{ width: "100%" }}
                            onChange={onChange}
                            value={value}
                          >
                            <div className={cx("answer")}>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Radio value={key}></Radio>
                                <div className={cx("item-answer")}>
                                  <Typography.Title level={5}>
                                    Đáp án
                                  </Typography.Title>
                                  <Form.Item
                                    {...restField}
                                    name={[name, "first"]}
                                    rules={[
                                      {
                                        required: true,
                                        message: "Missing first name",
                                      },
                                    ]}
                                  >
                                    <ReactQuill
                                      modules={modules}
                                      // style={{ height: "100px", marginBottom: "70px" }}
                                      className={cx("text-edit")}
                                      theme="snow"
                                    />
                                  </Form.Item>
                                </div>
                              </div>

                              <div className={cx("item-explain")}>
                                <Form.Item
                                  {...restField}
                                  name={[name, "last"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Missing last name",
                                    },
                                  ]}
                                >
                                  <Input
                                    style={{ height: "50px" }}
                                    placeholder="Giải thích cho đáp án này"
                                  />
                                </Form.Item>
                              </div>
                            </div>
                          </Radio.Group>

                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <MinusCircleOutlined onClick={() => remove(name)} />
                          </div>
                        </div>
                      ))}
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          block
                          icon={<PlusOutlined />}
                        >
                          Thêm đáp án
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </div>
              <Form.Item>
                <Row justify="center">
                  <Col>
                    <Button
                      loading={loadingTrn}
                      type="primary"
                      htmlType="submit"
                      className={cx("btn-submit")}
                    >
                      Lưu
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
}
