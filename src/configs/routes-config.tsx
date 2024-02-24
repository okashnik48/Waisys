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

export const ROUTES_CONFIG = {
  public: [
    {
      path: "*",
      element: <Auth />,
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
        path: "declin-list",
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
