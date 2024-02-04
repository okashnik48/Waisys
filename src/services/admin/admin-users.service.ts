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
        id: string;
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
        }),
        createUser: builder.mutation<any, CreateUsereRequest>({
            query: (Request) => ({
                url: 'admin/users',
                method: 'POST',
                body: Request.body
            }),
        }),
        changeUser: builder.mutation<any, ChangeUsereRequest>({
            query: (Request) => ({
                url: `admin/users/${Request.id}`,
                method: 'PATCH',
                body: Request.body
            }),
        }),
        deleteUser: builder.mutation<any, DeleteUserRequest>({
            query: (Request) => ({
                url: `admin/users/${Request.id}`,
                method: 'DELETE',
            }),
        }),
    })
})

export default adminUsersService;