import { toast } from "react-toastify";
import { serviceApi } from "../app.service";

import AdminUsersTypes from "../../store/types/admin-types/adminUsers-types";


const adminUsersService = serviceApi.injectEndpoints({
    endpoints: (builder) => ({
        users: builder.query<AdminUsersTypes.API.GetAllUsersReply, null>({
            query: (Request) => ({
                url: 'admin/users',
                method: 'GET',
            }),
            providesTags: ["users"],
        }),
        createUser: builder.mutation<null, AdminUsersTypes.API.CreateUserRequest>({
            query: (Request) => ({
                url: 'admin/users',
                method: 'POST',
                body: Request.body
            }),
            invalidatesTags: ["users"],
            async onQueryStarted(arg, api) {
                api.queryFulfilled
                  .then(() => {
                    toast.success("Успішно");
                  })
                  .catch((data ) => {
                    console.log(data)
                    toast.error("Помилка даних");
                  });
              },
        }),
        changeUser: builder.mutation<null, AdminUsersTypes.API.ChangeUserRequest>({
            query: (Request) => ({
                url: `admin/users/${Request.id}`,
                method: 'PATCH',
                body: Request.body
            }),
            invalidatesTags: ["users"],
            async onQueryStarted(arg, api) {
                api.queryFulfilled
                  .then(() => {
                    toast.success("Успішно");
                  })
                  .catch((data ) => {
                    console.log(data)
                    toast.error("Помилка даних");
                  });
              },
        }),
        deleteUser: builder.mutation<null, AdminUsersTypes.API.DeleteUserRequest>({
            query: (Request) => ({
                url: `admin/users/${Request.id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["users"],
            async onQueryStarted(arg, api) {
                api.queryFulfilled
                  .then(() => {
                    toast.success("Успішно");
                  })
                  .catch((data ) => {
                    console.log(data)
                    toast.error("Помилка даних");
                  });
              },
        }),
    })
})

export default adminUsersService;