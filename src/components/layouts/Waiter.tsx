"use client";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import "../../styles/Tailwind.css";

import Modalfr from "../Modalfr";
import Dishes from "../User/Dishes";
import DoneList from "../User/DoneList"
import SelectedList from "../User/SelectedList"
import DeclineList from "../User/DeclinedDishes"

import UserMenu from "../User/UserMenu"


import React from "react";

const Waiter = () => {
  return (
    <div>
    <BrowserRouter>
    <Routes>
      <Route path="LoginForm" element={<Modalfr />} />

      <Route path="Dishes" element={<Dishes />} />
      <Route path="DoneList" element={<DoneList />} />
      <Route path="SelectedList" element={<SelectedList />} />
      <Route path="DeclineList" element={<DeclineList />} />

      <Route path="*" element={<Dishes />} />
    </Routes>
    <UserMenu />
    </BrowserRouter>
    </div>
  );
};
export default Waiter;
