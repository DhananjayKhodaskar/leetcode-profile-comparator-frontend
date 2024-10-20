import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useFetchJoinedGroupsQuery } from "@/services/group";
import { useDispatch, useSelector } from "react-redux";
import GroupAvatar from "./GroupAvatar";
import { CirclePlus, LogOut } from "lucide-react";
import AvatarButton from "./AvatarButton";
import { clearUser } from "@/slices/userSlice";
import CreateGroup from "./CreateGroup";
import { setSelectedGroup } from "@/slices/groupSlice";
import { useEffect } from "react";

export function Sidebar() {
  const dispatch = useDispatch();
  const { joinedGroups } = useSelector((state) => state.group);
  const {
    data: groupData,
    error,
    isSuccess,
    isLoading,
  } = useFetchJoinedGroupsQuery();

  useEffect(() => {
    if (joinedGroups.length > 0) {
      dispatch(setSelectedGroup(joinedGroups[0]));
    }
  }, [joinedGroups]);
  return (
    <div className={cn("pb-12")}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2 w-[72px]">
          <div className="space-y-3">
            {joinedGroups.length > 0 &&
              joinedGroups.map((group) => (
                <GroupAvatar key={group.groupId} group={group} />
              ))}
            <CreateGroup />
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
