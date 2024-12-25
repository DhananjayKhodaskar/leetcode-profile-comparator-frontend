import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import authImg from "@/assets/E-LeetSquad.png";
import { useSelector } from "react-redux";

const AuthSideImage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user?.user);

  useEffect(() => {
    if (user && user?.token) {
      navigate("/app");
    }
  }, [user, navigate]);

  return (
    <div className="flex min-h-screen overflow-hidden">
      {" "}
      {/* Prevents scrolling */}
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
