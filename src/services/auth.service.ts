import { toast } from "react-toastify";
import { serviceApi } from "./app.service";
import AuthTypes from "../store/types/auth-types";

const authService = serviceApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthTypes.API.GetTokensReply, AuthTypes.API.GetTokensRequest>({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
      async onQueryStarted(arg, api) {
        api.queryFulfilled
          .then(() => {
            //toast.success("Success");
          })
          .catch(({ error }) => {
            toast.error(error.data.message);
          });
      },
    }),
    changeAccessToken: builder.mutation<AuthTypes.API.ChangeTokenReply, AuthTypes.API.ChangeTokenRequest>({
      query: () => ({
        url: "auth/refreshToken",
        method: "POST",
      }),
    }),
  }),
});

export default authService;
