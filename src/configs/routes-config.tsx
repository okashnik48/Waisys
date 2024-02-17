import React from "react";
import CookPanel from "../components/Cook/CookPanel";
import Modalfr from "../components/Modalfr";
import Dishes from "../components/User/Dishes";
import SelectedList from "../components/User/SelectedList";
import AdminDishesList from "../components/admin/AdminDishesList";
import AdminUsersList from "../components/admin/AdminUsersList";
import DoneDishesList from "../components/User/DoneList";
import DeclinedDishesList from "../components/User/DeclinedDishes";

export const ROUTES_CONFIG = {
  public: [
    {
      path: "*",
      element: <Modalfr />,
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
