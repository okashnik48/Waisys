import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
}

interface PostsState {
  posts: Record<string, Post>;
}

interface AddPostPayload {
  id: string;
  post: Post;
}

interface RemovePostPayload {
  id: string;
}

interface CounterPayload {
  id: string;
}

interface CommentPayload {
  id: string;
  comment: string;
}

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: {}
  } as PostsState,
  reducers: {
    initPosts: (state, action: PayloadAction<PostsState>) => {
      state.posts = action.payload.posts;
    },
    addPost: (state, action: PayloadAction<AddPostPayload>) => {
      state.posts[action.payload.id] = action.payload.post;
    },
    removePost: (state, action: PayloadAction<RemovePostPayload>) => {
      delete state.posts[action.payload.id];
    },
    counterIncrement: (state, action: PayloadAction<CounterPayload>) => {
      state.posts[action.payload.id].count++;
    },
    counterDecrement: (state, action: PayloadAction<CounterPayload>) => {
      state.posts[action.payload.id].count--;
    },
    setComment: (state, action: PayloadAction<CommentPayload>) => {
      state.posts[action.payload.id].comment = action.payload.comment;
    },
    setCountDefault: (state, action: PayloadAction<CounterPayload>) => {
      state.posts[action.payload.id].count = 1;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  initPosts,
  addPost,
  removePost,
  counterIncrement,
  counterDecrement,
  setComment,
  setCountDefault,
} = postsSlice.actions;

export const postsReducer = postsSlice.reducer;