import React from "react";
import { NavLink } from "react-router-dom";

const CustomNavLink = ({ to, icon: Icon, label, className }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `w-48 text-slate-300 flex flex-row justify-start items-center gap-3 cursor-pointer ${
          isActive ? "bg-gray-700" : ""
        } p-2 rounded ${className}`
      }
    >
      {Icon && <Icon />} {/* Renders the icon if provided */}
      {label}
    </NavLink>
  );
};

export default CustomNavLink;
