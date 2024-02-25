import { toast } from "react-toastify";
import { serviceApi } from "../app.service";

type GetAllUsersReply = {
    [x: string]: any;
    users: {
      id: string;
      firstName: string;
      lastName: string;
      role: string;
      username: string;
      password: string;
    }[];
  };
type CreateUsereRequest = {
    body:{
        firstName: string;
        lastName: string;
        role: string;
        username: string;
        password: string;
    }
  };
  
type ChangeUsereRequest = {
    id: string,
    body: {
        id: string;
        firstName: string;
        lastName: string;
        role: string;
        username: string;
        password: string;
    };
}
type DeleteUserRequest = {
    id: string,
}

const adminUsersService = serviceApi.injectEndpoints({
    endpoints: (builder) => ({
        users: builder.query<GetAllUsersReply, any>({
            query: (Request) => ({
                url: 'admin/users',
                method: 'GET',
            }),
            providesTags: ["users"],
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
        createUser: builder.mutation<any, CreateUsereRequest>({
            query: (Request) => ({
                url: 'admin/users',
                method: 'POST',
                body: Request.body
            }),
            invalidatesTags: ["users"],
        }),
        changeUser: builder.mutation<any, ChangeUsereRequest>({
            query: (Request) => ({
                url: `admin/users/${Request.id}`,
                method: 'PATCH',
                body: Request.body
            }),
            invalidatesTags: ["users"],
        }),
        deleteUser: builder.mutation<any, DeleteUserRequest>({
            query: (Request) => ({
                url: `admin/users/${Request.id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["users"],
        }),
    })
})

export default adminUsersService;