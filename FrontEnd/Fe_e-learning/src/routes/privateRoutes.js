import { Route, Routes, Navigate } from "react-router-dom";
import { Fragment } from "react";
import routes from "../config/routeConfig";
import MentorLayout from "../layouts/MentorLayout";
import { publicRoutesMentor } from "../routes";
export default function PrivateRoutes({ arrRoutes, layout, nameToken }) {
  const isAuthenticated = () => {
    const token = localStorage.getItem(nameToken);
    if (!token) {
      return false; // khong co token
    } else {
      const tokenData = JSON.parse(atob(token.split(".")[1]));
      const expirationTime = tokenData.exp * 1000; // Thời gian hết hạn được chuyển đổi từ giây sang mili giây
      const currentTime = new Date().getTime(); // Thời gian hiện tại trong mili giây
      return expirationTime <= currentTime;
    }
  };
  if (!isAuthenticated()) {
    // Nếu không xác thực được, chuyển hướng đến trang đăng nhập

    <Routes>
      {publicRoutesMentor.map((route, index) => {
        let Layout = route.layout === null ? Fragment : MentorLayout;
        const Page = route.component;
        return (
          <Route
            key={index}
            path={route.path}
            element={
              <Layout>
                <Page />
              </Layout>
            }
          />
        );
      })}
    </Routes>;

    return <Navigate to={routes.mentor_Login} />;
  }
  return (
    <Routes>
      {arrRoutes.map((route, index) => {
        let Layout = route.layout === null ? Fragment : layout;
        const Page = route.component;
        return (
          <Route
            key={index}
            path={route.path}
            element={
              <Layout>
                <Page />
              </Layout>
            }
          />
        );
      })}
    </Routes>
  );
}
