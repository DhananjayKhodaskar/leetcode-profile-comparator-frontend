import React from "react";
export default function LeaderboardCard({ title, submissions }) {
  const sortedSubmissions = [...submissions].sort((a, b) => b.count - a.count);
  return (
    <div className="w-[300px] card">
      <div className="card-header">
        <h2 className="text-lg card-title">{title}</h2>
      </div>
      <div className="card-content">
        <ul className="space-y-2">
          {sortedSubmissions.map((user, index) => (
            <li key={user.username} className="flex items-center space-x-2">
              <span className="text-sm font-medium w-6">{index + 1}.</span>
              <img
                src={user?.userAvatar}
                alt={user.realName}
                className="w-8 h-8 rounded-full mr-2"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {user.realName || user.username}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user.username}
                </p>
              </div>
              <span className="text-sm font-medium">{user.count || "-"}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
