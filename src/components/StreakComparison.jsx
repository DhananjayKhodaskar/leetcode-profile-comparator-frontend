import React from "react";

const StreakComparison = ({ streakData }) => {
  // Dummy data for testing
  const currentUser = streakData.length ? streakData[4] : {};

  const otherUsers = [...streakData];

  const maxStreak = Math.max(
    currentUser.currentStreak,
    ...otherUsers.map((user) => user.currentStreak)
  );

  const sortedUsers = [currentUser, ...otherUsers]
    .sort((a, b) => b.currentStreak - a.currentStreak)
    .slice(0, 5);

  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <svg
            className="w-6 h-6 text-orange-500 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
            />
          </svg>
          Your Streak
        </h2>
        <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
          <div
            className="bg-orange-500 h-4 rounded-full"
            style={{
              width: `${(currentUser.currentStreak / maxStreak) * 100}%`,
            }}
          ></div>
        </div>
        <p className="text-lg font-semibold mb-6">
          {currentUser.currentStreak} day
          {currentUser.currentStreak !== 1 ? "s" : ""}
        </p>

        <h3 className="text-xl font-bold mb-4 flex items-center">
          <svg
            className="w-6 h-6 text-yellow-500 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
            />
          </svg>
          Leaderboard
        </h3>
        <ul className="space-y-3">
          {sortedUsers.map((user, index) => (
            <li
              key={user.realName}
              className="flex items-center justify-between"
            >
              <div className="flex items-center">
                <span className="w-6 text-center font-bold mr-2">
                  {index + 1}
                </span>
                <img
                  src={user.userAvatar}
                  alt={user.realName}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <span
                  className={
                    user.realName === currentUser.realName ? "font-bold" : ""
                  }
                >
                  {user.realName}
                </span>
              </div>
              <span className="font-semibold">
                {user.currentStreak} day{user.currentStreak !== 1 ? "s" : ""}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StreakComparison;
