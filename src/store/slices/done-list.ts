import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface DoneListState {
  donelist: Record<string, any>;
}

const initialState: DoneListState = {
  donelist: {}
};

const donelistSlice = createSlice({
  name: 'donelist',
  initialState,
  reducers: {
    SetDoneDishesList: (state, action: PayloadAction<Record<string, any>>) => {
      state.donelist = { ...state.donelist, ...action.payload };
    },
    DeleteDoneList: (state, action: PayloadAction<string>) => {
      delete state.donelist[action.payload];
    }
  }
});

export const { SetDoneDishesList, DeleteDoneList } = donelistSlice.actions;

export const doneListReducer =  donelistSlice.reducer;