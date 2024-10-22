import { pastelBgColor } from "@/utils/config";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";
import { useSelector } from "react-redux";

const GroupHeader = ({ selectedGroup }) => {
  const { joinedGroups } = useSelector((state) => state.group);

  // Early return if no group is selected
  if (!selectedGroup) return null;

  const { name, avatar, joinedMember } = selectedGroup;
  const fallbackInitial = name ? name.charAt(0).toUpperCase() : "";
  const selectedGroupIndex = joinedGroups.findIndex(
    (group) => group.groupId === selectedGroup._id
  );

  // Ensure there's a color to use for the avatar background
  const avatarBgColor =
    pastelBgColor[selectedGroupIndex % pastelBgColor.length] || "bg-slate-50";

  // Get real names of members, limiting to 3 and adding ellipsis if needed
  const memberNames = joinedMember.map((member) => member.realName);
  const displayedMembers = memberNames.slice(0, 3); // Limit to first 3 members
  const moreCount = memberNames.length > 3 ? `+${memberNames.length - 3}` : "";

  return (
    <div className="flex flex-row items-center justify-start p-4 border-b border-gray-200 gap-3">
      <Avatar>
        <AvatarImage
          src={avatar}
          alt={name}
          className="rounded-full w-14 h-14"
        />
        <AvatarFallback
          className={`rounded-full w-14 h-14 flex justify-center items-center ${avatarBgColor}`}
        >
          <h3 className="text-2xl font-bold text-slate-950">
            {fallbackInitial}
          </h3>
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <h1 className="text-2xl font-semibold">{name}</h1>
        <p className="text-gray-600">
          {displayedMembers.join(", ")} {moreCount}
        </p>
      </div>
    </div>
  );
};

export default GroupHeader;
