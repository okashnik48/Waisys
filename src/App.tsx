import React, { useEffect } from "react";

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

function App() {
  const userRole = useAppSelector((state) => state.user.user).role;
  const dispatch = useAppDispatch()

  useEffect(() => {
    type Tokens = {
      accessToken: string;
      refreshToken: string;
    };

    const storedTokensString = localStorage.getItem("tokens");
    const storedTokens: Tokens | null = storedTokensString
      ? JSON.parse(storedTokensString)
      : null;

    console.log(storedTokens);

    if (storedTokens !== null) {
      const { accessToken, refreshToken } = storedTokens;
      dispatch(SetTokens({ accessToken, refreshToken }));

      dispatch(userService.endpoints.userInfo.initiate({ accessToken }))
        .unwrap()
        .then((data) => {
          dispatch(SetUserProperties(data));
        });
    } else {
      console.error("No tokens found in localStorage");
    }
  }, []);
  
  if (!userRole) {
    return (
      <BrowserRouter>
        <Routes>
          {ROUTES_CONFIG.public.map(({ element, path }, index) => (
            <Route path={path} element={element} />
          ))}
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <NavigationLayout role={userRole}>
        <Routes>
          {ROUTES_CONFIG.private[userRole].map(({ element, path }, index) => (
            <Route path={path} element={element} />
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
