import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "leetCodeApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL }),
  endpoints: (builder) => ({
    fetchLeetCodeData: builder.mutation({
      query: (values) => ({
        url: "/auth/fetchLeetCodeData",
        method: "POST",
        body: values,
      }),
    }),
    signUp: builder.mutation({
      query: (values) => ({
        url: "/auth/signUp",
        method: "POST",
        body: values,
      }),
    }),
    verifyEmail: builder.mutation({
      query: (token) => ({
        url: `/auth/verify-email?token=${token}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useFetchLeetCodeDataMutation,
  useSignUpMutation,
  useVerifyEmailMutation,
} = authApi;
