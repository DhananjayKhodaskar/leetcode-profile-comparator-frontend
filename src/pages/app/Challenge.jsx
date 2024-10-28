import React from "react";
import { useParams } from "react-router-dom";
import { useGetActiveChallengesQuery } from "@/services/challenge";
import { CustomTabs } from "@/components/CustomTabs";
import StartChallenge from "@/components/StartChallenge";

const Challenge = () => {
  const { groupId } = useParams();
  const {
    data: response,
    error,
    isLoading,
    refetch: refetchActiveChallengeDetails,
  } = useGetActiveChallengesQuery({
    groupId: groupId,
  });
  const activeChallenge = response?.data;

  console.log("activeChallenge", activeChallenge);
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="h-full w-full">
      {error?.status === 404 ? (
        <StartChallenge />
      ) : (
        <CustomTabs
          activeChallenge={activeChallenge}
          refetchActiveChallengeDetails={refetchActiveChallengeDetails}
        />
      )}
    </div>
  );
};

export default Challenge;
