import { CircleCheck, Minus } from "lucide-react";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getLast365Days } from "@/utils/getSubmissionData";

const Streak = ({ calenderData, username, last365DaysArray }) => {
  const tooltip365DaysArray = getLast365Days(true);
  return (
    <div className="flex flex-row gap-0 w-screen">
      {last365DaysArray.map((calData, index) => {
        return (
          <div key={index} className="flex items-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <CircleCheck
                    className={`m-0 ${
                      calenderData[calData]
                        ? "text-green-500"
                        : "text-slate-500"
                    }`}
                    size={24}
                    key={uuidv4()}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{tooltip365DaysArray[index]}</p>{" "}
                  {/* Customize tooltip text as needed */}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Minus
              className={
                calenderData[calData] ? "text-green-500 m-0" : "text-slate-500"
              }
              size={24}
              key={uuidv4()}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Streak;
