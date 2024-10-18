import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const GroupAvatar = ({ groupName, groupAvatar }) => {
  const fallbackInitial = groupName ? groupName.charAt(0).toUpperCase() : "";

  return (
    <div className="cursor-pointer">
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Avatar>
              {groupAvatar ? (
                <AvatarImage
                  src={groupAvatar}
                  alt={groupName}
                  className="rounded-full w-12 h-12 "
                />
              ) : (
                <AvatarFallback className="rounded-full w-12 h-12 flex justify-center items-center bg-slate-50">
                  <h3 className=" text-3xl font-bold rounded-full text-slate-950">
                    {" "}
                    {fallbackInitial}
                  </h3>
                </AvatarFallback>
              )}
            </Avatar>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p className="font-extrabold">{groupName}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default GroupAvatar;
