import React from "react";
import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

const Layout = () => {
  return (
    <div className="flex min-h-screen"> {/* Ensure full height */}
      <Sidebar className="w-64 bg-slate-500" />
      <div className="flex flex-col flex-1"> {/* Wrap Navbar and Outlet in a flex column */}
        <Navbar />
        <div className="flex-1 bg-gray-100 p-4"> {/* Outlet Container */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
