import { toast } from "react-toastify";
import { serviceApi } from "./app.service";
import TagsTypes from "../store/types/tags-types";

const DishesTagsService = serviceApi.injectEndpoints({
	endpoints: (builder) => ({
		getTags: builder.query<TagsTypes.API.GetTagsReply, TagsTypes.API.GetTagsRequest>({
			query: () => ({
			  url: "tags",
			  method: "GET",
			}),
			providesTags: ["tags", "admin-dish"],
		  }),
		  addTag: builder.mutation<TagsTypes.API.PostTagReply, TagsTypes.API.PostTagRequest>({
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
		  changeTags: builder.mutation<TagsTypes.API.PatchTagReply, TagsTypes.API.PatchTagRequest>({
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
		  deleteTag: builder.mutation<null, string>({
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
	
})

export default DishesTagsService;