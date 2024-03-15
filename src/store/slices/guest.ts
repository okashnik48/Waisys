import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import DishesTypes from '../types/dishes-types';
interface SelectedPostsState {
  selectedPosts: { [key: string]: DishesTypes.SelectedDishForList };
  tableNumber: number | null;
}

const initialState: SelectedPostsState = {
  selectedPosts: {},
  tableNumber: null
};

export const GuestSlice = createSlice({
  name: 'SelectedPosts',
  initialState,
  reducers: {
    addSelectedPostQuest: (state, action: PayloadAction<{ listId: string; post: DishesTypes.SelectedDishForList }>) => {
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
    },
    removeSelectedPostQuest: (state, action: PayloadAction<{ listId: string }>) => {
      delete state.selectedPosts[action.payload.listId];
    },
    SetTableNumberForQuest: (state, action: PayloadAction<number>) =>{
        state.tableNumber = action.payload
    },
    clearSelectedPostsQuest: (state) => {
      state.selectedPosts = {};
      state.tableNumber = null
    }
  },
});

export const { addSelectedPostQuest, removeSelectedPostQuest, clearSelectedPostsQuest, SetTableNumberForQuest} = GuestSlice.actions;

export const guestReducer = GuestSlice.reducer;