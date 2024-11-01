import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import {
  LogOut,
  MessageSquare,
  NotebookPen,
  Swords,
  UserRoundCog,
} from "lucide-react";
import CustomNavLink from "./CustomNavLink";
import { clearUser } from "@/slices/userSlice";

const SubSidebar = () => {
  const { selectedGroup } = useSelector((state) => state.group);
  const dipatch = useDispatch();
  return (
    <div
      className={`${cn(
        "pb-12"
      )} bg-vampire-black w-60 flex flex-col items-center`}
    >
      <div className="w-full border-b-2 border-b-black-russian text-xl font-bold font-sans text-slate-200 h-20 flex flex-row justify-center items-center">
        E-<span className="text-yellow-500">Leet</span>Squad
      </div>
      <div className="space-y-4 py-4 w-full flex flex-col items-center justify-between h-full">
        <div>
          <CustomNavLink
            to={`group/${selectedGroup?._id}/chat`}
            icon={MessageSquare}
            label="Chat"
          />
          <CustomNavLink
            to={`group/${selectedGroup?._id}/challenge`}
            icon={Swords}
            label="Challenge"
          />
          <CustomNavLink
            to={`group/${selectedGroup?._id}/progress`}
            icon={NotebookPen}
            label="Progress"
          />
          <CustomNavLink
            to={`group/${selectedGroup?._id}/manage`}
            icon={UserRoundCog}
            label="Manage"
          />
        </div>
        <Button
          variant="ghost"
          className="w-48 text-slate-300 flex flex-row justify-start items-center gap-3 cursor-pointer p-2 rounded hover:text-red-500 hover:bg-transparent"
          onClick={() => dipatch(clearUser())}
        >
          <LogOut />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default SubSidebar;
