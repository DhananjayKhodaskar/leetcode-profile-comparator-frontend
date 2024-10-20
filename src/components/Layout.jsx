import React from "react";
import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import SubSidebar from "./SubSidebar";

const Layout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar and SubSidebar components */}
      <Sidebar className="bg-slate-800" />
      <SubSidebar className="bg-slate-800" />

      <div className="flex flex-col flex-1">
        {/* Navbar component */}
        <Navbar />

        {/* Container for the Outlet */}
        <div className="flex-1 overflow-auto">
          {" "}
          {/* Ensure this section is scrollable if needed */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
