import Home from "../page/Home";
import DetailCourse from "../page/DetailCourse/index";
import routeConfig from "../config/routeConfig";

// hoc vien
import Login_User from "../page_User/Authen/Login";
import Register_User from "../page_User/Authen/Register";
import DetailCart from "../page/DetailCart";
import Payment from "../page/Payment";
import MyCourse from "../page/MyCourse";
import DetailBill from "../page/DetailBill";
import EditProfile from "../page/EditProfile";
import ListCourseDanhMuc from "../page/List_Course_DanhMuc";

//giang vien
import DashboardMentor from "../page_Mentor/Dashboard_mentor";
import ProfileMentors from "../page_Mentor/Profile_mentor";
import CourseMentor from "../page_Mentor/Course_mentor";
import CreateCourse from "../page_Mentor/Course_mentor/Create_Course";
import Register from "../page_Mentor/Authen/Register";
import Login from "../page_Mentor/Authen/Login";
import Learning_Course from "../page/Learning _Course";
import Discount from "../page_Mentor/Discount";
import PreviewCourse from "../page_Mentor/Preview_Course";
import Mentor_Evaluate from "../page_Mentor/Mentor_Evaluate";
import Mentor_Bill from "../page_Mentor/Mentor_Bill";
import Message_Mentor from "../page_Mentor/Message_Mentor";
import PayMentor from "../page_Mentor/PayMentor";

// admin
import DashboardAdmin from "../page_Admin/Dashboard_Admin";
import CourseAdmin from "../page_Admin/Course_Admin";
import PreviewCourseAdmin from "../page_Admin/PreviewCourseAdmin";
import Account_Mentor from "../page_Admin/Account_Admin/Account_Mentor";
import BillAdmin from "../page_Admin/Bill_Admin";
import PayAdmin from "../page_Admin/PayAdmin";

// trang danh cho hoc vien
const publicRoutes = [
  { path: "/", component: Home },
  { path: routeConfig.detail_course, component: DetailCourse },
  { path: routeConfig.list_course_danh_muc, component: ListCourseDanhMuc },
];

const privateRoutesUser = [
  { path: routeConfig.user_Login, component: Login_User, layout: null },
  { path: routeConfig.user_Register, component: Register_User, layout: null },
  { path: routeConfig.detail_cart, component: DetailCart },
  { path: routeConfig.payMent, component: Payment, layout: null },
  { path: routeConfig.myCourse, component: MyCourse },
  { path: routeConfig.edit_profile, component: EditProfile },
  {
    path: routeConfig.learning_Course,
    component: Learning_Course,
    layout: null,
  },
  {
    path: routeConfig.detail_Bill,
    component: DetailBill,
  },
];

// danh cho giang vien
const publicRoutesMentor = [
  {
    path: routeConfig.mentor_Register,
    component: Register,
    layout: null,
  },
  {
    path: routeConfig.mentor_Login,
    component: Login,
    layout: null,
  },
];
const privateRoutesMentor = [
  {
    path: routeConfig.mentor_Dashboard,
    component: DashboardMentor,
  },
  {
    path: routeConfig.mentor_Profile,
    component: ProfileMentors,
  },
  {
    path: routeConfig.mentor_Course,
    component: CourseMentor,
  },
  {
    path: routeConfig.mentor_Course_Create_Update,
    component: CreateCourse,
  },
  {
    path: routeConfig.mentor_Discount,
    component: Discount,
  },
  {
    path: routeConfig.mentor_PreviewCourse,
    component: PreviewCourse,
    layout: null,
  },

  {
    path: routeConfig.mentor_MetorEvalute,
    component: Mentor_Evaluate,
  },
  {
    path: routeConfig.mentor_MetorBill,
    component: Mentor_Bill,
  },
  {
    path: routeConfig.mentor_Message,
    component: Message_Mentor,
  },
  {
    path: routeConfig.mentor_Pay,
    component: PayMentor,
  },
];

// danh cho admin
const publicRoutesAdmin = [
  {
    path: routeConfig.mentor_Register,
    component: Register,
    layout: null,
  },
  {
    path: routeConfig.mentor_Login,
    component: Login,
    layout: null,
  },
];

const privateRoutesAdmin = [
  {
    path: routeConfig.admin_Dashboard,
    component: DashboardAdmin,
  },
  {
    path: routeConfig.admin_Courses,
    component: CourseAdmin,
  },

  {
    path: routeConfig.admin_Preview_Course_Admin,
    component: PreviewCourseAdmin,
    layout: null,
  },

  {
    path: routeConfig.admin_Account_Mentor,
    component: Account_Mentor,
  },
  {
    path: routeConfig.admin_Bill,
    component: BillAdmin,
  },

  {
    path: routeConfig.admin_Pay,
    component: PayAdmin,
  },
];

export {
  publicRoutes,
  privateRoutesUser,
  privateRoutesMentor,
  publicRoutesMentor,
  privateRoutesAdmin,
};
