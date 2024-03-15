import React from "react";
import CookPanel from "../components/cooker/CookPanel";
import Auth from "../components/Auth";
import Dishes from "../components/waiter/Dishes";
import SelectedList from "../components/waiter/SelectedList";
import AdminDishesList from "../components/admin/AdminDishesList";
import AdminUsersList from "../components/admin/AdminUsersList";
import AdminTagsList from "../components/admin/AdminTagsList";
import DoneDishesList from "../components/waiter/DoneList";
import DeclinedDishesList from "../components/waiter/DeclinedDishes";
import { UserDishesList } from "../components/user/UserDishesList";
import SelectedUserDishes from "../components/user/SelectedUserDishes";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  const onClick = () => {
    navigate("/login");
  };

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button onClick={onClick} type="primary">
          Back Home
        </Button>
      }
    />
  );
}

export const ROUTES_CONFIG = {
  public: [
    {
      path: "/login",
      element: <Auth />,
    },
    {
      path: "/:tableNumber",
      element: <UserDishesList />,
    },
    {
      path: "/selected-list",
      element: <SelectedUserDishes />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ],
  private: {
    ADMIN: [
      {
        path: "admin-panel",
        element: <AdminDishesList />,
      },
      {
        path: "admin-user-list",
        element: <AdminUsersList />,
      },
      {
        path: "admin-tags-list",
        element: <AdminTagsList />,
      },
      {
        path: "*",
        element: <AdminDishesList />,
      },
    ],
    WAITER: [
      {
        path: "dishes",
        element: <Dishes />,
      },
      {
        path: "selected-list",
        element: <SelectedList />,
      },
      {
        path: "done-list",
        element: <DoneDishesList />,
      },
      {
        path: "declined-list",
        element: <DeclinedDishesList />,
      },
      {
        path: "*",
        element: <Dishes />,
      },
    ],
    COOK: [
      {
        path: "cook-panel",
        element: <CookPanel />,
      },
      {
        path: "*",
        element: <CookPanel />,
      },
    ],
  },
};
