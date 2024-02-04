import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { adminReducer as admin } from "./slices/admin";
import { serviceApi } from "../services/app.service";
import { userReducer as user } from "./slices/user";
import { doneListReducer as donelist} from "./slices/done-list";
import { postsReducer as posts} from "./slices/posts";
import { selectedPostsReducer as selectedPosts } from "./slices/selected-posts";
import { cookListReducer as cook } from "./slices/cook-list";
import { declinedListReducer as declinedList } from "./slices/declined-dishes";
import { adminUsersListReducer as adminUserList } from "./slices/admin-user-list";


export const store = configureStore({
	reducer: combineReducers({
	  [serviceApi.reducerPath]: serviceApi.reducer,
	  posts,
	  selectedPosts,
	  user,
	  cook,
	  admin,
	  adminUserList,
	  donelist,
	  declinedList ,
	}),
	middleware: (getDefaultMiddleware) =>
	  getDefaultMiddleware({
		serializableCheck: false,
	  })
		.concat([])
		.concat(serviceApi.middleware),
  });