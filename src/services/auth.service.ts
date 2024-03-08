import { toast } from "react-toastify";
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
            async onQueryStarted(arg, api) {
                // set up a function for query fulfilled for all mutations in this services
                // this func will be in the src level as util
                api.queryFulfilled
                  .then(() => {
                    toast.success("Success");
                  })
                  .catch((data ) => {
                    toast.error("data");
                  });
              },
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