import { serviceApi } from "./app.service";


type UserInfoReply = {
    id: string,
    firstName: string,
    lastName: string,
    role: string,
    username: string
}


const userService = serviceApi.injectEndpoints({
    endpoints: (builder) => ({
        userInfo: builder.query<UserInfoReply, any>({
            query: (accessToken) => ({
                url: 'users/me',
                method: 'GET',
                headers: { Authorization: `Bearer ${accessToken}` },
            }),
        }),
    })
})

export default userService;