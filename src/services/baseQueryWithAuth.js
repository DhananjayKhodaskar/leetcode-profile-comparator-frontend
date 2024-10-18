import { clearUser } from "@/slices/userSlice";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQueryWithAuth = (baseUrl) => {
  return async (args, api, extraOptions) => {
    const state = api.getState();
    const { token } = state.user.user;

    const baseQuery = fetchBaseQuery({
      baseUrl,
      prepareHeaders: (headers) => {
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
      },
    });

    const result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
      console.error("Token expired, user logged out.");
      api.dispatch(clearUser());
    }

    return result;
  };
};

export default baseQueryWithAuth;
