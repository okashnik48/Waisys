import { serviceApi } from "../app.service";

type Dish = {
    name: string,
    description: string,
    price: number | null,
    image: string,
    tags: string    
}



type CreateDishRequest = {
    body: Dish,
}

type ChangeDishRequest = CreateDishRequest

type DeleteDishRequest = {
    id: string,
}

const adminDishesService = serviceApi.injectEndpoints({
    endpoints: (builder) => ({
        createDish: builder.mutation<any, CreateDishRequest>({
            query: (Request) => ({
                url: 'admin/dishes',
                method: 'POST',
                body: Request.body
            }),
        }),
        changeDish: builder.mutation<any, ChangeDishRequest>({
            query: (Request) => ({
                url: 'admin/dishes',
                method: 'PATCH',
                body: Request.body
            }),
        }),
        deleteDish: builder.mutation<any, DeleteDishRequest>({
            query: (Request) => ({
                url: `admin/dishes/${Request.id}`,
                method: 'DELETE',
            }),
        }),
    })
})

export default adminDishesService;