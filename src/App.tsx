import React, { useEffect, useState } from "react";

// import Waiter from "./components/layouts/Waiter";
import Waiter from "./components/layouts/Waiter";
import Admin from "./components/layouts/Admin"
import Coocker from "./components/layouts/Cooker";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Provider, useDispatch, useSelector } from "react-redux";

import postsReducer from "./components/Flowbite/redux/posts"
import selecetedPostsReducer from "./components/Flowbite/redux/SelectedPosts";
import userReducer from "./components/Flowbite/redux/user";
import cookReducer from "./components/Flowbite/redux/cooklist";
import adminReducer from "./components/Flowbite/redux/admin";
import adminUserList from "./components/Flowbite/redux/adminUserList";
import DoneListReducer from "./components/Flowbite/redux/donelist";
import DeclineListReducer from "./components/Flowbite/redux/declinedDishes";
import { serviceApi } from "./services/app.service";

import RoleRouter from "./components/LoginComponents/RoleRouter";

import type { TypedUseSelectorHook } from 'react-redux'

import "./styles/Tailwind.css";

export const store = configureStore({
  reducer: combineReducers({
    [serviceApi.reducerPath]: serviceApi.reducer,
    posts: postsReducer,
    selectedPosts: selecetedPostsReducer,
    user: userReducer,
    cook: cookReducer,
    admin: adminReducer,
    adminUserList: adminUserList,
    donelist: DoneListReducer,
    declinedlist: DeclineListReducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat([])
      .concat(serviceApi.middleware),
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(serviceApi.middleware),
});


export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export type RootState = ReturnType<typeof store.getState>

function App() {
  return (
    <Provider store={store}>
      <RoleRouter />;
    </Provider>
  );
}


export default App;
