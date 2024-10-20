import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SubSidebar = () => {
  const navigate = useNavigate();
  const { selectedGroup } = useSelector((state) => state.group);
  return (
    <div className={cn("pb-12")}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2 w-60">
          <Button
            variant="outline"
            className="w-full flex-row gap-2 "
            onClick={() => {
              navigate(`group/${selectedGroup?.groupId}/chat`);
            }}
          >
            <Mail /> Chat
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubSidebar;
