import { serviceApi } from "./app.service";
import UsersTypes from "../store/types/users-types";

const userService = serviceApi.injectEndpoints({
    endpoints: (builder) => ({
        userInfo: builder.query<UsersTypes.API.GetUserInfoReply, UsersTypes.API.GetUserInfoRequest>({
            query: () => ({
                url: 'users/me',
                method: 'GET',
            }),
        }),
    })
})

export default userService;