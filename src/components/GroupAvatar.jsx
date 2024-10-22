import React, { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { NavLink, useLocation, useParams } from "react-router-dom";

const GroupAvatar = ({ group, avatarBgColor }) => {
  const location = useLocation();
  const { groupName, groupAvatar } = group;
  const fallbackInitial = groupName ? groupName.charAt(0).toUpperCase() : "";

  const isActive = location.pathname.startsWith(`/app/group/${group?.groupId}`);

  return (
    <NavLink
      className={`flex flex-col ${isActive && "    "}`}
      to={`group/${group?.groupId}/info`}
    >
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Avatar>
              {groupAvatar ? (
                <AvatarImage
                  src={groupAvatar}
                  alt={groupName}
                  className={[
                    "w-12 h-12 rounded-lg",
                    isActive ? "border-4 border-slate-200" : "",
                  ].join(" ")}
                />
              ) : (
                <AvatarFallback
                  className={[
                    "rounded-lg",
                    isActive ? "border-4 border-slate-200" : "",
                    "w-12 h-12 flex justify-center items-center",
                    avatarBgColor || "bg-slate-50",
                  ].join(" ")}
                >
                  <h3 className=" text-2xl rounded-full text-slate-950">
                    {" "}
                    {fallbackInitial}
                  </h3>
                </AvatarFallback>
              )}
            </Avatar>
          </TooltipTrigger>
          <TooltipContent side="right" className=" bg-black-russian">
            <p className="font-extrabold">{groupName}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </NavLink>
  );
};

export default GroupAvatar;
