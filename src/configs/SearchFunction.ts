import { UseFormGetValues } from "react-hook-form";
import DishesTypes from "../store/types/dishes-types";
type DefaultValues = {
    searchText: string;
    searchTags: string[];
    sortOption: "name" | "priceDesc" | "priceAsc" | "";
  };
export const SearchFunction = (posts: DishesTypes.DishForList[] | DishesTypes.API.GetDishesReply, getValues: UseFormGetValues<DefaultValues>) => {
    let NewPosts = posts.filter((Dish) =>
      Dish.name.toLowerCase().includes(getValues("searchText").toLowerCase())
    );
    if (getValues("searchTags").length !== 0) {
      NewPosts = NewPosts.filter((dish) => {
        return getValues("searchTags").every((element) =>
          Object.keys(dish.tags).includes(element)
        );
      });
    }

    if (getValues("sortOption")) {
      if (getValues("sortOption") === "name") {
        NewPosts.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      } else if (getValues("sortOption") === "priceAsc") {
        NewPosts.sort((a, b) => {
          return a.price.value - b.price.value;
        });
      } else if (getValues("sortOption") === "priceDesc") {
        NewPosts.sort((a, b) => {
          return b.price.value - a.price.value;
        });
      }
    }
    return NewPosts ;
  }