import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AdminUsersTypes from "../types/admin-types/adminUsers-types";

interface AdminUsersState {
  newUser: AdminUsersTypes.NewUser;
}

const initialState: AdminUsersState = {
  newUser: {
    firstName: "",
    lastName: "",
    role: "",
    username: "",
    password: "",
  },
};

export const AdminUsersListSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    SetFieldNewUser: (state, action: PayloadAction<{ fieldname: keyof AdminUsersTypes.NewUser; value: string }>) => {
      state.newUser[action.payload.fieldname] = action.payload.value;
    },
    ClearNewUser: (state, action) =>{
      state.newUser = {
        firstName: "",
        lastName: "",
        role: "",
        username: "",
        password: "",
      }
    }
  },
});

export const {
  SetFieldNewUser,
  ClearNewUser,
} = AdminUsersListSlice.actions;

export const adminUsersListReducer = AdminUsersListSlice.reducer;
