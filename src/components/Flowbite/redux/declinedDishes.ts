import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DeclinedListState {
  declinedlist: Record<string, any>;
}

const initialState: DeclinedListState = {
  declinedlist: {},
};

const declinedListSlice = createSlice({
  name: 'declinedlist',
  initialState,
  reducers: {
    SetDeclinedDishesList: (state, action: PayloadAction<Record<string, any>>) => {
      state.declinedlist = { ...state.declinedlist, ...action.payload };
    },
    DeleteDeclinedDish: (state, action: PayloadAction<string>) => {
      delete state.declinedlist[action.payload];
    },
  },
});

export const { SetDeclinedDishesList, DeleteDeclinedDish } = declinedListSlice.actions;

export default declinedListSlice.reducer;