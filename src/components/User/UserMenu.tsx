import React, { useState, useRef } from "react";
import { useClickOutside } from "../../modules/useClickOutside";

import { Link } from "react-router-dom";

import { useAppDispatch } from "../../App";

import { serviceApi } from "../../services/app.service";
import { ClearUserProperties } from "../Flowbite/redux/user";

import {
  BsPersonCircle,
  BsFillPersonFill,
  BsGiftFill,
  BsFillGearFill,
  BsBoxArrowRight,
} from "react-icons/bs";

import "../../styles/M2.css";


function UserMenu() {
  const [isOpen, setOpen] = useState(false);
  const menuRef = useRef(null);
  const dispatch = useAppDispatch()
  useClickOutside(menuRef, () => {
    if (isOpen) setTimeout(() => setOpen(false), 50);
  });
  
  const ClearUserInfo = (e: React.MouseEvent<HTMLAnchorElement>)=>{
    e.preventDefault();
    localStorage.clear()
    dispatch(serviceApi.util.resetApiState());
    dispatch(ClearUserProperties())
  }

  return (
    <header className="header relative z-50">
      <button className="menu-button" onClick={() => setOpen(!isOpen)}>
        <BsPersonCircle />
      </button>
      <nav className={`menu ${isOpen ? "active" : ""}`} ref={menuRef}>
        <ul className="menu__list">

            <Link to = "/DishesList" className="menu__item">
                <BsFillPersonFill className="icon" />
                <span>Dish List</span>
            </Link>

            <Link to = "/SelectedList" className="menu__item">
                <BsGiftFill className="icon" />
                <span>Selected Dish List</span>
            </Link>

            <Link to = "/DoneList" className="menu__item">
                <BsGiftFill className="icon" />
                <span>Ready Dishes</span>
            </Link>

            <Link to = "/DeclineList" className="menu__item">
                <BsGiftFill className="icon" />
                <span>Decline Dishes</span>
            </Link>

            <Link to = "/LoginForm"  onClick={ClearUserInfo} className="menu__item">
                <BsGiftFill className="icon" />
                <span>Relogin</span>
            </Link>
        </ul>
      </nav>
    </header>
  );
}

export default UserMenu;