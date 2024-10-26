import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuth from "./baseQueryWithAuth";

export const challengeApi = createApi({
  reducerPath: "challengeApi",
  baseQuery: baseQueryWithAuth(import.meta.env.VITE_BACKEND_URL),
  endpoints: (builder) => ({
    getChallenges: builder.query({
      query: () => ({
        url: "app/challenges",
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
      query: ({ groupId }) => ({
        url: `app/activeChallenges/${groupId}/problems`,
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
  }),
});

// Export hooks for using the API slice in components
export const {
  useGetChallengesQuery,
  useGetActiveChallengesQuery,
  useGetActiveChallengeProblemsQuery,
  useUpdateUserProgressManuallyMutation,
  useCreateActiveChallengeMutation,
  useGetChallengeByIdQuery, // Exporting the new hook
} = challengeApi;
