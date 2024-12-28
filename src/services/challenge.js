import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuth from "./baseQueryWithAuth";

export const challengeApi = createApi({
  reducerPath: "challengeApi",
  baseQuery: baseQueryWithAuth(import.meta.env.VITE_BACKEND_API_URL),
  // refetchOnFocus: true,
  // refetchOnReconnect: true,
  endpoints: (builder) => ({
    getChallenges: builder.query({
      query: ({
        page = 1,
        pageSize = 10,
        search = "",
        createdByYou = false,
      }) => ({
        url: `app/challenges?page=${page}&pageSize=${pageSize}&search=${search}&createdByYou=${createdByYou}`,
        method: "GET",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          return data;
        } catch (error) {
          console.error("Failed to fetch challenges:", error);
        }
      },
    }),

    getActiveChallenges: builder.query({
      query: ({ groupId }) => ({
        url: `app/activeChallenges/${groupId}`,
        method: "GET",
      }),
      async onQueryStarted({ groupId }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          return data;
        } catch (error) {
          console.error("Failed to fetch active challenges:", error);
        }
      },
    }),
    getActiveChallengeProblems: builder.query({
      query: ({
        groupId,
        userId = "",
        page = 1,
        limit = 10,
        categories = "",
        status = "",
      }) => ({
        url: `app/activeChallenges/${groupId}/problems/${userId}`,
        method: "GET",
        params: {
          page,
          limit,
          categories, // Comma-separated categories (e.g., "arrays,math")
          status,
        },
      }),
      async onQueryStarted({ groupId }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          return data;
        } catch (error) {
          console.error("Failed to fetch active challenges:", error);
        }
      },
    }),

    updateUserProgressManually: builder.mutation({
      query: ({ activeChallengeId, problemSlug }) => ({
        url: `app/challenges/updateUserProgress/${activeChallengeId}/${problemSlug}`,
        method: "PUT",
      }),
      async onQueryStarted(
        { activeChallengeId, problemSlug },
        { dispatch, queryFulfilled }
      ) {
        try {
          const { data } = await queryFulfilled;
          return data;
        } catch (error) {
          console.error("Failed to update user progress:", error);
        }
      },
    }),
    // New endpoint to create an active challenge
    createActiveChallenge: builder.mutation({
      query: (newChallengeData) => ({
        url: "app/activeChallenges",
        method: "POST",
        body: newChallengeData,
      }),
      async onQueryStarted(newChallengeData, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          return data;
        } catch (error) {
          console.error("Failed to create active challenge:", error);
        }
      },
    }),
    // New endpoint to join an active challenge
    joinActiveChallenge: builder.mutation({
      query: (activeChallengeId) => ({
        url: `app/activeChallenges/join/${activeChallengeId}`,
        method: "POST",
      }),
      async onQueryStarted(activeChallengeId, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          return data; // Return the response from joining the challenge
        } catch (error) {
          console.error("Failed to join active challenge:", error);
        }
      },
    }),

    // New endpoint to leave an active challenge
    leaveActiveChallenge: builder.mutation({
      query: (activeChallengeId) => ({
        url: `app/activeChallenges/leave/${activeChallengeId}`,
        method: "POST",
      }),
      async onQueryStarted(activeChallengeId, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          return data; // Return the response from leaving the challenge
        } catch (error) {
          console.error("Failed to leave active challenge:", error);
        }
      },
    }),

    // New endpoint to finish an active challenge
    finishActiveChallenge: builder.mutation({
      query: (activeChallengeId) => ({
        url: `app/activeChallenges/finish/${activeChallengeId}`,
        method: "POST",
      }),
      async onQueryStarted(activeChallengeId, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          return data; // Return the response from finishing the challenge
        } catch (error) {
          console.error("Failed to finish active challenge:", error);
        }
      },
    }),

    getChallengeHistory: builder.query({
      query: (groupId) => ({
        url: `app/getChallengeHistory/${groupId}`,
        method: "GET", // This uses the GET method as required
      }),
      async onQueryStarted(groupId, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          return data; // Return the response data if successful
        } catch (error) {
          console.error("Failed to fetch challenge history:", error);
        }
      },
    }),

    getProblemsByActiveChallengeId: builder.query({
      query: ({
        activeChallengeId,
        groupId,
        userId = "",
        page = 1,
        limit = 10,
        categories = "",
        status = "",
      }) => ({
        url: `app/getProblemsByActiveChallengeId/${activeChallengeId}`,
        method: "GET",
        params: { page, limit, categories, status },
      }),
      async onQueryStarted(activeChallengeId, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          return data; // Return the response from the API call
        } catch (error) {
          console.error(
            "Failed to fetch problems for active challenge:",
            error
          );
        }
      },
    }),

    getAllSolvedProblems: builder.query({
      query: ({ userId = "", page = 1, limit = 10 }) => ({
        url: `app/allSolvedProblems`,
        method: "GET",
        params: { page, limit },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          return data; // Return the response from the API call
        } catch (error) {
          console.error("Failed to fetch solved problems:", error);
        }
      },
    }),

    // New endpoint to get recent activity in an active challenge
    getRecentActivityInActiveChallenge: builder.query({
      query: (activeChallengeId) => ({
        url: `app/activeChallenges/recentActivity/${activeChallengeId}`,
        method: "GET",
      }),
      async onQueryStarted(activeChallengeId, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          return data; // Return the response from fetching recent activity
        } catch (error) {
          console.error("Failed to fetch recent activity:", error);
        }
      },
    }),

    // Adding getChallengeById endpoint
    getChallengeById: builder.query({
      query: (challengeId) => ({
        url: `app/challenges/${challengeId}`, // Adjusting the URL to include the challenge ID
        method: "GET",
      }),
      async onQueryStarted(challengeId, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          return data; // Return the fetched challenge data
        } catch (error) {
          console.error("Failed to fetch challenge:", error);
        }
      },
    }),
    // New endpoint to create a challenge
    createChallenge: builder.mutation({
      query: (challengeData) => ({
        url: "app/challenges", // Adjusting the URL for challenge creation
        method: "POST",
        body: challengeData, // Sending the challenge data in the request body
      }),
      async onQueryStarted(challengeData, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          return data; // Return the response of the created challenge
        } catch (error) {
          console.error("Failed to create challenge:", error);
        }
      },
    }),
    updateUserProgressByAutomatically: builder.mutation({
      query: (activeChallengeId) => ({
        url: `app/challenges/updateUserProgress/${activeChallengeId}`,
        method: "POST", // This uses the POST method as described
      }),
      async onQueryStarted(activeChallengeId, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          return data; // Return the response data if successful
        } catch (error) {
          console.error("Failed to update user progress:", error);
        }
      },
    }),
  }),
});

// Export hooks for using the API slice in components
export const {
  useGetChallengesQuery,
  useGetActiveChallengesQuery,
  useGetActiveChallengeProblemsQuery,
  useUpdateUserProgressManuallyMutation,
  useCreateActiveChallengeMutation,
  useGetProblemsByActiveChallengeIdQuery,
  useGetChallengeHistoryQuery,
  useGetAllSolvedProblemsQuery,
  useJoinActiveChallengeMutation, // Exporting the new hook
  useLeaveActiveChallengeMutation, // Exporting the new hook
  useFinishActiveChallengeMutation, // Exporting the new finish active challenge hook
  useGetRecentActivityInActiveChallengeQuery,
  useGetChallengeByIdQuery, // Exporting the new hook
  useCreateChallengeMutation, // Exporting the new create challenge hook
  useUpdateUserProgressByAutomaticallyMutation, // Exporting the new update user progress by automatically hook
} = challengeApi;
