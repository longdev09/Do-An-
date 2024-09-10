import Course from "../../component/Course";
import HeadingCourse from "../../component/HeadingCourse";
import SlideItem from "../../component/SlideItem";
import useKhoaHocData from "../../hook/useKhoaHocData";
import ListCategory from "./ListCategory";

import img1 from "../../assets/about_1_1.png";
import img2 from "../../assets/about_1_2.png";
import shape from "../../assets/about_1_shape1.png";
import banner1 from "../../assets/cta-bg1.png";
import banner2 from "../../assets/cta-bg2-2.png";
import shape2 from "../../assets/wcu_1_shape2.png";
import { Button, Carousel } from "antd";
import classNames from "classnames/bind";
import { FaCheckCircle } from "react-icons/fa";
import imgStudent from "../../assets/student-group_1_1.png";
import img3 from "../../assets/wcu_1_1.png";
import MultipleSlick from "../../component/MultipleSlick";
import { ToastContainer } from "react-toastify";
import style from "./Home.module.scss";
import Loading from "../../component/Loading";
const cx = classNames.bind(style);

export default function Home() {
  // lay danh sach khoa hoc

  const { dsKhoaHocDanhGiaCao, dsKhoaHocRandDom, loadingKh } = useKhoaHocData();

  const backgroundImageStyle = {
    backgroundImage: `url(${banner1})`, // Replace 'path/to/your/image.jpg' with the actual path to your image
    backgroundSize: "cover",
    backgroundPosition: "center",
    padding: "38px",
  };

  const backgroundImageStyle2 = {
    backgroundImage: `url(${banner2})`, // Replace 'path/to/your/image.jpg' with the actual path to your image
    backgroundSize: "cover",
    backgroundPosition: "center",
    padding: "38px",
  };

  const contentStyle = {
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };
  return (
    <>
      {loadingKh ? (
        <Loading />
      ) : (
        <div className={cx("home-wrap")}>
          <ToastContainer />

          <div className={cx("banner-heading")}>
            <video width="100%" height="100%" autoPlay muted loop>
              <source
                type="video/mp4"
                src={
                  "https://firebasestorage.googleapis.com/v0/b/app-e-learning-3f826.appspot.com/o/he_thong%2Fvideo-banner%2Fcourse-video.mp4?alt=media&token=c3e083f4-b08d-42e8-b88a-299d32b0ca8f"
                }
              />
            </video>

            <div className={cx("text-banner")}>
              <div className={cx("container-text-banner")}>
                <div className={cx("wrap-text-banner")}>
                  <h5>Học từ hôm nay</h5>
                  <h2>
                    Giáo Dục Là Tạo Ra{" "}
                    <span style={{ color: "#009dff" }}>Tương Lai</span> Tốt Đẹp
                    Hơn
                  </h2>
                  <p>
                    Giáo dục có thể được coi là sự truyền tải các giá trị và
                    kiến ​​thức tích lũy của xã hội.{" "}
                  </p>
                  <Button className={cx("custom-btn")} type="primary">
                    MUA NGAY
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* danh muc khoa hoc */}

          <ListCategory />

          <section className={cx("section-banner")}>
            <div className={cx("left")}>
              <div className={cx("box-img")}>
                <div className={cx("img1")}>
                  <img src={img1} />
                </div>
                <div className={cx("img2")}>
                  <img src={img2} />
                </div>

                <div className={cx("shape")}>
                  <img src={shape} />
                </div>
              </div>
            </div>
            <div className={cx("right")}>
              <div className={cx("wrap")}>
                <span>Giới thiệu</span>
                <h2>Chào Mừng Đến e Learning</h2>
                <p>
                  Bạn muốn nâng cao kiến thức và kỹ năng của mình? Bạn muốn học
                  những khóa học chất lượng từ những chuyên gia hàng đầu trong
                  ngành? Hãy ghé thăm Website Bán Khóa học của chúng tôi!
                </p>
                <p>
                  Chúng tôi là một nền tảng học trực tuyến cung cấp một loạt các
                  khóa học đa dạng và chất lượng, từ marketing, kinh doanh, phát
                  triển cá nhân, thiết kế đến kỹ năng sống và nhiều lĩnh vực
                  khác. Với đội ngũ giảng viên giàu kinh nghiệm và kiến thức
                  chuyên môn sâu rộng, chúng tôi cam kết mang đến cho bạn những
                  khóa học chất lượng cao và mang tính thực tiễn.
                </p>
              </div>
            </div>
          </section>

          {/* hien thi khoa hoc ngau nhien */}
          <div className={cx("wrap-course")}>
            {/* banner 1*/}
            {/*  hien thi random cac khoa hoc */}
            <HeadingCourse nameTitle={"Khóa học ngẫu nhiên dành cho bạn"} />
            <div className={cx("course-list")}>
              {dsKhoaHocRandDom &&
                dsKhoaHocRandDom.map((item, index) => (
                  <Course item={item} key={index} />
                ))}
            </div>
          </div>

          {/* khoa hoc noi bat */}
          <div className={cx("wrap-course-outstanding")}>
            {/* banner 1*/}
            <div className={cx("wrap-course")}>
              <HeadingCourse nameTitle={"Khóa học có đánh giá cao"} />
              <div className={cx("course-list")}>
                {dsKhoaHocDanhGiaCao &&
                  dsKhoaHocDanhGiaCao.map((item, index) => (
                    <Course item={item} key={index} />
                  ))}
              </div>
            </div>
          </div>

          <div className={cx("banner-main-1")} style={backgroundImageStyle}>
            <div className={cx("banner-wrapp")}>
              <div className={cx("item-banner")}>
                <div className={cx("text")}>
                  <h2>Nhận khóa học trực tuyến </h2>
                  <p>
                    Bạn muốn tiếp cận với kiến thức mới mỗi ngày và phát triển
                    bản thân? Bạn muốn học tập linh hoạt và tiện lợi ngay tại
                    nhà? Hãy đăng ký nhận khóa học trực tuyến ngay hôm nay!
                  </p>
                </div>
                <div className={cx("btn")}>
                  <Button type="primary">Tham gia ngay</Button>
                </div>
              </div>
            </div>
          </div>

          <div className={cx("banner-main-2")}>
            <div className={cx("bg-banner-2")}>
              <img src={shape2} />
            </div>
            <div className={cx("wrapp")}>
              <div className={cx("left")}>
                <div className={cx("img-banner")}>
                  <img src={img3} />
                </div>
                <div className={cx("student-banner")}>
                  <h3>Học viên tích cực</h3>
                  <img src={imgStudent} />
                </div>
              </div>
              <div className={cx("right")}>
                <div className={cx("wrapp")}>
                  <div className={cx("text")}>
                    <span>Lý do chọn chúng tôi</span>
                    <h2>
                      Hàng Trăm Chuyên Gia Trên Khắp Thế Giới Sẵn Sàng Trợ Giúp
                    </h2>
                    <p>
                      Chúng tôi tự hào có một đội ngũ hàng trăm chuyên gia đáng
                      tin cậy và giàu kinh nghiệm từ khắp nơi trên thế giới. Đây
                      là một trong những lý do tại sao bạn nên lựa chọn chúng
                      tôi để hỗ trợ và truyền cảm hứng cho hành trình học tập
                      của bạn.
                    </p>
                  </div>

                  <div className={cx("box")}>
                    <div className={cx("item-box")}>
                      <div className={cx("wrap-box")}>
                        <div className={cx("icon")}>
                          <i>
                            <FaCheckCircle />
                          </i>
                        </div>
                        <div className={cx("text-box")}>
                          <h3>Giảng Viên Chuyên Nghiệp</h3>
                          <p>
                            Với đội ngũ giảng viên chuyên nghiệp và giàu kinh
                            nghiệm, chúng tôi đảm bảo bạn nhận được sự hướng dẫn
                            tận tâm và kiến thức chất lượng cao
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className={cx("item-box")}>
                      <div className={cx("wrap-box")}>
                        <div className={cx("icon")}>
                          <i>
                            <FaCheckCircle />
                          </i>
                        </div>
                        <div className={cx("text-box")}>
                          <h3>Giảng Viên Chuyên Nghiệp</h3>
                          <p>
                            Với đội ngũ giảng viên chuyên nghiệp và giàu kinh
                            nghiệm, chúng tôi đảm bảo bạn nhận được sự hướng dẫn
                            tận tâm và kiến thức chất lượng cao
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className={cx("item-box")}>
                      <div className={cx("wrap-box")}>
                        <div className={cx("icon")}>
                          <i>
                            <FaCheckCircle />
                          </i>
                        </div>
                        <div className={cx("text-box")}>
                          <h3>Giảng Viên Chuyên Nghiệp</h3>
                          <p>
                            Với đội ngũ giảng viên chuyên nghiệp và giàu kinh
                            nghiệm, chúng tôi đảm bảo bạn nhận được sự hướng dẫn
                            tận tâm và kiến thức chất lượng cao
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={cx("banner-main-3")} style={backgroundImageStyle2}>
            <div className={cx("ouline")}></div>
            <div className={cx("wrap")}>
              <div className={cx("content")}>
                <span>BẠN ĐÃ SẴN SÀNG CHO ƯU ĐÃI NÀY CHƯA</span>
                <div className={cx("text-heading")}>
                  Ưu đãi 90%
                  <span> Cho các khóa học được bán ra</span>
                  <br />
                  <span>hãy đăng ký tài khoản</span>
                </div>
                <p>
                  Giảng viên trên khắp thế giới giảng dạy hàng triệu học viên
                  trên Udemy
                </p>
                <p>
                  Chúng tôi cung cấp công cụ và kỹ năng để dạy những gì bạn yêu
                  thích
                </p>
                <Button>Trở Thành Giảng Viên</Button>
              </div>
            </div>

            <div className={cx("shape-mokup-banner3")}>
              <img
                decoding="async"
                src="https://themeholy.com/wordpress/edura/wp-content/uploads/2023/07/cta_2_shape1.png"
                alt="Be Better"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
