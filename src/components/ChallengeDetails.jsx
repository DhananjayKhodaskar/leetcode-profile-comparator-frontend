import React from "react";
import ChallengeHero from "./ChallengeHero";

const ChallengeDetails = ({
  challengeDetails,
  joinedUsers,
  problemCount,
  endDate,
  activeChallengeId,
  refetchActiveChallengeDetails,
}) => {
  const { _id, name, description, isPublic, createdBy, createdAt, updatedAt } =
    challengeDetails;
  const endTime = new Date(endDate).getTime();
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
          <h2 className="text-2xl font-bold mb-4">Challenge Details</h2>
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
            <h3 className="text-xl font-semibold mb-4">Joined Users</h3>
            <ul className="space-y-4">
              {joinedUsers.map((user) => (
                <li key={user._id} className="flex items-center space-x-4">
                  <img
                    src={user.userAvatar}
                    alt={`${user.realName}'s avatar`}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-medium">{user.realName}</p>
                    <p className="text-sm text-gray-600">
                      Solved Problems: {user.solvedProblemsCount}
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
