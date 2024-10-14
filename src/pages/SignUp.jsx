import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signUpFormSchema } from "@/validation/signUpSchema";
import { Eye, EyeOff } from "lucide-react";
import AuthHeader from "@/components/AuthHeader";
import ProfileCard from "@/components/ProfileCard";
import { useFetchLeetCodeDataMutation } from "@/services/auth";

const SignUp = () => {
  const [visiblePasswordField, setVisiblePasswordField] = useState(null);
  const [
    fetchLeetCodeData,
    {
      data: leetcodeUserData,
      error: leetcodeUserError,
      isLoading: leetcodeUserLoading,
    },
  ] = useFetchLeetCodeDataMutation();

  const form = useForm({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      leetcodeUsername: "",
    },
  });

  const handleToggleVisibility = (field) => {
    setVisiblePasswordField((prevField) =>
      prevField === field ? null : field
    );
  };

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
      {!leetcodeUserData ? (
        <div className="flex flex-col gap-3">
          <AuthHeader
            title="Create an account"
            subtitle="Already have an account?"
            linkText="Sign In"
          />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5 w-80"
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
                      <div className="relative">
                        <Input
                          type={
                            visiblePasswordField === "password"
                              ? "text"
                              : "password"
                          }
                          placeholder="Enter your password"
                          {...field}
                        />
                        <span
                          className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                          onClick={() => handleToggleVisibility("password")}
                        >
                          {visiblePasswordField === "password" ? (
                            <Eye className="h-5 w-5 text-gray-500" />
                          ) : (
                            <EyeOff className="h-5 w-5 text-gray-500" />
                          )}
                        </span>
                      </div>
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
                      <div className="relative">
                        <Input
                          type={
                            visiblePasswordField === "confirmPassword"
                              ? "text"
                              : "password"
                          }
                          placeholder="Confirm your password"
                          {...field}
                        />
                        <span
                          className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                          onClick={() =>
                            handleToggleVisibility("confirmPassword")
                          }
                        >
                          {visiblePasswordField === "confirmPassword" ? (
                            <Eye className="h-5 w-5 text-gray-500" />
                          ) : (
                            <EyeOff className="h-5 w-5 text-gray-500" />
                          )}
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="leetcodeUsername"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Leetcode ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your Leetcode ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </Form>
        </div>
      ) : (
        <ProfileCard data={leetcodeUserData} />
      )}
    </div>
  );
};

export default SignUp;
