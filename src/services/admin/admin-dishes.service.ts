import { toast } from "react-toastify";
import { serviceApi } from "../app.service";
import AdminDishesTypes from "../../store/types/admin-types/adminDishes-types";

const adminDishesService = serviceApi.injectEndpoints({
  endpoints: (builder) => ({
    createDish: builder.mutation<null, AdminDishesTypes.API.CreateDishRequest>({
      query: (Request) => ({
        url: "admin/dishes",
        method: "POST",
        body: Request.body,
      }),
      invalidatesTags: ["admin-dish"],
      async onQueryStarted(arg, api) {
        api.queryFulfilled
          .then(() => {
            toast.success("Успішно");
          })
          .catch((data ) => {
            console.log(data)
            toast.error("Помилка даних");
          });
      },
    }),
    changeDish: builder.mutation<null, AdminDishesTypes.API.ChangeDishRequest>({
      query: (Request) => ({
        url: `admin/dishes/${Request.id}`,
        method: "PATCH",
        body: Request.body,
      }),
      invalidatesTags: ["admin-dish"],
      async onQueryStarted(arg, api) {
        api.queryFulfilled
          .then(() => {
            toast.success("Успішно");
          })
          .catch((data ) => {
            console.log(data)
            toast.error("Помилка даних");
          });
      },
    }),
    deleteDish: builder.mutation<null, AdminDishesTypes.API.DeleteDishRequest>({
      query: (Request) => ({
        url: `admin/dishes/${Request.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["admin-dish"],
      async onQueryStarted(arg, api) {
        api.queryFulfilled
          .then(() => {
            toast.success("Успішно");
          })
          .catch((data ) => {
            console.log(data)
            toast.error("Помилка даних");
          });
      },
    }),
  }),
});

export default adminDishesService;
