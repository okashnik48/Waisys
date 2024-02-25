import { toast } from "react-toastify";
import { serviceApi } from "../app.service";

type Dish = {
  name: string;
  description: string;
  price: number | null;
  image: string;
  tags: Record<string, string>;
};

type CreateDishRequest = {
  body: Dish;
};

type ChangeDishRequest = {
  id: string;
  body: Dish;
};

type DeleteDishRequest = {
  id: string;
};

type TagsReply = Record<string, string>;

type AddTagRequest = {
  name: string;
  color: string;
};

const adminDishesService = serviceApi.injectEndpoints({
  endpoints: (builder) => ({
    createDish: builder.mutation<any, CreateDishRequest>({
      query: (Request) => ({
        url: "admin/dishes",
        method: "POST",
        body: Request.body,
      }),
      // invalidatesTags: ["tags"],
    }),
    changeDish: builder.mutation<any, ChangeDishRequest>({
      query: (Request) => ({
        url: `admin/dishes/${Request.id}`,
        method: "PATCH",
        body: Request.body,
      }),
      // invalidatesTags: ["tags"],
    }),
    deleteDish: builder.mutation<any, DeleteDishRequest>({
      query: (Request) => ({
        url: `admin/dishes/${Request.id}`,
        method: "DELETE",
      }),
      // invalidatesTags: ["tags"],
    }),
    getTags: builder.query<TagsReply, any>({
      query: () => ({
        url: "tags",
        method: "GET",
      }),
      providesTags: ["tags"],
      
      onQueryStarted(arg, api) {
        // set up a function for query fulfilled for all mutations in this services
        // this func will be in the src level as util
        api.queryFulfilled
          .then((data) => {
            console.log(data);
            toast.success("Success");
          })
          .catch(({ data }) => {
            toast.error(data.error);
          });
      },
    }),
    addTag: builder.mutation<AddTagRequest, any>({
      query: (body) => ({
        url: "tags",
        method: "POST",
        body,
      }),
      invalidatesTags: ["tags"],
    }),
    changeTags: builder.mutation<any, TagsReply>({
      query: (body) => ({
        url: "tags",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["tags"],
    }),
    deleteTag: builder.mutation<any, string>({
      query: (name) => ({
        url: `tags/${name}`,
        method: "DELETE",
      }),
      invalidatesTags: ["tags"],
    }),
  }),
});

export default adminDishesService;
