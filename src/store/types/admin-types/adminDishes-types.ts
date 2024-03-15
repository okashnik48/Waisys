namespace AdminDishesTypes {
    export type Dish = {
        name: string;
        description: string;
        price: {
          value: number | null;
          currency: string;
      };
        image: string;
        tags: Record<string, string>;
      };
    export namespace API {
        export type CreateDishRequest = {
            body: Dish;
          };
          
          export type ChangeDishRequest = {
            id: string;
            body: Dish;
          };
          
          export type DeleteDishRequest = {
            id: string;
          };
    }
  }
  
export default AdminDishesTypes;