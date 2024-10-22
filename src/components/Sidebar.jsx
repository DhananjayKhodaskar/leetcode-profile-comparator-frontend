import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  useFetchJoinedGroupsQuery,
  useGetGroupInfoQuery,
} from "@/services/group";
import { useDispatch, useSelector } from "react-redux";
import GroupAvatar from "./GroupAvatar";
import { CirclePlus, LogOut } from "lucide-react";
import AvatarButton from "./AvatarButton";
import { clearUser } from "@/slices/userSlice";
import CreateGroup from "./CreateGroup";
import { useParams } from "react-router-dom";
import { setSelectedGroup } from "@/slices/groupSlice";
import { useEffect } from "react";

export function Sidebar() {
  const dispatch = useDispatch();
  const { groupId } = useParams();
  const { selectedGroup } = useSelector((state) => state.group);
  const { joinedGroups } = useSelector((state) => state.group);
  const { data: resData } = useGetGroupInfoQuery(
    { groupId },
    { skip: !groupId }
  );

  useFetchJoinedGroupsQuery();

  useEffect(() => {
    console.log(selectedGroup?.name, "name");
  }, [selectedGroup]);

  useEffect(() => {
    if (resData?.data) {
      dispatch(setSelectedGroup(resData.data));
    }
  }, [resData]);

  return (
    <div className={cn("pb-12 bg-smoky-black w-20")}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2 w-[72px]">
          <div className="space-y-3">
            {joinedGroups.length > 0 &&
              joinedGroups.map((group) => (
                <GroupAvatar key={group.groupId} group={group} />
              ))}
            <CreateGroup />
            {/* <AvatarButton
              groupName={"Add Squad"}
              ButtonIconComponent={LogOut}
              iconColor="text-red-600"
              buttonName="Log Out"
              handleOnClick={() => dispatch(clearUser())}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
