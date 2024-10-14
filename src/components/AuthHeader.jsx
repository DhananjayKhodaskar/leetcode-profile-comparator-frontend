import React from "react";
import PropTypes from "prop-types";

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

AuthHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  linkText: PropTypes.string,
  linkHref: PropTypes.string,
};

AuthHeader.defaultProps = {
  subtitle: "",
  linkText: "",
  linkHref: "",
};

export default AuthHeader;
