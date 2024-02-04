import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store-hooks";


export const ROOT_URL = "https://waisys.dev.m0e.space/api/";

const baseQuery = fetchBaseQuery({
  baseUrl: ROOT_URL,
  method: "GET",
  prepareHeaders: (headers, { getState }) => {
    try {
      const state = getState() as RootState;

      if (!state) return headers;

      const token  = state.user.user.accessToken;

      // setInterval(() => {

      // }, 2000);

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    } catch (error) {
      console.log("fetchBaseQuery", error);
      return headers;
    }
  },
});

export const serviceApi = createApi({
  baseQuery: baseQuery,
  reducerPath: "api",
  refetchOnFocus: false, // true, TRUE only for production
  refetchOnReconnect: true,
  keepUnusedDataFor: 120, // default is 60
  refetchOnMountOrArgChange: 900,
  endpoints: () => ({}),
});
