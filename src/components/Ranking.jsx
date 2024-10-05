import React, { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Trophy } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Ranking = ({
  colorArray = [
    "bg-orange-200", // Rank 1
    "bg-orange-300", // Rank 2
    "bg-orange-400", // Rank 3
    "bg-orange-500", // Rank 4
    "bg-orange-600", // Rank 5
  ],
  rankingData,
  title,
}) => {
  return (
    <div>
      <Card className="w-72 bg-zinc-800 rounded-lg overflow-hidden">
        {/* Header Section */}
        <div className="m-3 flex items-center gap-2">
          <Trophy className="text-yellow-500" />
          <h3 className="text-slate-400 m-0">{title}</h3>
        </div>

        {/* Ranking List */}
        {rankingData.slice(0, 5).map((user, index) => {
          const rank = index + 1;
          const bgColor = colorArray[index] || "bg-orange-100";

          return (
            <div
              key={user.key}
              className={`${bgColor} h-12 flex justify-between items-center`}
            >
              {/* Rank and User Name */}
              <div className="flex items-center gap-2">
                <Avatar className="bg-white h-5 w-5">
                  <AvatarFallback>{rank}</AvatarFallback>
                </Avatar>
                <h4 className="m-0">{user.username}</h4>
              </div>

              {/* Score */}
              <h4 className="m-0">{user.score}</h4>
            </div>
          );
        })}
      </Card>
    </div>
  );
};

export default Ranking;
