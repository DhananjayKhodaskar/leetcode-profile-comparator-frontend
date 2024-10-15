// src/pages/VerifyEmail.js
import AuthHeader from "@/components/AuthHeader";
import AuthHeaderSkeleton from "@/components/skeletons/AuthHeaderSkeleton";
import { useVerifyEmailMutation } from "@/services/auth";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const VerifyEmail = () => {
  const { token } = useParams();
  const [verifyEmail, { data, error, isLoading }] = useVerifyEmailMutation();
  const { success, message, data: responseData } = data || {};
  console.log("error: ", error);
  const handleVerifyEmail = async () => {
    try {
      await verifyEmail(token);
    } catch (error) {
      console.error("Error verifying email:", error);
    }
  };

  useEffect(() => {
    handleVerifyEmail();
  }, []);
  return (
    <div className="flex flex-col w-full justify-center items-center gap-6 mt-8">
      {isLoading ? (
        <AuthHeaderSkeleton />
      ) : (
        <AuthHeader
          title={
            success
              ? "Email Verification Successful"
              : "Email Verification Failed"
          }
          subtitle={
            success
              ? message
              : error?.data?.message
              ? error?.data?.message
              : "Something went wrong"
          }
          linkText="Login"
          linkHref={'/auth/login'}
        />
      )}
    </div>
  );
};

export default VerifyEmail;
