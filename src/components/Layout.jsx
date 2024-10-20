import React from "react";
import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import SubSidebar from "./SubSidebar";

const Layout = () => {
  return (
    <div className="flex min-h-screen">
      {" "}
      {/* Ensure full height */}
      <Sidebar className="bg-slate-800" />
      <SubSidebar className="bg-slate-800" />
      <div className="flex flex-col flex-1">
        {" "}
        {/* Wrap Navbar and Outlet in a flex column */}
        <Navbar />
        <div className="flex-1">
          {" "}
          {/* Outlet Container */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
