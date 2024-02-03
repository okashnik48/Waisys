import { serviceApi } from "./app.service";

type LoginRequest = {
    username: string,
    password: string,
}

type ChangeTokenRequest = {
    refreshToken: string,
}

type ChangeTokenReply = {
    accessToken: string,
    refreshToken: string,
}

type LoginReply = {
    accessToken: string,
    refreshToken: string,
}


const authService = serviceApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<LoginReply, LoginRequest>({
            query: (body) => ({
                url: 'auth/login',
                method: 'POST',
                body,
            }),
        }),
        changeAccessToken:builder.mutation<ChangeTokenReply, ChangeTokenRequest>({
            query: (refreshToken) => ({
                url: 'auth/refreshToken',
                method: 'POST',
            }),
        }),


        // register: ,
    })
})

export default authService;