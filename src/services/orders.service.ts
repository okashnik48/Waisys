import { serviceApi } from "./app.service";
import { toast } from "react-toastify";

import OrdersTypes from "../store/types/orders-types";

const ordersService = serviceApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<OrdersTypes.API.GetOrdersReply, OrdersTypes.API.GetOrdersRequest>({
      query: () => ({
        url: "orders",
        method: "GET",
      }),
      providesTags: ["orders"],
    }),
    PostOrder: builder.mutation<OrdersTypes.API.PostOrderReply, OrdersTypes.API.PostOrderRequest>({
      query: (Request) => ({
        url: "orders",
        method: "POST",
        body: Request.body,
      }),
      invalidatesTags: ["orders"],
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
    PatchOrder: builder.mutation<OrdersTypes.API.PatchOrderDishReply, OrdersTypes.API.PatchOrderDishRequest>({
      query: (Request) => ({
        url: `orders/dishes/${Request.id}`,
        method: "PATCH",
        body: Request.body,
      }),
      invalidatesTags: ["orders"],
      onQueryStarted(arg, api) {
        api.queryFulfilled
          .then(() => {
            toast.success("Успішно");
          })
          .catch(({ data }) => {
            toast.error(data.error);
          });
      },
    }),
    DeleteOrder: builder.mutation<OrdersTypes.API.DeleteOrderReply, OrdersTypes.API.DeleteOrderRequest>({
      query: (Request) => ({
        url: `orders:${Request.id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["orders"],
    }),
    GetCompletedDishes: builder.query<OrdersTypes.API.GetCompletedDishesReply, OrdersTypes.API.GetCompletedDishesRequest>({
      query: () => ({
        url: "orders/dishes/completed",
        method: "GET",
      }),
      providesTags: ["completed"],

    }),
    DeleteDeliveredDish: builder.mutation<null, string>({
      query: (id) => ({
        url: `orders/dishes/${id}`,
        method: "Delete",
      }),
      invalidatesTags: ["completed", "declined"],
      onQueryStarted(arg, api) {
        api.queryFulfilled
          .then(() => {
            toast.success("Успішно");
          })
          .catch(({ data }) => {
            toast.error(data.error);
          });
      },
    }),
    GetDeclinedDishes: builder.query<OrdersTypes.API.GetGetDeclinedDishesReply, OrdersTypes.API.GetGetDeclinedDishesRequest>({
      query: () => ({
        url: "orders/dishes/declined",
        method: "GET",
      }),
      providesTags: ["declined"],
    }),
  }),
});

export default ordersService;
