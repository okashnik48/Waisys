import { serviceApi } from "./app.service";

type OrderDish = {
    name: string,
    image: string,
    description: string,
    id: string;
    comment: string;
    quantity: number;
}
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
    tableNumber: number,
    name: string,
    description: string,
    image: string,
    comment: string,
    quantity: number
}
type CompletedDishesReply = Record<string, CompletedDish>
const ordersService = serviceApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<ordersGetReply, any>({
      query: () => ({
        url: "orders",
        method: "GET",
      }),
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
    }),
    DeleteOrder: builder.mutation<any, DeleteOrderRequest>({
      query: (Request) => ({
        url: `orders:${Request.id}`,
        method: "PATCH",
      }),
    }),
    GetCompletedDishes : builder.query<CompletedDishesReply, any>(
      {
        query: () => ({
          url: "orders/dishes/completed",
          method: "GET"
        })
      }),
      DeleteDeliveredDish: builder.mutation<any, string>(
        {
          query: (id) => ({
            url: `orders/dishes/${id}`,
            method: "Delete"
          })
        }),
  }),
});

export default ordersService;
