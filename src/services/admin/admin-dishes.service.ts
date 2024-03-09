import { toast } from "react-toastify";
import { serviceApi } from "../app.service";

type Dish = {
  name: string;
  description: string;
  price: {
    value: number | null;
    currency: string;
};
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

export type TagsReply = Record<string, string>;

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
      invalidatesTags: ["admin-dish"],
      async onQueryStarted(arg, api) {
        api.queryFulfilled
          .then(() => {
            toast.success("Success");
          })
          .catch((data ) => {
            console.log(data)
            toast.error("data");
          });
      },
    }),
    changeDish: builder.mutation<any, ChangeDishRequest>({
      query: (Request) => ({
        url: `admin/dishes/${Request.id}`,
        method: "PATCH",
        body: Request.body,
      }),
      invalidatesTags: ["admin-dish"],
      async onQueryStarted(arg, api) {
        api.queryFulfilled
          .then(() => {
            toast.success("Success");
          })
          .catch((data ) => {
            console.log(data)
            toast.error("data");
          });
      },
    }),
    deleteDish: builder.mutation<any, DeleteDishRequest>({
      query: (Request) => ({
        url: `admin/dishes/${Request.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["admin-dish"],
      async onQueryStarted(arg, api) {
        api.queryFulfilled
          .then(() => {
            toast.success("Success");
          })
          .catch((data ) => {
            console.log(data)
            toast.error("data");
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
      async onQueryStarted(arg, api) {
        api.queryFulfilled
          .then(() => {
            toast.success("Success");
          })
          .catch((data ) => {
            console.log(data)
            toast.error("data");
          });
      },
    }),
    changeTags: builder.mutation<any, TagsReply>({
      query: (body) => ({
        url: "tags",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["tags"],
      async onQueryStarted(arg, api) {
        api.queryFulfilled
          .then(() => {
            toast.success("Success");
          })
          .catch((data ) => {
            console.log(data)
            toast.error("data");
          });
      },
    }),
    deleteTag: builder.mutation<any, string>({
      query: (name) => ({
        url: `tags/${name}`,
        method: "DELETE",
      }),
      invalidatesTags: ["tags"],
      async onQueryStarted(arg, api) {
        api.queryFulfilled
          .then(() => {
            toast.success("Success");
          })
          .catch((data ) => {
            console.log(data)
            toast.error("data");
          });
      },
    }),
  }),
});

export default adminDishesService;
