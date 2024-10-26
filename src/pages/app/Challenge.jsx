import React from "react";
import { useParams } from "react-router-dom";
import { useGetActiveChallengesQuery } from "@/services/challenge";
import ChallengeHero from "@/components/ChallengeHero";
import { CustomTabs } from "@/components/CustomTabs";
import { DataTableDemo } from "@/components/DataTableDemo";

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
  if (error) return <div>Error fetching active challenges</div>;

  if (!activeChallenge) return <div>No active challenges available.</div>;

  // Extracting title and end time from the fetched data

  return (
    <div>
      

      <CustomTabs
        activeChallenge={activeChallenge}
        refetchActiveChallengeDetails={refetchActiveChallengeDetails}
      />
      {/* <h2>Active Challenges</h2>
      <ul>
        {activeChallenge.joinedUsers.map((user) => (
          <li key={user._id}>
            <img
              src={user.userAvatar}
              alt={`${user.realName}'s avatar`}
              width={50}
            />
            <p>
              {user.realName} - Solved Problems: {user.solvedProblems.length}
            </p>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default Challenge;
