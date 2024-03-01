import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { adminReducer as admin } from "./slices/admin";
import { serviceApi } from "../services/app.service";
import { userReducer as user } from "./slices/user";
import { selectedPostsReducer as selectedPosts } from "./slices/selected-posts";
import { adminUsersListReducer as adminUserList } from "./slices/admin-user-list";


export const store = configureStore({
	reducer: combineReducers({
	  [serviceApi.reducerPath]: serviceApi.reducer,
	  selectedPosts,
	  user,
	  admin,
	  adminUserList,
	}),
	middleware: (getDefaultMiddleware) =>
	  getDefaultMiddleware({
		serializableCheck: false,
	  })
		.concat([])
		.concat(serviceApi.middleware),
  });