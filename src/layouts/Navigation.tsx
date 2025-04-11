import { Menu } from "antd";
import type { MenuProps } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
} from "@ant-design/icons";
import React, { PropsWithChildren, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAppDispatch } from "../store/store-hooks";
import { SetAddDishModal, SetAddUserModal } from "../store/slices/admin";
import { ClearUserProperties } from "../store/slices/user";
import { serviceApi } from "../services/app.service";




type Props = {
  role: "ADMIN" | "WAITER" | "COOK";
};

export default function NavigationLayout({
  children,
  role,
}: PropsWithChildren<Props>) {
  const [current, setCurrent] = useState("mail");

  const dispatch = useAppDispatch()

  const AddUserHandler = () =>{
    dispatch(SetAddUserModal({status: true}))
  }
  
  const AddDishHandler  = () =>{
    dispatch(SetAddDishModal({status: true}))
  }
  
  const ClearUserInfo = (e: React.MouseEvent<HTMLAnchorElement>)=>{
    e.preventDefault();
    localStorage.clear()
    dispatch(serviceApi.util.resetApiState());
    dispatch(ClearUserProperties())
  }
  const switchMenu = {
    "ADMIN": [
      {
        label: (
          <Link to="/admin-panel" rel="noopener noreferrer">
            Страви
          </Link>
        ),
        key: "dishes",
        icon: <MailOutlined />,
      },
      {
        label: (
          <Link to="/admin-user-list" rel="noopener noreferrer">
            Користувачі
          </Link>
        ),
        key: "users",
        icon: <AppstoreOutlined />,
      },
      {
        label: (
          <Link to="/admin-tags-list" rel="noopener noreferrer">
            Теги
          </Link>
        ),
        key: "tags",
        icon: <AppstoreOutlined />,
      },
      {
        label: "Додати страву",
        key: "add-dish",
        icon: <AppstoreOutlined />,
        onClick: AddDishHandler,
      },
      {
        label: "Додати користувача",
        key: "add-user",
        icon: <AppstoreOutlined />,
        onClick: AddUserHandler,
      },
      {
        label: (
          <Link to="/login" onClick={ClearUserInfo} rel="noopener noreferrer">
            Вийти
          </Link>
        ),
        key: "exit",
        icon: <AppstoreOutlined />,
      },
    ],
    "COOK": [
      {
        label: (
          <Link to="/login" onClick={ClearUserInfo} rel="noopener noreferrer">
            Вийти
          </Link>
        ),
        key: "exit",
        icon: <AppstoreOutlined />,
      },
    ],
    "WAITER": [
      {
        label: (
          <Link to="dishes" rel="noopener noreferrer">
            Список страв
          </Link>
        ),
        key: "dishes",
        icon: <MailOutlined />,
      },
      {
        label: (
          <Link to="selected-list" rel="noopener noreferrer">
            Список вибраних страв
          </Link>
        ),
        key: "users",
        icon: <AppstoreOutlined />,
      },
      {
        label: (
          <Link to="done-list" rel="noopener noreferrer">
            Готові страви
          </Link>
        ),
        key: "done-list",
        icon: <AppstoreOutlined />,
      },
      {
        label: (
          <Link to="declined-list" rel="noopener noreferrer">
            Відхилені страви
          </Link>
        ),
        key: "decline-list",
        icon: <AppstoreOutlined />,
      },
      {
        label: (
          <Link to= "/login" onClick={ClearUserInfo} rel="noopener noreferrer">
            Вийти
          </Link>
        ),
        key: "exit",
        icon: <AppstoreOutlined />,
      },
    ]
  }
  const items: MenuProps["items"] = switchMenu[role];

  const onClick: MenuProps["onClick"] = (e) => {
   
    setCurrent(e.key);
  };

  return (
    <>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
      {children}
    </>
  );
}

