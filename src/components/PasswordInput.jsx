import React from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";

const PasswordInput = ({ field, visible, onToggle, placeholder }) => {
  return (
    <div className="relative">
      <Input
        type={visible ? "text" : "password"}
        placeholder={placeholder}
        {...field}
      />
      <span
        className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
        onClick={onToggle}
      >
        {visible ? (
          <Eye className="h-5 w-5 text-gray-500" />
        ) : (
          <EyeOff className="h-5 w-5 text-gray-500" />
        )}
      </span>
    </div>
  );
};

export default PasswordInput;
