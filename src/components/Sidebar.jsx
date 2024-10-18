import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useFetchJoinedGroupsQuery } from "@/services/group";
import { useDispatch, useSelector } from "react-redux";
import GroupAvatar from "./GroupAvatar";
import { CirclePlus, LogOut } from "lucide-react";
import AvatarButton from "./AvatarButton";
import { clearUser } from "@/slices/userSlice";

export function Sidebar() {
  const dispatch = useDispatch();
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
            {joinedGroups.length > 0 &&
              joinedGroups.map((group) => (
                <GroupAvatar
                  key={group.groupId}
                  groupName={group.groupName}
                  groupAvatar={group.groupAvatar}
                />
              ))}
            <AvatarButton
              groupName={"Add Squad"}
              ButtonIconComponent={CirclePlus}
              buttonName="Create Squad"
              handleOnClick={() => console.log("create button clicked")}
            />
            <AvatarButton
              groupName={"Add Squad"}
              ButtonIconComponent={LogOut}
              iconColor="text-red-600"
              buttonName="Log Out"
              handleOnClick={() => dispatch(clearUser())}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
