import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import { initPosts, addPost, removePost, setComment } from './posts';

interface SelectedPostsState {
  selectedPosts: { [key: string]: Post };
  tableNumber: string;
}

interface Post {
  name: string;
  description: string;
  price: number;
  image: string;
  createdAt: string;
  tags: Record<string, string>;
  id: string;
  post: string;
  count: number;
  comment: string;
  selectedPostId: string;
}

const initialState: SelectedPostsState = {
  selectedPosts: {},
  tableNumber: ''
};

export const SelectedPostsSlice = createSlice({
  name: 'SelectedPosts',
  initialState,
  reducers: {
    addSelectedPost: (state, action: PayloadAction<{ listId: string; post: Post }>) => {
      let isPostAdded = false;
      if (Object.keys(state.selectedPosts).length !== 0) {
        Object.values(state.selectedPosts).map((post) => {
          if (post.id === action.payload.post.id && post.comment === action.payload.post.comment) {
            state.selectedPosts[post.selectedPostId].count += action.payload.post.count;
            isPostAdded = true;
          }
        });
      } else {
        state.selectedPosts[action.payload.listId] = action.payload.post;
      }
      if (!isPostAdded) {
        state.selectedPosts[action.payload.listId] = action.payload.post;
      }
      console.log(state.selectedPosts);
    },
    removeSelectedPost: (state, action: PayloadAction<{ listId: string }>) => {
      delete state.selectedPosts[action.payload.listId];
    },
    addTableNumber: (state, action: PayloadAction<string>) => {
      state.tableNumber = action.payload;
    },
    clearSelectedPosts: (state) => {
      state.selectedPosts = {};
      state.tableNumber = '';
    }
  },
});

export const { addSelectedPost, removeSelectedPost, addTableNumber, clearSelectedPosts } = SelectedPostsSlice.actions;

export const selectedPostsReducer = SelectedPostsSlice.reducer;