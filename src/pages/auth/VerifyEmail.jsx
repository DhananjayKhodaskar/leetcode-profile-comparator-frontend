// src/pages/VerifyEmail.js
import AuthHeader from "@/components/AuthHeader";
import AuthHeaderSkeleton from "@/components/skeletons/AuthHeaderSkeleton";
import { useVerifyEmailQuery } from "@/services/auth";
import React from "react";
import { useParams } from "react-router-dom";

const VerifyEmail = () => {
  const { token } = useParams();
  const { data, error, isSuccess, isLoading } = useVerifyEmailQuery(token);

  if (isLoading) {
    return (
      <div className="flex flex-col w-full justify-center items-center gap-6 mt-8">
        <AuthHeaderSkeleton />
      </div>
    );
  }

  const title = isSuccess
    ? "Email Verification Successful"
    : "Email Verification Failed";
  const subtitle = isSuccess
    ? data?.message
    : error?.data?.message || "Something went wrong";

  return (
    <div className="flex flex-col w-full justify-center items-center gap-6 mt-8">
      <AuthHeader
        title={title}
        subtitle={subtitle}
        linkText="Login"
        linkHref="/auth/login"
      />
    </div>
  );
};

export default VerifyEmail;
