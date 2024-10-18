import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuth from "./baseQueryWithAuth";
import { setJoinedGroups } from "@/slices/groupSlice";

export const groupApi = createApi({
  reducerPath: "groupApi",
  baseQuery: baseQueryWithAuth(import.meta.env.VITE_BACKEND_URL),
  endpoints: (builder) => ({
    createGroup: builder.mutation({
      query: (groupDetails) => ({
        url: "/app/groups",
        method: "POST",
        body: groupDetails,
      }),
    }),
    addMemberToGroup: builder.mutation({
      query: ({ groupId, userId }) => ({
        url: `/groups/${groupId}/add-member`,
        method: "POST",
        body: { userId },
      }),
    }),
    fetchJoinedGroups: builder.query({
      query: () => ({
        url: "/app/groups",
        method: "GET",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setJoinedGroups(data?.data || []));
        } catch (error) {
          console.error("Failed to fetch joined groups:", error);
        }
      },
    }),
  }),
});

// Export hooks for using the API slice in components
export const {
  useCreateGroupMutation,
  useAddMemberToGroupMutation,
  useFetchJoinedGroupsQuery,
} = groupApi;
