import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PasswordInput from "./PasswordInput";
import AuthHeader from "./AuthHeader";
import { signUpFormSchema } from "@/validation/signUpSchema";
import { Label } from "@radix-ui/react-dropdown-menu";
import { GoogleLogin } from "@react-oauth/google";
import { useSignUpWithGoogleMutation } from "@/services/auth";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const ProfileCard = ({
  data,
  onSubmit,
  leetcodeUserData,
  leetcodeSignUpError,
}) => {
  const [visiblePasswordField, setVisiblePasswordField] = useState(null);
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const {
    username,
    realName,
    userAvatar,
    birthday,
    countryName,
    company,
    school,
    aboutMe,
  } = data;

  const avatarFallbackText = username ? username.charAt(0).toUpperCase() : "-";

  const handleToggleVisibility = (field) => {
    setVisiblePasswordField((prevField) =>
      prevField === field ? null : field
    );
  };
  const [
    signUpWithGoogle,
    {
      data: leetcodeSignUpWithGoogleData,
      // error: leetcodeSignUpError,
      isLoading: leetcodeSignUpLoading,
    },
  ] = useSignUpWithGoogleMutation();

  const {
    success: signUpWithGoogleSuccess,
    message: signUpWithGoogleMessage,
    data: signUpWithGoogleData,
  } = leetcodeSignUpWithGoogleData || {};

  useEffect(() => {
    console.log(signUpWithGoogleSuccess);
    if (signUpWithGoogleSuccess) {
      toast({
        title: "Success!",
        description:
          signUpWithGoogleMessage || "User data fetched successfully.",
      });
      navigate("/auth/login");
    }
  }, [signUpWithGoogleMessage, signUpWithGoogleSuccess]);

  const handleSignUpWithGoogle = (codeResponse) => {
    console.log(leetcodeUserData, codeResponse, "<<<<<<<<<<<<<<<<<");
    signUpWithGoogle({ ...codeResponse, ...leetcodeUserData }); //
  };

  useEffect(() => {
    if (leetcodeSignUpError?.data?.message) {
      console.log(leetcodeSignUpError?.data?.message, "::::<<<<<<<<<<<<<<<<<");
      form.setError("form", {
        type: "manual",
        message: leetcodeSignUpError?.data?.message,
      });
    }
  }, [leetcodeSignUpError, form]);

  return (
    <div className="flex flex-col gap-3 max-h-[60vh] overflow-auto relative">
      <AuthHeader
        title="Confirm Your Leetcode Profile"
        subtitle="Not your profile? "
        linkText="Go back"
        linkHref={"/auth/login"}
      />
      <div className="flex items-center justify-center">
        <Avatar>
          <AvatarImage src={userAvatar} alt={username} size="5" />
          <AvatarFallback>{avatarFallbackText}</AvatarFallback>
        </Avatar>
      </div>

      <div className="flex flex-col space-y-2 pb-20">
        <Form {...form}>
          <form
            id="signUpForm"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 w-full mt-4"
            method="POST"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      field={field}
                      visible={visiblePasswordField === "password"}
                      onToggle={() => handleToggleVisibility("password")}
                      placeholder="Enter your password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      field={field}
                      visible={visiblePasswordField === "confirmPassword"}
                      onToggle={() => handleToggleVisibility("confirmPassword")}
                      placeholder="Confirm your password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <Label htmlFor="realName">Name</Label>
        <Input
          type="text"
          value={realName || "-"}
          disabled
          className="border-none bg-gray-100 p-2 rounded-md w-full"
          id="realName"
        />
        <Label htmlFor="username">Username</Label>
        <Input
          type="text"
          value={`@${username || "-"}`}
          disabled
          className="border-none bg-gray-100 p-2 rounded-md w-full"
          id="username"
        />

        <Label htmlFor="aboutMe">About Me</Label>
        <Input
          type="text"
          value={aboutMe || "-"}
          disabled
          className="border-none bg-gray-100 p-2 rounded-md w-full"
          id="aboutMe"
          placeholder="About Me"
        />

        <Label htmlFor="country">Location</Label>
        <Input
          type="text"
          value={countryName || "-"}
          disabled
          className="border-none bg-gray-100 p-2 rounded-md w-full"
          id="country"
          placeholder="Location"
        />

        <Label htmlFor="birthday">Birthday</Label>
        <Input
          type="text"
          value={birthday || "-"}
          disabled
          className="border-none bg-gray-100 p-2 rounded-md w-full"
          id="birthday"
          placeholder="Birthday"
        />

        <Label htmlFor="school">Education</Label>
        <Input
          type="text"
          value={school || "-"}
          disabled
          className="border-none bg-gray-100 p-2 rounded-md w-full"
          id="school"
          placeholder="Education"
        />

        <Label htmlFor="company">Company</Label>
        <Input
          type="text"
          value={company || "-"}
          disabled
          className="border-none bg-gray-100 p-2 rounded-md w-full"
          id="company"
          placeholder="Company"
        />
      </div>

      {/* Sticky Button Container */}
      <div className="sticky bottom-0 bg-white p-3 w-full flex flex-col gap-2">
        <span className="block mt-2 text-sm text-red-600">
          {form.formState.errors.form && form.formState.errors.form.message}
        </span>
        <Button type="submit" form="signUpForm" className="w-full">
          Complete Signup
        </Button>
        <div className="flex items-center justify-center w-full">
          <div className="border-t border-gray-300 flex-grow mr-3"></div>
          <span className="text-gray-500 font-medium">OR</span>
          <div className="border-t border-gray-300 flex-grow ml-3"></div>
        </div>
        <div className="flex flex-row justify-center">
          <GoogleLogin
            onSuccess={handleSignUpWithGoogle}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
