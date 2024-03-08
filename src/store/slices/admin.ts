import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Post {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  tags: Record<string, string>;
}

type NewDish = {
  name: string;
  description: string;
  price: {
    value: number | null;
    currency: string;
};
  image: string;
  tags: Record<string, string>;
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
    name: "",
    description: "",
    price: {
      value: null,
      currency: "UAH"
    },
    image: "",
    tags: {},
  },
  modalStatus: {
    modalAddDishStatus: false,
    modalAddUSerStatus: false,
  },
};

const AdminSlice = createSlice({
  name: "admin",
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
      action: PayloadAction<{
        id: string;
        fieldname: string;
        value: string | number | Record<string, string>;
      }>
    ) => {
      //чого так? чого не можна написати fieldname: keyof Post
      (state.posts[action.payload.id] as any)[action.payload.fieldname] =
        action.payload.value;
    },
    SetFieldNewDish: (
      state,
      action: PayloadAction<{
        fieldname: string;
        value: string | number | Record<string, string> | {
          value: number | null;
          currency: string;
      };
      }>
    ) => {
      (state.newDish as any)[action.payload.fieldname] = action.payload.value;
    },
    AddTagNewDish: (state, action: PayloadAction<Record<string, string>>) => {
      state.newDish.tags = {...state.newDish.tags, ...action.payload}
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
    ClearNewDish: (state, action) =>{
      state.newDish = {
        name: "",
        description: "",
        price: {
          value: null,
          currency: "UAH"
        },
        image: "",
        tags: {},
      }
    }
  },
});

export const {
  AddNewPost,
  RemovePost,
  SetFieldForChangedDish,
  SetFieldNewDish,
  AddTagNewDish,
  SetAddUserModal,
  SetAddDishModal,
  ChangeDish,
  ClearNewDish,
} = AdminSlice.actions;

export const adminReducer = AdminSlice.reducer;
