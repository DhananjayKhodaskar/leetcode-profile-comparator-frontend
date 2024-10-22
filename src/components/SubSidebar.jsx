import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const SubSidebar = () => {
  const { selectedGroup } = useSelector((state) => state.group);
  return (
    <div className={`${cn("pb-12")} bg-vampire-black`}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2 w-60">
          <NavLink to={`group/${selectedGroup?._id}/chat`}>Chat</NavLink>
        </div>
        <div className="px-3 py-2 w-60">
          <NavLink to={`group/${selectedGroup?._id}/info`}>Info</NavLink>
        </div>
      </div>
    </div>
  );
};

export default SubSidebar;
