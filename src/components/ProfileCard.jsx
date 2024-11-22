import React, { useState } from "react";
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

const ProfileCard = ({ data, onSubmit }) => {
  const [visiblePasswordField, setVisiblePasswordField] = useState(null);

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
        <Button type="submit" form="signUpForm" className="w-full">
          Complete Signup
        </Button>
        <div className="flex items-center justify-center w-full">
          <div className="border-t border-gray-300 flex-grow mr-3"></div>
          <span className="text-gray-500 font-medium">OR</span>
          <div className="border-t border-gray-300 flex-grow ml-3"></div>
        </div>
        <Button variant="outline" type="button" className="gap-1 w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="20"
            height="20"
            viewBox="0 0 50 50"
          >
            <path d="M 25.996094 48 C 13.3125 48 2.992188 37.683594 2.992188 25 C 2.992188 12.316406 13.3125 2 25.996094 2 C 31.742188 2 37.242188 4.128906 41.488281 7.996094 L 42.261719 8.703125 L 34.675781 16.289063 L 33.972656 15.6875 C 31.746094 13.78125 28.914063 12.730469 25.996094 12.730469 C 19.230469 12.730469 13.722656 18.234375 13.722656 25 C 13.722656 31.765625 19.230469 37.269531 25.996094 37.269531 C 30.875 37.269531 34.730469 34.777344 36.546875 30.53125 L 24.996094 30.53125 L 24.996094 20.175781 L 47.546875 20.207031 L 47.714844 21 C 48.890625 26.582031 47.949219 34.792969 43.183594 40.667969 C 39.238281 45.53125 33.457031 48 25.996094 48 Z"></path>
          </svg>
          Continue with google
        </Button>
      </div>
    </div>
  );
};

export default ProfileCard;
