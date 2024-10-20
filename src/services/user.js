import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuth from "./baseQueryWithAuth";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithAuth(import.meta.env.VITE_BACKEND_URL),
  endpoints: (builder) => ({
    searchUser: builder.mutation({
      query: (searchQuery) => ({
        url: "/app/users/search",
        method: "POST",
        body: { query: searchQuery },
      }),
    }),
  }),
});

export const { useSearchUserMutation } = userApi;
