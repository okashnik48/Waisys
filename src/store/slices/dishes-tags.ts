import { createSlice } from "@reduxjs/toolkit";
import DishesTagsService from "../../services/dishes-tags.service";

type InitialState = {
  options: { value: string; label: string }[];
};

const initialState: InitialState = {
  options: [],
};

const DishTagsSlice = createSlice({
  name: "dishTags",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addMatcher(
      DishesTagsService.endpoints.getTags.matchFulfilled,
      (state, action) => {
        state.options = Object.keys(action.payload).map((tag) => ({
          value: tag,
          label: tag,
        }));
      }
    );
  },
});

export const dishesTagsReducer = DishTagsSlice.reducer;
