import { toast } from "react-toastify";
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
            onQueryStarted(arg, api) {
                api.queryFulfilled
                  .then((data) => {
                    toast.success("Success");
                  })
                  .catch(({ data }) => {
                    toast.error(data.error);
                  });
              },
            providesTags: ["tags", "admin-dish"],
        }),
        
    })
})

export default postService;