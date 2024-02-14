import React from "react";


import "./styles/Tailwind.css";
import { useAppSelector } from "./store/store-hooks";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTES_CONFIG } from "./configs/routes-config";
import NavigationLayout from "./layouts/Navigation";
import AdminAddDish from "./components/admin/AdminAddDish";
import AdminModalAdd from "./components/admin/AdminModalAdd";

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
    <BrowserRouter>
      <NavigationLayout role={userRole}>
        <Routes>
          {ROUTES_CONFIG.private[userRole].map(({ element, path }, index) => (
            <Route path={path} element={element} />
          ))}
        </Routes>
        <AdminAddDish />
        <AdminModalAdd />
      </NavigationLayout>
    </BrowserRouter>
  );
}

export default App;
