import React from "react";
import Streak from "./Streak";
import { getLast365Days } from "@/utils/getSubmissionData";
import { v4 as uuidv4 } from "uuid";

const StreakCalender = ({ streakData }) => {
  const last365DaysArray = getLast365Days();
  console.log("strekData", streakData);
  return (
    <div className="w-screen overflow-x-auto  no-scrollbar flex flex-col gap-3 bg-slate-600">
      {streakData.map((calData) => (
        <div key={uuidv4()}>
          <h1 className="fixed" kkey={uuidv4()}>
            {calData.username}
          </h1>
          <Streak
            calenderData={calData.dateData}
            key={uuidv4()}
            username={calData.username}
            last365DaysArray={last365DaysArray}
          />
        </div>
      ))}
      
    </div>
  );
};

export default StreakCalender;
