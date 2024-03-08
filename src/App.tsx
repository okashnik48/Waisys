import React, { useEffect, useState } from "react";

import { useAppSelector } from "./store/store-hooks";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTES_CONFIG } from "./configs/routes-config";
import NavigationLayout from "./layouts/Navigation";
import AdminCreateDish from "./components/admin/AdminCreateDish";
import CreateUserModal from "./components/admin/CreateUserModal";

import { useAppDispatch } from "./store/store-hooks";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userService from "./services/user.service";
import { SetTokens, SetUserProperties } from "./store/slices/user";
import { Spin } from "antd";
import { UserDishesList } from "./components/user/UserDishesList";

function App() {
  const userRole = useAppSelector((state) => state.user.user).role;
  const [isTokensLoading, setIsTokensLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    type Tokens = {
      accessToken: string;
      refreshToken: string;
    };

    const storedTokensString = localStorage.getItem("tokens");
    const storedTokens: Tokens | null = storedTokensString
      ? JSON.parse(storedTokensString)
      : null;

    if (storedTokens !== null) {
      const { accessToken, refreshToken } = storedTokens;
      dispatch(SetTokens({ accessToken, refreshToken }));

      dispatch(userService.endpoints.userInfo.initiate({ accessToken }))
        .unwrap()
        .then((data) => {
          dispatch(SetUserProperties(data));
          setIsTokensLoading(false);
        });
    } else {
      console.error("No tokens found in localStorage");
      setIsTokensLoading(false);
    }
  }, []);
  if (isTokensLoading) {
    return (
      <div style={{ marginBottom: "50px" }}>
        <Spin style={{ marginBottom: "50px" }} tip="Loading" size="large">
          <div className="content" />
        </Spin>
      </div>
    );
  }
  if (!userRole) {
    return (
      <UserDishesList />
      // <BrowserRouter>
      //   <Routes>
      //     {ROUTES_CONFIG.public.map(({ element, path }, index) => (
      //       <Route key={path} path={path} element={element} />
      //     ))}
      //   </Routes>
      //   <ToastContainer />
      // </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <NavigationLayout role={userRole}>
        <Routes>
          {ROUTES_CONFIG.private[userRole].map(({ element, path }, index) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
        {userRole === "ADMIN" && (
          <>
            <AdminCreateDish />
            <CreateUserModal />
          </>
        )}
      </NavigationLayout>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
