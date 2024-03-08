import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedPostsState {
  selectedPosts: { [key: string]: Post };
  tableNumber: number | null;
}

interface Post {
  name: string;
  description: string;
      price: {
        value: number;
        currency: string;
    };
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
  tableNumber: null
};

export const GuestSlice = createSlice({
  name: 'SelectedPosts',
  initialState,
  reducers: {
    addSelectedPostQuest: (state, action: PayloadAction<{ listId: string; post: Post }>) => {
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