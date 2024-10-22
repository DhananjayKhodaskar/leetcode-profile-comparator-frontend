import { cn } from "@/lib/utils";
import {
  useFetchJoinedGroupsQuery,
  useGetGroupInfoQuery,
} from "@/services/group";
import { useDispatch, useSelector } from "react-redux";
import GroupAvatar from "./GroupAvatar";
import CreateGroup from "./CreateGroup";
import { useParams } from "react-router-dom";
import { setSelectedGroup } from "@/slices/groupSlice";
import { useEffect } from "react";
import { pastelBgColor } from "@/utils/config";
import leetcodeLogo from "../assets/leetcodeLogo.png";
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
    <div className={cn("pb-12 bg-smoky-black w-24 flex flex-col items-center")}>
      <div className="h-20 p-5 border-b-2 border-b-black-russian">
        <img src={leetcodeLogo} alt="LeetCode Logo" width={35} height={35} />
      </div>
      <div className="space-y-4 py-4 w-full flex flex-col items-center">
        {joinedGroups.length > 0 &&
          joinedGroups.map((group, index) => (
            <GroupAvatar
              key={group.groupId}
              group={group}
              avatarBgColor={pastelBgColor[index % pastelBgColor.length]}
            />
          ))}
        <CreateGroup />
      </div>
    </div>
  );
}
