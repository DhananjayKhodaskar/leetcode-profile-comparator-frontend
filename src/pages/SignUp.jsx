import React, { useEffect } from "react";
import AuthHeader from "@/components/AuthHeader";
import LeetCodeForm from "@/components/LeetCodeForm";
import ProfileCard from "@/components/ProfileCard";
import {
  useFetchLeetCodeDataMutation,
  useSignUpMutation,
} from "@/services/auth";
import ProfileCardSkeleton from "@/components/skeletons/ProfileCardSkeleton";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [
    fetchLeetCodeData,
    {
      data: fetchLeetCodeResponse,
      error: leetcodeUserError,
      isLoading: leetcodeUserLoading,
    },
  ] = useFetchLeetCodeDataMutation();

  const {
    success: leetcodeUserSuccess,
    message: leetcodeUserMessage,
    data: leetcodeUserData,
  } = fetchLeetCodeResponse || {};

  const [
    signUp,
    {
      data: leetcodeSignUpData,
      error: leetcodeSignUpError,
      isLoading: leetcodeSignUpLoading,
    },
  ] = useSignUpMutation();

  const {
    success: signUpSuccess,
    message: signUpMessage,
    data: signUpData,
  } = leetcodeSignUpData || {};

  const onLeetCodeIdSubmit = async (formValues) => {
    const { confirmPassword, ...values } = formValues;
    try {
      const response = await fetchLeetCodeData(values).unwrap();
      console.log("Fetched Data:", response);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const onCredentialSubmit = async (formValues) => {
    console.log("onCredentialSubmit", formValues);
    const token = leetcodeUserData?.token || "";
    delete formValues.confirmPassword;

    signUp({ ...formValues, token });
  };

  useEffect(() => {
    if (signUpSuccess) {
      toast({
        title: "Success!",
        description: signUpMessage || "User data fetched successfully.",
      });
      navigate("/auth/login");
    }
  }, [signUpMessage, signUpSuccess, toast]);

  useEffect(() => {
    if (leetcodeUserSuccess) {
      toast({
        title: "Success!",
        description: leetcodeUserMessage || "User data fetched successfully.",
      });
    }
  }, [leetcodeUserSuccess, leetcodeUserMessage, toast]);
  return (
    <div className="flex flex-col w-full justify-center items-center gap-6 mt-8">
      {!leetcodeUserData && !leetcodeUserLoading ? (
        <div className="flex flex-col gap-3">
          <AuthHeader
            title="Create an account"
            subtitle="Already have an account?"
            linkText="Sign In"
          />
          <LeetCodeForm onSubmit={onLeetCodeIdSubmit} />
        </div>
      ) : leetcodeUserLoading || leetcodeSignUpLoading ? (
        <ProfileCardSkeleton />
      ) : (
        <div className="flex flex-col gap-3">
          <ProfileCard
            data={leetcodeUserData?.leetcodeData || {}}
            onSubmit={onCredentialSubmit}
          />
        </div>
      )}
    </div>
  );
};

export default SignUp;
