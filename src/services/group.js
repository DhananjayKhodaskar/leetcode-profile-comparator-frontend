import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuth from "./baseQueryWithAuth";
import { setJoinedGroups, setSelectedGroup } from "@/slices/groupSlice";

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
    getGroupInfo: builder.query({
      query: ({ groupId }) => ({
        url: `/app/groups/${groupId}`,
        method: "GET",
      }),
    }),
    addMemberToGroup: builder.mutation({
      query: ({ groupId, userId }) => ({
        url: `/app/groups/${groupId}/add-member`,
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
  useGetGroupInfoQuery,
  useAddMemberToGroupMutation,
  useFetchJoinedGroupsQuery,
} = groupApi;
