import axios from "axios";
import { Fragment, useEffect } from "react";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import routes from "./config/routeConfig";
import AdminLayout from "./layouts/AdminLayout";
import DefaultLayout from "./layouts/DefaultLayout";
import MentorLayout from "./layouts/MentorLayout";
import {
  privateRoutesAdmin,
  privateRoutesMentor,
  privateRoutesUser,
  publicRoutes,
  publicRoutesMentor,
} from "./routes";
import * as gioHangApi from "./services/api/gioHangApi";
import { useStore } from "./store";

function App() {
  const { state, dispatch } = useStore();
  const getGioHangHv = async () => {
    try {
      const res = await gioHangApi.getGioHangHocVien(state.tokenHv);
      dispatch({ type: "LOAD_CART", payload: res.data });
    } catch (error) {
      console.log("Error fetching  ", error);
    }
  };

  useEffect(() => {
    getGioHangHv();
  }, []);

  return (
    <>
      <BrowserRouter>
        {/* public routes */}
        <Routes>
          {publicRoutes.map((route, index) => {
            let Layout = route.layout === null ? Fragment : DefaultLayout;
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

          {privateRoutesUser.map((route, index) => {
            let Layout = route.layout === null ? Fragment : DefaultLayout;
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

        {/* public routes mentor */}

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
        </Routes>

        <Routes>
          {privateRoutesMentor.map((route, index) => {
            let Layout = route.layout === null ? Fragment : MentorLayout;
            const redirectToLogin = state.isAuthenMentor; // Kiểm tra xem có cần chuyển hướng đến trang đăng nhập không
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  redirectToLogin ? (
                    <Layout>
                      <route.component />
                    </Layout>
                  ) : (
                    <Navigate to={routes.mentor_Login} />
                  )
                }
              />
            );
          })}
        </Routes>

        {/*  admin */}

        <Routes>
          {privateRoutesAdmin.map((route, index) => {
            let Layout = route.layout === null ? Fragment : AdminLayout;
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
        {/* <Routes>
          {privateRoutesAdmin.map((route, index) => {
            let Layout = route.layout === null ? Fragment : AdminLayout;
            const redirectToLogin = state.isAuthenMentor; // Kiểm tra xem có cần chuyển hướng đến trang đăng nhập không
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  redirectToLogin ? (
                    <Layout>
                      <route.component />
                    </Layout>
                  ) : (
                    <Navigate to={routes.mentor_Login} />
                  )
                }
              />
            );
          })}
        </Routes> */}
      </BrowserRouter>
    </>
  );
}

export default App;
