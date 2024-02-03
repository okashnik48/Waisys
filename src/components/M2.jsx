import React, { useState, useRef } from "react";
import { useClickOutside } from "../modules/useClickOutside";
import {
  BsPersonCircle,
  BsFillPersonFill,
  BsGiftFill,
  BsFillGearFill,
  BsBoxArrowRight,
} from "react-icons/bs";

import "../styles/M2.css";

import { SetStatus } from "./Flowbite/redux/formstatus";
import { useSelector, useDispatch } from 'react-redux'

import {useAppDispatch} from "../App"

function M2() {
  const [isOpen, setOpen] = useState(false);
  const menuRef = useRef(null);
  useClickOutside(menuRef, () => {
    if (isOpen) setTimeout(() => setOpen(false), 50);
  });
  const dispatch = useAppDispatch()
  let user = useSelector((state) => {
    return state.user.user;
  });
  switch (user.role) {
  case "WAITER":
  return (
    <header className="header relative z-50">
      <button className="menu-button" onClick={() => setOpen(!isOpen)}>
        <BsPersonCircle />
      </button>
      <nav className={`menu ${isOpen ? "active" : ""}`} ref={menuRef}>
        <ul className="menu__list">
          <li className="menu__item" onClick={(e) => { e.preventDefault()
            dispatch(SetStatus({formName: "DishesList",status: true}))
            dispatch(SetStatus({formName: "ReadyDishes",status: false}))
            dispatch(SetStatus({formName: "SelectedDishesList",status: false}))
            dispatch(SetStatus({formName: "DeclinedDishList",status: false}))
             }}>
            <BsFillPersonFill className="icon" />
            <span>Dish List</span>
          </li>
          <li className="menu__item" onClick={(e) => { e.preventDefault()
            dispatch(SetStatus({formName: "DishesList",status: false}))
            dispatch(SetStatus({formName: "ReadyDishes",status: false}))
            dispatch(SetStatus({formName: "SelectedDishesList",status: true}))
            dispatch(SetStatus({formName: "DeclinedDishList",status: false}))
            }}>
            <BsGiftFill className="icon" />
            <span>Selected Dish List</span>
          </li>
          <li className="menu__item" onClick={(e) => { e.preventDefault()
            dispatch(SetStatus({formName: "ReadyDishes",status: true}))
            dispatch(SetStatus({formName: "DishesList",status: false}))
            dispatch(SetStatus({formName: "SelectedDishesList",status: false}))
            dispatch(SetStatus({formName: "DeclinedDishList",status: false}))
            }}>
            <BsGiftFill className="icon" />
            <span>Ready Dishes</span>
          </li>
          <li className="menu__item" onClick={(e) => { e.preventDefault()
            dispatch(SetStatus({formName: "ReadyDishes",status: false}))
            dispatch(SetStatus({formName: "DishesList",status: false}))
            dispatch(SetStatus({formName: "SelectedDishesList",status: false}))
            dispatch(SetStatus({formName: "DeclinedDishList",status: true}))
            }}>
            <BsGiftFill className="icon" />
            <span>Declined Dishes</span>
          </li>
          <li className="menu__item" onClick={(e) => { e.preventDefault()
            dispatch(SetStatus({formName: "Reg",status: true}))}}>
            <BsGiftFill className="icon" />
            <span>Relogin</span>
          </li>
        </ul>
      </nav>
    </header>
  );
  case "COOK":
    return(
      <header className="header relative z-50">
      <button className="menu-button" onClick={() => setOpen(!isOpen)}>
        <BsPersonCircle />
      </button>
      <nav className={`menu ${isOpen ? "active" : ""}`} ref={menuRef}>
        <ul className="menu__list">
          <li className="menu__item" onClick={(e) => { e.preventDefault()
             dispatch(SetStatus({formName: "AdminDishList",status: true}))
             dispatch(SetStatus({formName: "AdminUserList",status: false}))}}>
            <BsFillPersonFill className="icon" />
            <span>Dish List</span>
          </li>
          <li className="menu__item" onClick={(e) => { e.preventDefault()
            dispatch(SetStatus({formName: "Reg",status: true}))}}>
            <BsGiftFill className="icon" />
            <span>Relogin</span>
          </li>
          <li className="menu__item">
            <BsBoxArrowRight className="icon" />
            <span>Exit</span>
          </li>
        </ul>
      </nav>
    </header>
  );
  case "ADMIN":
    return(
    <header className="header relative z-50">
    <button className="menu-button" onClick={() => setOpen(!isOpen)}>
      <BsPersonCircle />
    </button>
    <nav className={`menu ${isOpen ? "active" : ""}`} ref={menuRef}>
      <ul className="menu__list">
        <li className="menu__item" onClick={(e) => { e.preventDefault()
           dispatch(SetStatus({formName: "AdminDishList",status: true}))
           dispatch(SetStatus({formName: "AdminUserList",status: false}))}}>
          <BsFillPersonFill className="icon" />
          <span>Dish List</span>
        </li>
        <li className="menu__item" onClick={(e) => { e.preventDefault()
          dispatch(SetStatus({formName: "AdminUserList",status: true}))
          dispatch(SetStatus({formName: "AdminDishList",status: false}))
          }}>
          <BsGiftFill className="icon" />
          <span>Users List</span>
        </li>
        <li className="menu__item" onClick={(e) => { e.preventDefault()
          dispatch(SetStatus({formName: "AdminModalAdd",status: true}))}}>
          <BsGiftFill className="icon" />
          <span>Add new user</span>
        </li>
        <li className="menu__item" onClick={(e) => { e.preventDefault()
          dispatch(SetStatus({formName: "AdminModalAddDish",status: true}))}}>
          <BsGiftFill className="icon" />
          <span>Add new Dish</span>
        </li>
        <li className="menu__item" onClick={(e) => { e.preventDefault()
          dispatch(SetStatus({formName: "Reg",status: true}))}}>
          <BsGiftFill className="icon" />
          <span>Relogin</span>
        </li>
      </ul>
    </nav>
  </header>
);
    }
}

export default M2;
