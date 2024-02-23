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
  name: string,
  color: string
}

const adminDishesService = serviceApi.injectEndpoints({
  endpoints: (builder) => ({
    createDish: builder.mutation<any, CreateDishRequest>({
      query: (Request) => ({
        url: "admin/dishes",
        method: "POST",
        body: Request.body,
      }),
    }),
    changeDish: builder.mutation<any, ChangeDishRequest>({
      query: (Request) => ({
        url: `admin/dishes/${Request.id}`,
        method: "PATCH",
        body: Request.body,
      }),
    }),
    deleteDish: builder.mutation<any, DeleteDishRequest>({
      query: (Request) => ({
        url: `admin/dishes/${Request.id}`,
        method: "DELETE",
      }),
    }),
    getTags: builder.query<TagsReply, any>({
      query: () => ({
        url: "tags",
        method: "GET",
      }),
    }),
    addTag: builder.mutation<AddTagRequest, any>({
      query: (body) => ({
        url: "tags",
        method: "POST",
        body
      }),
    }),
    changeTags: builder.mutation<any, TagsReply>({
      query: (body) => ({
        url: "tags",
        method: "PATCH",
        body
      }),
    }),
    deleteTag: builder.mutation<any, string>({
      query: (name) => ({
        url: `tags/${name}`,
        method: "DELETE",
      }),
    }),
  }),
});

export default adminDishesService;
