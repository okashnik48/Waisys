import React, { useState, useRef } from "react";
import { useClickOutside } from "../../modules/useClickOutside";

import { Link } from "react-router-dom";

import { useAppDispatch } from "../../App";

import {
  BsPersonCircle,
  BsFillPersonFill,
  BsGiftFill,
  BsFillGearFill,
  BsBoxArrowRight,
} from "react-icons/bs";

import "../../styles/M2.css";
import { ClearUserProperties } from "../Flowbite/redux/user";
import { serviceApi } from "../../services/app.service";

function CookMenu() {
  const [isOpen, setOpen] = useState(false);
  const menuRef = useRef(null);

  const dispatch = useAppDispatch();

  useClickOutside(menuRef, () => {
    if (isOpen) setTimeout(() => setOpen(false), 50);
  });
  const ClearUserInfo = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    localStorage.clear();
    dispatch(serviceApi.util.resetApiState());
    dispatch(ClearUserProperties());
  };
  return (
    <header className="header relative z-50">
      <button className="menu-button" onClick={() => setOpen(!isOpen)}>
        <BsPersonCircle />
      </button>
      <nav className={`menu ${isOpen ? "active" : ""}`} ref={menuRef}>
        <ul className="menu__list">
          <Link to="/CookPanel" className="menu__item">
            <BsFillPersonFill className="icon" />
            <span>CookPanel</span>
          </Link>
          <Link to="/LoginForm" onClick={ClearUserInfo} className="menu__item">
            <BsGiftFill className="icon" />
            <span>Exit</span>
          </Link>
        </ul>
      </nav>
    </header>
  );
}

export default CookMenu;
