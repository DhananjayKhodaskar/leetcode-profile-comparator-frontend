import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
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
        src="https://raw.githubusercontent.com/DhananjayKhodaskar/assets/refs/heads/main/E-LeetSquad.png"
        alt="auth-side-image"
        className="hidden md:block md:w-1/2 w-full h-screen object-cover" // Sets height to the full screen height
      />
      <Outlet />
    </div>
  );
};

export default AuthSideImage;
