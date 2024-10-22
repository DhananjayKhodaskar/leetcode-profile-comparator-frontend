import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Plus } from "lucide-react";

const AvatarButton = ({
  buttonName,
  ButtonIconComponent,
  iconBackgrounColor = "bg-slate-100",
  iconColor = "",
  handleOnClick = () => "",
}) => {
  return (
    <div className="cursor-pointer" onClick={handleOnClick}>
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Avatar>
              <ButtonIconComponent
                size={40}
                className={`${iconBackgrounColor} ${iconColor} rounded-lg w-12 h-12 p-3`}
              />
            </Avatar>
          </TooltipTrigger>
          <TooltipContent side="right" className="bg-black-russian">
            <p className="font-extrabold">{buttonName}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default AvatarButton;
