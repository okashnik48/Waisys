import { TagsReply } from "./admin/admin-dishes.service";
import { serviceApi } from "./app.service";

const DishesTagsService = serviceApi.injectEndpoints({
	endpoints: (builder) => ({
		getTags: builder.query<TagsReply, any>({
			query: () => ({
			  url: "tags",
			  method: "GET",
			}),
			providesTags: ["tags", "admin-dish"],
		  }),
	})
})

export default DishesTagsService;