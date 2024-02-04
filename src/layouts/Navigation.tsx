import { Menu } from "antd";
import type { MenuProps } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import React, { PropsWithChildren, useState } from "react";
import { Link } from "react-router-dom";
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
  const items: MenuProps["items"] = [
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
        <Link to="admin-user-list" rel="noopener noreferrer">
          Users
        </Link>
      ),
      key: "users",
      icon: <AppstoreOutlined />,
    },
    {
      label: (
        <div onClick={AddDishHandler} rel="noopener noreferrer">
          Add Dish
        </div>
      ),
      key: "add-dish",
      icon: <AppstoreOutlined />,
    },
    {
      label: (
        <div onClick={AddUserHandler} rel="noopener noreferrer">
          Add User
        </div>
      ),
      key: "add-user",
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
  ];

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

