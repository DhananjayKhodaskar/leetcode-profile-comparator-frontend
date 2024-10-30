import React from "react";
import ChallengeHero from "./ChallengeHero";
import {
  useFinishActiveChallengeMutation,
  useJoinActiveChallengeMutation,
  useLeaveActiveChallengeMutation,
} from "@/services/challenge";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";

const ChallengeDetails = ({
  challengeDetails,
  joinedUsers,
  problemCount,
  endDate,
  activeChallengeId,
  refetchActiveChallengeDetails,
}) => {
  const { user } = useSelector((state) => state.user.user);
  const { _id, name, description, isPublic, createdBy, createdAt, updatedAt } =
    challengeDetails;
  const endTime = new Date(endDate).getTime();
  const loggedInUserInJoinedUser = joinedUsers.find(
    (joinedUser) => joinedUser._id === user._id
  );
  const [joinChallenge, { isLoading: joining, isSuccess, isError }] =
    useJoinActiveChallengeMutation();

  const [leaveChallenge, { isLoading: leaving }] =
    useLeaveActiveChallengeMutation();

  const [finishChallenge, { isLoading: finishing }] =
    useFinishActiveChallengeMutation();

  const handleJoin = async () => {
    await joinChallenge(activeChallengeId);
    refetchActiveChallengeDetails();
  };

  const handleLeave = async () => {
    await leaveChallenge(activeChallengeId);
    refetchActiveChallengeDetails();
  };

  const handleFinishChallenge = async () => {
    await finishChallenge(activeChallengeId);
    refetchActiveChallengeDetails();
  };

  return (
    <div>
      <ChallengeHero
        activeChallengeId={activeChallengeId}
        title={name}
        endTime={endTime}
        problemCount={problemCount}
        refetchActiveChallengeDetails={refetchActiveChallengeDetails}
      />
      <div className="container mx-auto px-4 py-8">
        <div className="mt-8 bg-white shadow-md rounded-lg p-6">
          <div className="flex flex-row justify-between">
            <h2 className="text-2xl font-bold mb-4">Challenge Details</h2>

            <Button variant="outline" onClick={handleFinishChallenge}>
              Finish Challenge
            </Button>
          </div>
          <div className="space-y-4">
            <p>
              <strong className="font-semibold">Description:</strong>{" "}
              <span className="text-gray-700">{description}</span>
            </p>
            <p>
              <strong className="font-semibold">Created By:</strong>{" "}
              <span className="text-gray-700">{createdBy}</span>
            </p>
            <p>
              <strong className="font-semibold">Created At:</strong>{" "}
              <span className="text-gray-700">
                {new Date(createdAt).toLocaleString()}
              </span>
            </p>
          </div>
          <div className="mt-6">
            <div className="flex flex-row justify-between">
              {" "}
              <h3 className="text-xl font-semibold mb-4">Joined Users</h3>
              {loggedInUserInJoinedUser ? (
                <Button variant="destructive" onClick={handleLeave}>
                  Leave
                </Button>
              ) : (
                <Button className="m-4 bg-green-700" onClick={handleJoin}>
                  Join
                </Button>
              )}
            </div>
            <ul className="space-y-4">
              {joinedUsers.map((joinedUser) => (
                <li
                  key={joinedUser._id}
                  className="flex items-center space-x-4"
                >
                  <img
                    src={joinedUser.userAvatar}
                    alt={`${joinedUser.realName}'s avatar`}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-medium">
                      {joinedUser._id === user._id
                        ? "You"
                        : joinedUser.realName}
                    </p>
                    <p className="text-sm text-gray-600">
                      Solved Problems: {joinedUser.solvedProblemsCount}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetails;
