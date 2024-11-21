import React from "react";
import { useParams } from "react-router-dom";
import AddMemberModal from "@/components/AddMemberModal";
import { Badge } from "@/components/ui/badge";
import UserCard from "@/components/UserCard";
import {
  useGetGroupInfoQuery,
  useLeaveOrRemoveMemberMutation,
  useMakeAdminMutation,
} from "@/services/group";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useSelector } from "react-redux";
import { DoorOpen, Trash, UserRoundX, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const GroupInfo = () => {
  const { groupId } = useParams();
  const { user } = useSelector((state) => state.user.user);

  const {
    data: groupInfo,
    error,
    isLoading,
    refetch: refetchGroupInfo,
  } = useGetGroupInfoQuery({ groupId });
  const [leaveOrRemoveMember] = useLeaveOrRemoveMemberMutation();
  const [makeAdmin] = useMakeAdminMutation();

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
    groupCreator: {
      username: creatorUsername,
      realName: creatorRealName,
      userAvatar: creatorAvatar,
    },
    joinedMember,
    name,
    totalMembers,
  } = data;

  const currentUserIsAdmin = joinedMember?.some(
    (member) => member._id === user._id && member.groupRole === "admin"
  );

  const handleLeaveGroup = async () => {
    try {
      await leaveOrRemoveMember({ groupId }).unwrap();
      refetchGroupInfo(); // Refresh the group data
    } catch (err) {
      console.error("Error leaving the group:", err.message);
    }
  };

  const handleRemoveMember = async (memberId) => {
    try {
      await leaveOrRemoveMember({ groupId, userId: memberId }).unwrap();
      refetchGroupInfo(); // Refresh the group data
    } catch (err) {
      console.error("Error removing the member:", err.message);
    }
  };

  const handleMakeAdmin = async (memberId) => {
    try {
      await makeAdmin({ groupId, userId: memberId }).unwrap();
      refetchGroupInfo(); // Refresh the group data
    } catch (err) {
      console.log(err);
      console.error("Error promoting the member:", err.message);
    }
  };

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
        <AddMemberModal groupId={groupId} refetchGroupInfo={refetchGroupInfo} />
        <div className="w-full flex flex-col gap-2">
          {joinedMember?.map((member) => {
            const { _id, username, realName, userAvatar, groupRole } = member;

            return (
              <UserCard
                key={_id}
                userAvatar={userAvatar}
                realName={user._id === _id ? "You" : realName}
                username={username}
              >
                {/* Show Badge if the user is an Admin */}
                {groupRole === "admin" && (
                  <Badge variant="secondary" className="h-5 rounded-full">
                    {groupRole.charAt(0).toUpperCase() + groupRole.slice(1)}
                  </Badge>
                )}

                {/* Button Logic */}
                {user._id === _id ? (
                  // Leave button for logged-in user
                  <TooltipProvider delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={handleLeaveGroup}
                          aria-label="Leave group"
                        >
                          <DoorOpen
                            size={16}
                            strokeWidth={2}
                            aria-hidden="true"
                          />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="border border-input bg-popover px-2 py-1 text-xs text-muted-foreground">
                        Leave Group
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : currentUserIsAdmin ? (
                  <>
                    {/* Remove button */}
                    <TooltipProvider delayDuration={0}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleRemoveMember(_id)}
                            aria-label="Remove user"
                          >
                            <UserRoundX
                              size={16}
                              strokeWidth={2}
                              aria-hidden="true"
                            />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className="border border-input bg-popover px-2 py-1 text-xs text-muted-foreground">
                          Remove User
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    {/* Promote to Admin button */}
                    <TooltipProvider delayDuration={0}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleMakeAdmin(_id)}
                            aria-label="Make admin"
                          >
                            <Shield
                              size={16}
                              strokeWidth={2}
                              aria-hidden="true"
                            />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className="border border-input bg-popover px-2 py-1 text-xs text-muted-foreground">
                          Make Admin
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </>
                ) : null}
              </UserCard>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GroupInfo;
