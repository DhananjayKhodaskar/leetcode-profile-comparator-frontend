import React, { useState } from "react";
import Streak from "./Streak";
import { getLastDaysByMonth } from "@/utils/getSubmissionData";
import { v4 as uuidv4 } from "uuid";
import { Button } from "./ui/button";
import { FOR_THE } from "@/utils/common";

const StreakCalender = ({ streakData }) => {
  const [streakMonth, setStreakMonth] = useState(0);
  const last365DaysArray = getLastDaysByMonth();
  const last12Months = getLastDaysByMonth(FOR_THE.MONTH_DISPLAY);
  console.log(last12Months);
  return (
    <div className="w-screen overflow-x-auto  no-scrollbar flex flex-col gap-3 bg-slate-600">
      {streakData.map((calData) => (
        <div key={uuidv4()}>
          <Streak
            calenderData={calData.dateData}
            key={uuidv4()}
            username={calData.username}
            last365DaysArray={last365DaysArray[streakMonth]}
            streakMonth={streakMonth}
          />
        </div>
      ))}
      <Button
        onClick={() => setStreakMonth((prev) => prev + 1)}
        disabled={streakMonth === 12}
      >
        Previous
      </Button>
      <Button
        onClick={() => setStreakMonth((prev) => prev && prev - 1)}
        disabled={streakMonth === 0}
      >
        Next
      </Button>
      <h3>{last12Months[streakMonth]}</h3>
    </div>
  );
};

export default StreakCalender;
