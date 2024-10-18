import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useFetchJoinedGroupsQuery } from "@/services/group";
import { useSelector } from "react-redux";
import GroupAvatar from "./GroupAvatar";
import { CirclePlus } from "lucide-react";
import CreateGroupAvatar from "./CreateGroupAvatar";

export function Sidebar() {
  const {
    data: groupData,
    error,
    isSuccess,
    isLoading,
  } = useFetchJoinedGroupsQuery();
  const { joinedGroups } = useSelector((state) => state.group);

  return (
    <div className={cn("pb-12")}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2 w-[72px]">
          <div className="space-y-3">
            {joinedGroups?.length &&
              joinedGroups.map((group) => (
                <GroupAvatar
                  key={group.groupId}
                  groupName={group.groupName}
                  groupAvatar={group.groupAvatar}
                />
              ))}
            <CreateGroupAvatar
              groupName={"Add Squad"}
              groupAvatar={<CirclePlus color="red" />}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
