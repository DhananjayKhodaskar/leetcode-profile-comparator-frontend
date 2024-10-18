import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQueryWithAuth = (baseUrl) => {
  return async (args, api, extraOptions) => {
    const state = api.getState();
    const { token } = state.user.user; // Get the token from the Redux store

    // Create a base query with authorization
    const baseQuery = fetchBaseQuery({
      baseUrl,
      prepareHeaders: (headers) => {
        if (token) {
          headers.set("Authorization", `Bearer ${token}`); // Set the token in the headers
        }
        return headers;
      },
    });

    return baseQuery(args, api, extraOptions);
  };
};

export default baseQueryWithAuth;
