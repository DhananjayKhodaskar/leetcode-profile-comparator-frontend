import * as React from "react";
import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSelector } from "react-redux";

export function SelectUserProblemTableDropdown({
  joinedUsers,
  selectedUserId,
  setSelectedUserId,
  user,
}) {
  const handleValueChange = (userId) => {
    setSelectedUserId(userId);
  };

  return (
    <Select onValueChange={handleValueChange} value={selectedUserId}>
      <SelectTrigger className="w-[250px]">
        <SelectValue placeholder="Select a user" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Users</SelectLabel>
          {joinedUsers.map((member) => (
            <SelectItem key={member._id} value={member._id}>
              {member.realName} (
              {user._id === member._id ? "You" : member.username})
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
