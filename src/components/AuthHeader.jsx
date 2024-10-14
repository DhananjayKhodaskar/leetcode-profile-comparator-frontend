import React from "react";

const AuthHeader = ({ title, subtitle, linkText, linkHref }) => {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <span className="text-sm text-gray-600">
        {subtitle}{" "}
        {linkText && (
          <a href={linkHref || "#"} className="underline">
            {linkText}
          </a>
        )}
      </span>
    </div>
  );
};

export default AuthHeader;
