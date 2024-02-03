import React, { useState, useRef } from "react";
import { useClickOutside } from "../../modules/useClickOutside";

import { Link } from "react-router-dom";

import {SetAddUserModal, SetAddDishModal} from "../Flowbite/redux/admin"

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


function UserMenu() {
  const [isOpen, setOpen] = useState(false);
  const menuRef = useRef(null);

    const dispatch = useAppDispatch();

  useClickOutside(menuRef, () => {
    if (isOpen) setTimeout(() => setOpen(false), 50);
  });
  

  const AddUserHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>{
    e.preventDefault()
    dispatch(SetAddUserModal({status: true}))
  }

  const AddDishHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>{
    e.preventDefault()
    dispatch(SetAddDishModal({status: true}))
  }

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

            <Link to = "/AdminPanel" className="menu__item">
                <BsFillPersonFill className="icon" />
                <span>Dish List</span>
            </Link>

            <Link to = "/AdminUserList" className="menu__item">
                <BsGiftFill className="icon" />
                <span>Users List</span>
            </Link>

            <div onClick={AddUserHandler} className="menu__item">
                <BsGiftFill className="icon" />
                <span>Add new user</span>
            </div>

            <div onClick = {AddDishHandler} className="menu__item">
                <BsGiftFill className="icon" />
                <span>Add new Dish</span>
            </div>

            <Link to = "/LoginForm"  onClick={ClearUserInfo} className="menu__item">
                <BsGiftFill className="icon" />
                <span>Exit</span>
            </Link>
        </ul>
      </nav>
    </header>
  );
}

export default UserMenu;