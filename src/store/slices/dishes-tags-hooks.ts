import DishesTagsService from "../../services/dishes-tags.service";
import { RootState, useAppSelector } from "../store-hooks";

export const  dishesTagsOptionsSelector = (state: RootState) => state.dishesTags.options; 

// export const useDishesTagsOptions = () =>
//   useAppSelector(dishesTagsOptionsSelector);
