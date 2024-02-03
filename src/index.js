import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import postsReducer from "./components/Flowbite/redux/posts";
import selecetedPostsReducer from "./components/Flowbite/redux/SelectedPosts";
import userReducer from "./components/Flowbite/redux/user";
import cookReducer from "./components/Flowbite/redux/cooklist";
import adminReducer from "./components/Flowbite/redux/admin";
import adminUserList from "./components/Flowbite/redux/adminUserList";
import FormsStatus from "./components/Flowbite/redux/formstatus";
import DoneListReducer from "./components/Flowbite/redux/donelist";
import DeclineListReducer from "./components/Flowbite/redux/declinedDishes";
import { serviceApi } from "./services/app.service";
// As of React 18



// export type RootState = ReturnType<typeof store.getState>

// const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(
//   <Provider store={store}>
//     <App />
//   </Provider>
// );

// export default App;

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
// ReactDOM.render(<App />, document.getElementById("root"));
