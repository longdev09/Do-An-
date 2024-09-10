const routes = {
  // home
  detail_course: "/courses/:makh",
  detail_cart: "/detail-cart",
  payMent: "/payment",
  myCourse: "/my-course",
  learning_Course: "/learning-course/:makh",
  detail_Bill: "/detail-bill",
  edit_profile: "/edit-profile",
  list_course_danh_muc: "/list-course-danh-muc/:maDm",

  // hoc vien ?  cac page danh cho  hoc vien
  user_Login: "/user/login",
  user_Register: "/user/register",

  // Giang Vien
  mentor_Dashboard: "/mentor/dashboard",
  mentor_Profile: "/mentor/profile",
  mentor_Course: "/mentor/course",
  mentor_Course_Create_Update: "/mentor/course/:makh",
  mentor_Course_Create: "/mentor/course/create",
  mentor_Course_Create_Chapte: "/mentor/course/create/chapte",
  mentor_Register: "/mentor/register",
  mentor_Login: "/mentor/login",
  mentor_Discount: "/mentor/discount",
  mentor_PreviewCourse: "/mentor/preview-Course/:makh",
  mentor_MetorEvalute: "/mentor/Evaluate",
  mentor_MetorBill: "/mentor/Bill",
  mentor_Message: "/mentor/message",
  mentor_Pay: "/mentor/pay",

  // admin
  admin_Dashboard: "/admin/dashboard",
  admin_Courses: "/admin/courses",
  admin_Preview_Course_Admin: "/admin/preview-course-admin/:makh",
  admin_Account_Mentor: "/admin/account/mentor",
  admin_Bill: "/admin/account/bill",
  admin_Pay: "/admin/pay",
};

export default routes;
