import React from "react";
import { Outlet } from "react-router-dom";
import authImg from "../assets/E-LeetSquad.png";

const AuthSideImage = () => {
  return (
    <div className="flex min-h-screen overflow-hidden"> {/* Prevents scrolling */}
      <img
        src={authImg}
        alt="auth-side-image"
        className="hidden md:block md:w-1/2 w-full h-screen object-cover" // Sets height to the full screen height
      />
      <Outlet />
    </div>
  );
};

export default AuthSideImage;
