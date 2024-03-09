import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import { initPosts, addPost, removePost, setComment } from "./posts";
import DishesTypes from "../types/dishes-types";

interface SelectedPostsState {
  selectedPosts: { [key: string]: DishesTypes.SelectedDish };
  tableNumber: string;
}

const initialState: SelectedPostsState = {
  selectedPosts: {},
  tableNumber: "",
};

export const SelectedPostsSlice = createSlice({
  name: "SelectedPosts",
  initialState,
  reducers: {
    addSelectedPost: (
      state,
      action: PayloadAction<{ listId: string; post: DishesTypes.SelectedDish }>
    ) => {
      let isPostAdded = false;
      if (Object.keys(state.selectedPosts).length !== 0) {
        Object.values(state.selectedPosts).map((post) => {
          if (
            post.id === action.payload.post.id &&
            post.comment === action.payload.post.comment
          ) {
            state.selectedPosts[post.selectedPostId].count +=
              action.payload.post.count;
            isPostAdded = true;
          }
        });
      } else {
        state.selectedPosts[action.payload.listId] = action.payload.post;
      }
      if (!isPostAdded) {
        state.selectedPosts[action.payload.listId] = action.payload.post;
      }
    },
    removeSelectedPost: (state, action: PayloadAction<{ listId: string }>) => {
      delete state.selectedPosts[action.payload.listId];
    },
    addTableNumber: (state, action: PayloadAction<string>) => {
      state.tableNumber = action.payload;
    },
    clearSelectedPosts: (state) => {
      state.selectedPosts = {};
      state.tableNumber = "";
    },
  },
});

export const {
  addSelectedPost,
  removeSelectedPost,
  addTableNumber,
  clearSelectedPosts,
} = SelectedPostsSlice.actions;

export const selectedPostsReducer = SelectedPostsSlice.reducer;
