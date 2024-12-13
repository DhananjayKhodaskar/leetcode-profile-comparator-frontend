import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuth from "./baseQueryWithAuth";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithAuth(import.meta.env.VITE_BACKEND_API_URL),
  endpoints: (builder) => ({
    searchUser: builder.mutation({
      query: (searchQuery) => ({
        url: "/app/users/search",
        method: "POST",
        body: { query: searchQuery },
      }),
    }),
    changePassword: builder.mutation({
      query: ({ email, oldPassword, newPassword }) => ({
        url: "/auth/change-password",
        method: "POST",
        body: { email, oldPassword, newPassword },
      }),
    }),
  }),
});

export const { useSearchUserMutation, useChangePasswordMutation } = userApi;
