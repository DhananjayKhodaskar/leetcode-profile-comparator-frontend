import { setUser } from "@/slices/userSlice";
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
    signUpWithGoogle: builder.mutation({
      query: (values) => ({
        url: "/auth/signUpWithGoogle",
        method: "POST",
        body:  values,
      }),
    }),
    verifyEmail: builder.query({
      query: (token) => ({
        url: `/auth/verify-email?token=${token}`,
        method: "POST",
      }),
    }),
    login: builder.mutation({
      query: (values) => ({
        url: "/auth/login",
        method: "POST",
        body: values,
      }),
      async onQueryStarted(values, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data?.data));
        } catch (error) {
          console.error("Login failed:", error);
        }
      },
    }),
    loginWithGoogle: builder.mutation({
      query: (values) => ({
        url: "/auth/loginWithGoogle",
        method: "POST",
        body: values,
      }),
      async onQueryStarted(values, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data?.data));
        } catch (error) {
          console.error("Login failed:", error);
        }
      },
    }),
    forgotPassword: builder.mutation({
      query: (values) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: values,
      }),
    }),
    resetPassword: builder.mutation({
      query: (values) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: values,
      }),
    }),
  }),
});

export const {
  useFetchLeetCodeDataMutation,
  useSignUpMutation,
  useSignUpWithGoogleMutation,
  useVerifyEmailQuery,
  useLoginMutation,
  useLoginWithGoogleMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
