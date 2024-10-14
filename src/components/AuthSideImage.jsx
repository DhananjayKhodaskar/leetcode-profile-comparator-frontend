import React from "react";
import { Outlet } from "react-router-dom";

const AuthSideImage = () => {
  return (
    <div className="flex min-h-screen">
      <img
        src="https://images.unsplash.com/photo-1579546929662-711aa81148cf?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="auth-side-image"
        className="hidden md:block md:w-1/2"
      />
      <Outlet />
    </div>
  );
};

export default AuthSideImage;
