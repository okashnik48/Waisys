import { toast } from "react-toastify";
import { serviceApi } from "./app.service";

export type dishesReply = {
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
    count? : number;
    comment? : string;
  }[]

const postService = serviceApi.injectEndpoints({
    endpoints: (builder) => ({
        dishes: builder.query<dishesReply, any>({
            query: () => ({
                url: 'dishes',
                method: 'GET',
            }),
            providesTags: ["tags", "admin-dish"],
        }),
        
    })
})

export default postService;