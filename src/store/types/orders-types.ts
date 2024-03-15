namespace OrdersTypes {
  export type OrderDish = {
    name: string;
    image: string;
    description: string;
    id: string;
    comment: string;
    quantity: number;
    createdAt: string;
    isAccepted?: boolean;
    isCompleted?: boolean;
    isDeclined?: boolean;
  };
  export type DishToCreateOrder = {
    id: string;
    comment: string;
    quantity: number;
  };
  export type CompletedDish = {
    tableNumber: number;
    name: string;
    description: string;
    image: string;
    comment: string;
    quantity: number;
  };
  export namespace API {
    export type GetOrdersReply = Record<string, OrderDish>;
    export type GetOrdersRequest = null;

    export type PostOrderReply = null;

    export type PostOrderRequest = {
      body: {
        dishes: Array<DishToCreateOrder>;
        tableNumber: number;
      };
    };
    export type PatchOrderDishReply = null;
    export type PatchOrderDishRequest = {
      id: string;
      body: {
        isAccepted?: boolean;
        isCompleted?: boolean;
        isDeclined?: boolean;
      };
    };

    export type DeleteOrderRequest = {
      id: string;
    };
    export type DeleteOrderReply = null;

    export type GetCompletedDishesReply = Record<string, CompletedDish>;
    export type GetCompletedDishesRequest = null;

    export type GetGetDeclinedDishesReply = Record<string, CompletedDish>;
    export type GetGetDeclinedDishesRequest = null;
  }
}

export default OrdersTypes;
