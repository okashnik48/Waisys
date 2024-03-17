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
            Dishes
          </Link>
        ),
        key: "dishes",
        icon: <MailOutlined />,
      },
      {
        label: (
          <Link to="/admin-user-list" rel="noopener noreferrer">
            Users
          </Link>
        ),
        key: "users",
        icon: <AppstoreOutlined />,
      },
      {
        label: (
          <Link to="/admin-tags-list" rel="noopener noreferrer">
            Tags
          </Link>
        ),
        key: "tags",
        icon: <AppstoreOutlined />,
      },
      {
        label: "Add Dish",
        key: "add-dish",
        icon: <AppstoreOutlined />,
        onClick: AddDishHandler,
      },
      {
        label: "Add User",
        key: "add-user",
        icon: <AppstoreOutlined />,
        onClick: AddUserHandler,
      },
      {
        label: (
          <Link to="/login" onClick={ClearUserInfo} rel="noopener noreferrer">
            Exit
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
            Exit
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
            Dish List
          </Link>
        ),
        key: "dishes",
        icon: <MailOutlined />,
      },
      {
        label: (
          <Link to="selected-list" rel="noopener noreferrer">
            Selected Dish List
          </Link>
        ),
        key: "users",
        icon: <AppstoreOutlined />,
      },
      {
        label: (
          <Link to="done-list" rel="noopener noreferrer">
            Ready Dishes
          </Link>
        ),
        key: "done-list",
        icon: <AppstoreOutlined />,
      },
      {
        label: (
          <Link to="declined-list" rel="noopener noreferrer">
            Decline Dishes
          </Link>
        ),
        key: "decline-list",
        icon: <AppstoreOutlined />,
      },
      {
        label: (
          <Link to= "/login" onClick={ClearUserInfo} rel="noopener noreferrer">
            Exit
          </Link>
        ),
        key: "exit",
        icon: <AppstoreOutlined />,
      },
    ]
  }
  const items: MenuProps["items"] = switchMenu[role];

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
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

