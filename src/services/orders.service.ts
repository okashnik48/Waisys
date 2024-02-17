import { serviceApi } from "./app.service";

type OrderDish = {
  name: string;
  image: string;
  description: string;
  id: string;
  comment: string;
  quantity: number;
};
type ordersGetReply = Record<string, OrderDish>;

type DishToCreateOrder = {
  id: string;
  comment: string;
  quantity: number;
};

type DishCreateRequest = {
  body: {
    dishes: Array<DishToCreateOrder>;
    tableNumber: number;
  };
};
type DishChangeRequest = {
  id: string;
  body: {
    isAccepted?: boolean;
    isCompleted?: boolean;
    isDeclined?: boolean;
  };
};
type DeleteOrderRequest = {
  id: string;
};
type CompletedDish = {
  tableNumber: number;
  name: string;
  description: string;
  image: string;
  comment: string;
  quantity: number;
};
type CompletedDishesReply = Record<string, CompletedDish>;
const ordersService = serviceApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<ordersGetReply, any>({
      query: () => ({
        url: "orders",
        method: "GET",
      }),
      providesTags: ["orders"],
    }),
    PostOrder: builder.mutation<any, DishCreateRequest>({
      query: (Request) => ({
        url: "orders",
        method: "POST",
        body: Request.body,
      }),
    }),
    PatchOrder: builder.mutation<any, DishChangeRequest>({
      query: (Request) => ({
        url: `orders/dishes/${Request.id}`,
        method: "PATCH",
        body: Request.body,
      }),
      // onQueryStarted: async ({ id, body }, { dispatch, queryFulfilled }) => {
      // queryFulfilled.then(() => {
      //   dispatch(ordersService.util.updateQueryData("getOrders", undefined, (draft) => {
      //     draft![id] = {
      //       ...draft![id],
      //       ...body,
      //     }
      //   }))
      // })
      // }
    }),
    DeleteOrder: builder.mutation<any, DeleteOrderRequest>({
      query: (Request) => ({
        url: `orders:${Request.id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["orders"],
    }),
    GetCompletedDishes: builder.query<CompletedDishesReply, any>({
      query: () => ({
        url: "orders/dishes/completed",
        method: "GET",
      }),
    }),
    DeleteDeliveredDish: builder.mutation<any, string>({
      query: (id) => ({
        url: `orders/dishes/${id}`,
        method: "Delete",
      }),
    }),
    GetDeclineddDishes: builder.query<CompletedDishesReply, any>({
      query: () => ({
        url: "orders/dishes/declined",
        method: "GET",
      }),
    }),
  }),
});

export default ordersService;
