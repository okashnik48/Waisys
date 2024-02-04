import React from "react";
import RoleRouter from "./components/LoginComponents/RoleRouter";


import "./styles/Tailwind.css";
import { useAppSelector } from "./store/store-hooks";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTES_CONFIG } from "./configs/routes-config";
import NavigationLayout from "./layouts/Navigation";

function App() {
  const userRole = useAppSelector((state) => state.user.user).role;

  if (!userRole) {
    return (
      <BrowserRouter>
        <Routes>
          {ROUTES_CONFIG.public.map(({ element, path }, index) => (
            <Route path={path} element={element} />
          ))}
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <NavigationLayout role={userRole}>
      <BrowserRouter>
        <Routes>
          {ROUTES_CONFIG.private[userRole].map(({ element, path }, index) => (
            <Route path={path} element={element} />
          ))}
        </Routes>
      </BrowserRouter>
    </NavigationLayout>
  );
}

export default App;
