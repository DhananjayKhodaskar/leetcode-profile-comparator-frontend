import React from "react";
import { useParams } from "react-router-dom";
import AddMemberModal from "@/components/AddMemberModal";
import { Badge } from "@/components/ui/badge";
import UserCard from "@/components/UserCard";
import { useGetGroupInfoQuery } from "@/services/group";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const GroupInfo = () => {
  const { groupId } = useParams();
  const {
    data: groupInfo,
    error,
    isLoading,
    refetch: refetchGroupInfo,
  } = useGetGroupInfoQuery({ groupId });
  const { data } = groupInfo || {};

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching group details: {error.message}</div>;
  }

  const {
    avatar,
    description,
    groupCreator: { username, realName, userAvatar },
    joinedMember,
    name,
    totalMembers,
  } = data;

  return (
    <div className="flex flex-col h-full">
      {/* Header Section */}
      <div className="flex flex-row justify-center p-3">
        <div className="flex flex-col justify-center items-center">
          <Avatar>
            <AvatarImage
              src={avatar}
              alt={name}
              className="rounded-full w-48 h-48 "
            />
            <AvatarFallback className="rounded-full w-48 h-48 flex justify-center items-center">
              <h3 className="text-4xl font-bold rounded-full text-slate-950">
                {name ? name.charAt(0).toUpperCase() : ""}
              </h3>
            </AvatarFallback>
          </Avatar>
          <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            {name}
          </h2>
          <p className="leading-7 text-slate-500">{`${totalMembers} members`}</p>
          <p className="leading-7 text-slate-500">{description}</p>
        </div>
      </div>

      {/* Member List Section */}
      <div className="flex-1 p-3 flex flex-col gap-3 overflow-auto">
        {" "}
        {/* This allows scrolling */}
        <AddMemberModal groupId={groupId} refetchGroupInfo={refetchGroupInfo} />
        <div className="w-full flex flex-col gap-2">
          {joinedMember?.map((member) => {
            const { _id, username, realName, userAvatar, groupRole } = member;

            return (
              <UserCard
                key={_id}
                userAvatar={userAvatar}
                realName={realName}
                username={username}
              >
                {groupRole === "admin" && (
                  <Badge variant="secondary" className="h-5 rounded-full">
                    {groupRole.charAt(0).toUpperCase() + groupRole.slice(1)}
                  </Badge>
                )}
              </UserCard>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GroupInfo;
