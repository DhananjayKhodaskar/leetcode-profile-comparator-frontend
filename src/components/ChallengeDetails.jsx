import React from "react";

const ChallengeDetails = ({ challengeDetails, joinedUsers, problemCount }) => {
  const { _id, name, description, isPublic, createdBy, createdAt, updatedAt } =
    challengeDetails;

  return (
    <div>
      <h2>Challenge Details</h2>
      <p>
        <strong>ID:</strong> {_id}
      </p>
      <p>
        <strong>Name:</strong> {name}
      </p>
      <p>
        <strong>Description:</strong> {description}
      </p>

      <div>
        <h3>Problems:</h3>
        {problemCount}
      </div>

      <p>
        <strong>Public:</strong> {isPublic ? "Yes" : "No"}
      </p>
      <p>
        <strong>Created By:</strong> {createdBy}
      </p>
      <p>
        <strong>Created At:</strong> {new Date(createdAt).toLocaleString()}
      </p>
      <p>
        <strong>Updated At:</strong> {new Date(updatedAt).toLocaleString()}
      </p>
      <ul>
        <p>
          <strong>Joined Users:</strong>
        </p>
        {joinedUsers.map((user) => (
          <li key={user._id}>
            <img
              src={user.userAvatar}
              alt={`${user.realName}'s avatar`}
              width={50}
            />
            <p>
              {user.realName} - Solved Problems: {user.solvedProblemsCount}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChallengeDetails;
