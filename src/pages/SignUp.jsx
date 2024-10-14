import React from "react";
import AuthHeader from "@/components/AuthHeader";
import LeetCodeForm from "@/components/LeetCodeForm";
import ProfileCard from "@/components/ProfileCard";
import { useFetchLeetCodeDataMutation, useSignUpMutation } from "@/services/auth";
import ProfileCardSkeleton from "@/components/skeletons/ProfileCardSkeleton";
import { Button } from "@/components/ui/button";

const SignUp = () => {
  const [
    fetchLeetCodeData,
    {
      data: leetcodeUserData,
      error: leetcodeUserError,
      isLoading: leetcodeUserLoading,
      reset: leetcodeUserReset,
    },
  ] = useFetchLeetCodeDataMutation();

  const [
    signUp,
    {
      data: leetcodeSignUpData,
      error: leetcodeSignUpError,
      isLoading: leetcodeSignUpLoading,
    },
  ] = useSignUpMutation();

  const onSubmit = async (formValues) => {
    const { confirmPassword, ...values } = formValues;
    try {
      const response = await fetchLeetCodeData(values).unwrap();
      console.log("Fetched Data:", response);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const handleItsMe = () => {
    // Implement logic to handle the "Yes, it's me" button
    // Example: Redirect to dashboard or update user data in local storage
    signUp()
  };

  return (
    <div className="flex flex-col w-full justify-center items-center gap-6 mt-8">
      {!leetcodeUserData && !leetcodeUserLoading ? (
        <div className="flex flex-col gap-3">
          <AuthHeader
            title="Create an account"
            subtitle="Already have an account?"
            linkText="Sign In"
          />
          <LeetCodeForm onSubmit={onSubmit} />
        </div>
      ) : leetcodeUserLoading ? (
        <ProfileCardSkeleton />
      ) : (
        <div className="flex flex-col gap-3">
          <ProfileCard data={leetcodeUserData} />
          <Button className="w-full" onClick={handleItsMe}>
            Yes, it's me
          </Button>
          <Button className="w-full" onClick={leetcodeUserReset}>
            No, go back
          </Button>
        </div>
      )}
    </div>
  );
};

export default SignUp;
