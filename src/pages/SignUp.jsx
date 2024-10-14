import React from "react";
import AuthHeader from "@/components/AuthHeader";
import LeetCodeForm from "@/components/LeetCodeForm";
import ProfileCard from "@/components/ProfileCard";
import { useFetchLeetCodeDataMutation } from "@/services/auth";
import ProfileCardSkeleton from "@/components/skeletons/ProfileCardSkeleton";

const SignUp = () => {
  const [
    fetchLeetCodeData,
    {
      data: leetcodeUserData,
      error: leetcodeUserError,
      isLoading: leetcodeUserLoading,
    },
  ] = useFetchLeetCodeDataMutation();

  const onSubmit = async (formValues) => {
    const { confirmPassword, ...values } = formValues;

    try {
      const response = await fetchLeetCodeData(values).unwrap();
      console.log("Fetched Data:", response);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
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
        <ProfileCard data={leetcodeUserData} />
      )}
    </div>
  );
};

export default SignUp;
