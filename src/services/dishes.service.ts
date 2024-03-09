import { toast } from "react-toastify";
import { serviceApi } from "./app.service";
import DishesTypes from "../store/types/dishes-types";

const postService = serviceApi.injectEndpoints({
  endpoints: (builder) => ({
    dishes: builder.query<
      DishesTypes.API.GetDishesReply,
      DishesTypes.API.GetDishesRequest
    >({
      query: () => ({
        url: "dishes",
        method: "GET",
      }),
      providesTags: ["tags", "admin-dish"],
    }),
  }),
});

export default postService;
