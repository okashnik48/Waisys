import { serviceApi } from "./app.service";

type ordersGetRequest = {
    accessToken: string,
}
type ordersGetReply = {
    orders: {
      id: string;
      dishes: {
        id: string;
        comment: string;
        quantity: number;
      }[];
      createdBy: string;
      isDone: boolean;
      tableNumber: number;
    }[];
  };

  type DishToCreateOrder = {
    id: string,
    comment: string,
    quantity: number
  }

  type DishCreateRequest = {
    accessToken: string,
    body: {
        dishes: Array<DishToCreateOrder>, 
        tableNumber: number
    },
};
type DishChangeRequest = 
{
    id: string,
    accessToken: string,
    body: {
        isAccepted?: boolean,
        isCompleted?: boolean,
        isDeclined?: boolean
    }
  }
type DeleteOrderRequest ={
    accessToken: string,
    id: string,
}
const ordersService = serviceApi.injectEndpoints({
    endpoints: (builder) => ({
        getOrders: builder.query<ordersGetReply, ordersGetRequest>({
            query: (accessToken) => ({
                url: 'orders',
                headers: { Authorization: `Bearer ${accessToken}` },
                method: 'GET',
            }),
        }),
        PostOrder: builder.mutation<any, DishCreateRequest>({
            query: (Request) => ({
                url: 'orders',
                headers: { Authorization: `Bearer ${Request.accessToken}` },
                method: 'POST',
                body: Request.body,
            }),
        }),
        PatchOrder: builder.mutation<any, DishChangeRequest>({
            query: (Request) => ({
                url: `orders/${Request.id}`,
                headers: { Authorization: `Bearer ${Request.accessToken}` },
                method: 'PATCH',
                body: Request.body
            }),
        }),
        DeleteOrder: builder.mutation<any, DeleteOrderRequest>(
            {
                query: (Request) => ({
                    url: `orders:${Request.id}`,
                    headers: { Authorization: `Bearer ${Request.accessToken}` },
                    method: 'PATCH',
                }),
            }
        )
    })
})

export default ordersService;