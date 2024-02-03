import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Post {
  id: string
  name: string;
  description: string;
  price: number;
  image: string;
  tags: string; 
}

type NewDish = {
  name: string;
  description: string;
  price: number | null;
  image: string;
  tags: string;
};

type ModalStatus = {
  modalAddDishStatus: boolean;
  modalAddUSerStatus: boolean;
};

interface PostsState {
  posts: Record<string, Post>;
  newDish: NewDish;
  modalStatus: ModalStatus;
}

const initialState: PostsState = {
  posts: {},
  newDish: {
    name: '',
    description: '',
    price: null,
    image: '',
    tags: '',
  },
  modalStatus: {
    modalAddDishStatus: false,
    modalAddUSerStatus: false,
  },
};

const AdminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    AddNewPost: (state, action: PayloadAction<Post>) => {
      state.posts[action.payload.id] = action.payload;
    },
    RemovePost: (state, action: PayloadAction<string>) => {
      delete state.posts[action.payload];
    },
    SetFieldForChangedDish: (
      state,
      action: PayloadAction<{ id: string; fieldname: string; value: string | number }>
    ) => {
      console.log(action.payload)
      state.posts[action.payload.id][action.payload.fieldname] = action.payload.value;
    },
    SetFieldNewDish: (
      state,
      action: PayloadAction<{ fieldname: string; value: string | number }>
    ) => {
      state.newDish[action.payload.fieldname]  = action.payload.value;
    },
    SetAddUserModal: (state, action: PayloadAction<{ status: boolean }>) => {
      state.modalStatus.modalAddUSerStatus = action.payload.status;
    },
    SetAddDishModal: (state, action: PayloadAction<{ status: boolean }>) => {
      state.modalStatus.modalAddDishStatus = action.payload.status;
    },
    ChangeDish: (state, action: PayloadAction<{ id: string; post: Post }>) => {
      state.posts[action.payload.id] = action.payload.post;
    },
  },
});

export const {
  AddNewPost,
  RemovePost,
  SetFieldForChangedDish,
  SetFieldNewDish,
  SetAddUserModal,
  SetAddDishModal,
  ChangeDish,
} = AdminSlice.actions;

export default AdminSlice.reducer;