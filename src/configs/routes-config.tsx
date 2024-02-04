import React from "react";
import CookPanel from "../components/Cook/CookPanel";
import Modalfr from "../components/Modalfr";
import Dishes from "../components/User/Dishes";
import SelectedList from "../components/User/SelectedList";
import AdminDishesList from "../components/admin/AdminPanel";
import AdminUserList from "../components/admin/AdminUserList";

export const ROUTES_CONFIG = {
	public: [
	  {
		path: "login",
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
		  element: <AdminUserList />,
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
  