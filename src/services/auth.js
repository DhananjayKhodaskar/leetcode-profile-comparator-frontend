import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: "leetCodeApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL }), // Replace with your actual base URL
  endpoints: (builder) => ({
    fetchLeetCodeData: builder.mutation({
      query: (values) => ({
        url: "/auth/fetchLeetCodeData",
        method: "POST",
        body: values,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useFetchLeetCodeDataMutation } = authApi;
