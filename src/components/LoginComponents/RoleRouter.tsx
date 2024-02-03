import React from "react";
import { useAppSelector } from "../../App";

import Waiter from "../layouts/Waiter";
import Coocker from "../layouts/Cooker";
import Admin from "../layouts/Admin";

import Modalfr from "../Modalfr";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserMenu from "../User/UserMenu";
import Dishes from "../User/Dishes";
import SelectedList from "../User/SelectedList";

import CookPanel from "../Cook/CookPanel";
import CookMenu from "../Cook/CookMenu";

import AdminPanel from "../admin/AdminPanel";
import AdminUserList from "../admin/AdminUserList";
import AdminAddDish from "../admin/AdminAddDish";
import AdminModalAdd from "../admin/AdminModalAdd";
import AdminMenu from "../admin/AdminMenu";

import user from "../Flowbite/redux/user";

const AdminRoutes = () => (
  <Routes>
    <Route path="LoginForm" element={<Modalfr />} />

    <Route path="AdminPanel" element={<AdminPanel />} />
    <Route path="AdminUserList" element={<AdminUserList />} />

    <Route path="*" element={<AdminPanel />} />
    
  </Routes>
  
);

const WaiterRoutes = () => (
  <Routes>
    <Route path="LoginForm" element={<Modalfr />} />

    <Route path="Dishes" element={<Dishes />} />
    <Route path="SelectedList" element={<SelectedList />} />

    <Route path="*" element={<Dishes />} />
  </Routes>
);

const CookerRoutes = () => (
  <Routes>
    <Route path="LoginForm" element={<Modalfr />} />

    <Route path="CookPanel" element={<CookPanel />} />

    <Route path="*" element={<CookPanel />} />
  </Routes>
);

type RoutesMap = {
  [key: string]: JSX.Element;
};

const RoutesMap: RoutesMap = {
  ADMIN: <AdminRoutes />,
  WAITER: <WaiterRoutes />,
  COOK: <CookerRoutes />,
};

const RoleRouter = () => {
  let user = useAppSelector((state) => {
    return state.user.user;
  });
  const userRole = user.role;
  console.log(userRole);
  return (
    <BrowserRouter>
      {userRole === "ADMIN" && <AdminMenu />}
      {userRole === "WAITER" && <UserMenu />}
      {userRole === "COOK" && <CookMenu />}
      {RoutesMap[userRole]}
      {userRole === "ADMIN" && <AdminAddDish />}
      {userRole === "ADMIN" && <AdminModalAdd />}
      {userRole === "" && <Modalfr />}
    </BrowserRouter>
  );
};
export default RoleRouter;
