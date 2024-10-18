import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Plus } from "lucide-react";

const CreateGroupAvatar = ({ groupName }) => {
  return (
    <div className="cursor-pointer">
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Avatar>
              <Plus size={40} className="bg-gray-700 rounded-full w-12 h-12 p-3" />
            </Avatar>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p className="font-extrabold">{groupName}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default CreateGroupAvatar;
