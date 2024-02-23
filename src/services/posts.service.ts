import { serviceApi } from "./app.service";

type dishesReply = {
    name: string;
    description: string;
    price: number;
    image: string;
    createdAt: string;
    tags: Record<string, string>;
    id: string;
    post: string;

  }[]

const postService = serviceApi.injectEndpoints({
    endpoints: (builder) => ({
        dishes: builder.query<dishesReply, any>({
            query: () => ({
                url: 'dishes',
                method: 'GET',
            }),
        }),
    })
})

export default postService;