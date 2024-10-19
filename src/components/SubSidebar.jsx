import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const SubSidebar = ({ className, playlists }) => {
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2 w-60"></div>
      </div>
    </div>
  );
};

export default SubSidebar;
