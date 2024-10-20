import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";

const UserCard = ({
  _id,
  userAvatar,
  realName,
  username,
  groupRole,
  children,
  handleClick = () => "",
}) => {
  return (
    <div
      className="flex flex-row justify-between items-center"
      onClick={handleClick}
    >
      <div className="flex flex-row gap-2 items-center">
        <Avatar>
          <AvatarImage
            src={userAvatar}
            alt={realName}
            className="rounded-full w-11 h-11"
          />
          <AvatarFallback className="rounded-full w-11 h-11 flex justify-center items-center bg-slate-50">
            <h3 className="text-4xl font-bold rounded-full text-slate-950">
              {realName ? realName.charAt(0).toUpperCase() : ""}
            </h3>
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="leading-7">{realName}</p>
          <p className="leading-7 text-slate-500">{username}</p>
        </div>
      </div>
      {children && <div className="flex items-center">{children}</div>}
    </div>
  );
};

export default UserCard;
