import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";
import { MessageSquare, UserRoundCog } from "lucide-react";
import CustomNavLink from "./CustomNavLink";

const SubSidebar = () => {
  const { selectedGroup } = useSelector((state) => state.group);
  return (
    <div
      className={`${cn(
        "pb-12"
      )} bg-vampire-black w-60 flex flex-col items-center`}
    >
      <div className="w-full border-b-2 border-b-black-russian text-xl font-bold font-sans text-slate-200 h-20 flex flex-row justify-center items-center">
        E-<span class="text-yellow-500">Leet</span>Squad
      </div>
      <div className="space-y-4 py-4 w-full flex flex-col items-center">
        <CustomNavLink
          to={`group/${selectedGroup?._id}/chat`}
          icon={MessageSquare}
          label="Chat"
        />
        <CustomNavLink
          to={`group/${selectedGroup?._id}/manage`}
          icon={UserRoundCog}
          label="Manage"
        />
      </div>
    </div>
  );
};

export default SubSidebar;
