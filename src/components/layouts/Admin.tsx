import { BrowserRouter, Routes, Route} from "react-router-dom";
import React from "react";

import AdminPanel from "../admin/AdminPanel"
import AdminUserList from "../admin/AdminUserList"
import AdminMenu from "../admin/AdminMenu"
import AdminAddDish from "../admin/AdminAddDish"
import AdminModalAdd from "../admin/AdminModalAdd"

import Modalfr from "../Modalfr";

import { useSelector} from "react-redux";

const Admin = () => {
    return (
      <BrowserRouter>
      <Routes>
        <Route path="LoginForm" element={<Modalfr />} />
  
        <Route path="AdminPanel" element={<AdminPanel />} />
        <Route path="AdminUserList" element={<AdminUserList />} />
        <Route path="AdminMenu" element={<AdminMenu />} />

        <Route path="*" element={<AdminPanel />} />
        
      </Routes>
      <AdminAddDish />
      <AdminModalAdd />
      <AdminMenu />
      </BrowserRouter>
    );
  };
  export default Admin;