import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuth from "./baseQueryWithAuth";
import { setJoinedGroups, setSelectedGroup } from "@/slices/groupSlice";

export const groupApi = createApi({
  reducerPath: "groupApi",
  baseQuery: baseQueryWithAuth(import.meta.env.VITE_BACKEND_URL),
  refetchOnFocus: true,
  refetchOnReconnect: true,
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
    getGroupMessages: builder.query({
      query: ({ groupId }) => ({
        url: `/app/groups/${groupId}/messages`,
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
    leaveOrRemoveMember: builder.mutation({
      query: ({ groupId, userId }) => ({
        url: `/app/groups/${groupId}/members`,
        method: "DELETE",
        body: userId ? { userId } : undefined, // Include body only if userId is provided
      }),
    }),
    makeAdmin: builder.mutation({
      query: ({ groupId, userId }) => ({
        url: `/app/groups/a/${groupId}/make-admin`,
        method: "PUT",
        body: { userId },
      }),
    }),
  }),
});

// Export hooks for using the API slice in components
export const {
  useCreateGroupMutation,
  useGetGroupInfoQuery,
  useLeaveOrRemoveMemberMutation,
  useMakeAdminMutation,
  useGetGroupMessagesQuery,
  useAddMemberToGroupMutation,
  useFetchJoinedGroupsQuery,
} = groupApi;
