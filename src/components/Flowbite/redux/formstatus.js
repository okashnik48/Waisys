import { createSlice } from "@reduxjs/toolkit";

import { useSelector, useDispatch } from "react-redux";

export const formsstatus = createSlice({
  name: "formsstatus",
  initialState: {
    formsStatus: {
      Reg: true,
      AdminDishList: false,
      AdminUserList: true,
      AdminModalAdd: false,
      AdminModalAddDish: false,
      ReadyDishes: false,
      DishesList: true,
      SelectedDishesList: false,
      DeclinedDishList: false,
    },
  },
  reducers: {
    SetStatus: (state, action) => {
      console.log(action.payload)
      state.formsStatus[action.payload.formName] = action.payload.status;
    },
  },
});
export const { SetStatus } = formsstatus.actions;

export default formsstatus.reducer;
