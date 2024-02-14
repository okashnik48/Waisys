import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  username: string;
  password: string;
}

interface NewUser {
  firstName: string,
  lastName: string,
  role: string,
  username: string,
  password: string,
  [key: string]: string;
}

interface AdminUsersState {
  userlist: Record<string, User>;
  newuser: NewUser;
}

const initialState: AdminUsersState = {
  userlist: {},
  newuser: {
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
    SetUsersList: (state, action: PayloadAction<Record<string, User>>) => {
      state.userlist = action.payload;
    },
    AddNewUser: (state, action: PayloadAction<User>) => {
      state.userlist[action.payload.id] = action.payload;
    },
    DeleteUser: (state, action: PayloadAction<{ id: string }>) => {
      delete state.userlist[action.payload.id];
    },
    ChangeUser: (state, action: PayloadAction<{ user: User }>) => {
      state.userlist[action.payload.user.id] = action.payload.user;
    },
    ChangeCurrentField: (state, action: PayloadAction<{ id: string; fieldname: string; value: string }>) => {
      (state.userlist[action.payload.id] as any)[action.payload.fieldname] = action.payload.value;
    },
    SetFieldNewUser: (state, action: PayloadAction<{ fieldname: string; value: string }>) => {
      state.newuser[action.payload.fieldname] = action.payload.value;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  SetUsersList,
  AddNewUser,
  DeleteUser,
  ChangeUser,
  ChangeCurrentField,
  SetFieldNewUser,
} = AdminUsersListSlice.actions;

export const adminUsersListReducer = AdminUsersListSlice.reducer;
