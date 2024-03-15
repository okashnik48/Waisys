import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AdminDishesTypes from "../types/admin-types/adminDishes-types";


type ModalStatus = {
  modalAddDishStatus: boolean;
  modalAddUSerStatus: boolean;
};

interface PostsState {
  newDish: AdminDishesTypes.Dish;
  modalStatus: ModalStatus;
}

const initialState: PostsState = {
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
    // SetFieldNewDish: (
    //   state,
    //   action: PayloadAction<{
    //     fieldname: keyof AdminDishesTypes.Dish;
    //     value: string  | Record<string, string> | {
    //       value: number | null;
    //       currency: string;
    //   };
    //   }>
    // ) => {
    //   state.newDish[action.payload.fieldname] = action.payload.value;
    // },
    AddTagNewDish: (state, action: PayloadAction<Record<string, string>>) => {
      state.newDish.tags = {...state.newDish.tags, ...action.payload}
    },
    SetAddUserModal: (state, action: PayloadAction<{ status: boolean }>) => {
      state.modalStatus.modalAddUSerStatus = action.payload.status;
    },
    SetAddDishModal: (state, action: PayloadAction<{ status: boolean }>) => {
      state.modalStatus.modalAddDishStatus = action.payload.status;
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
  
  AddTagNewDish,
  SetAddUserModal,
  SetAddDishModal,
  ClearNewDish,
} = AdminSlice.actions;

export const adminReducer = AdminSlice.reducer;
