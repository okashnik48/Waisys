namespace DishesTypes {
  export type Dish = {
    name: string;
    description: string;
    price: {
      value: number;
      currency: string;
    };
    image: string;
    createdAt: string;
    tags: Record<string, string>;
    id: string;
    post: string;
    count?: number;
    comment?: string;
  };

  export type SelectedDishForList = {
    name: string;
    description: string;
    price: {
      value: number;
      currency: string;
    };
    image: string;
    createdAt: string;
    tags: Record<string, string>;
    id: string;
    post: string;
    count: number;
    comment: string;
    selectedPostId: string;
  };

  export type DishForList = {
    name: string;
    description: string;
    price: {
      value: number;
      currency: string;
    };
    image: string;
    createdAt: string;
    tags: Record<string, string>;
    id: string;
    post: string;
    count: number;
    comment: string;
  };

  export type SelectedDish = Dish & {
    selectedPostId: string;
  };

  export namespace API {
    export type GetDishesReply = Dish[];
    export type GetDishesRequest = null;

  }
}

export default DishesTypes;
