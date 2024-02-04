import React from "react";

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

import { useAppSelector } from "../../store/store-hooks";
import NavigationLayout from "../../layouts/Navigation";


const RoleRouter = () => {

};

export default RoleRouter;
