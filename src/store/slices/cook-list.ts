import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';

type Dish = {
  id: string;
  comment: string;
}

interface CooklistState {
  cooklist: {
    [id: string]: {
      isAccepted: boolean;
    };
  };
}

const initialState: CooklistState = {
  cooklist: {},
};

const CookSlice = createSlice({
  name: 'cooklist',
  initialState,
  reducers: {
    SetDishesList: (state, action: PayloadAction<{ [id: string]: { isAccepted: boolean } }>) => {
      state.cooklist = { ...state.cooklist, ...action.payload };
    },
    AcceptDish: (state, action: PayloadAction<{ id: string }>) => {
      state.cooklist[action.payload.id].isAccepted = true;
    },
    CancelAcceptDish: (state, action: PayloadAction<{ id: string }>) => {
      state.cooklist[action.payload.id].isAccepted = false;
    },
    CompleteDish: (state, action: PayloadAction<{ id: string }>) => {
      delete state.cooklist[action.payload.id];
    },
  },
});

export const { SetDishesList, AcceptDish, CancelAcceptDish, CompleteDish } = CookSlice.actions;

export const cookListReducer = CookSlice.reducer;