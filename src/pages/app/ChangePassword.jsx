import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import AuthHeader from "@/components/AuthHeader";

import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { updatePasswordSchema } from "@/validation/changePassword";
import { useChangePasswordMutation } from "@/services/user";
import backgroundImage from "@/assets/E-LeetSquad.png";

const ChangePassword = () => {
  const form = useForm({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const navigate = useNavigate();
  const [updatePassword, { isLoading }] = useChangePasswordMutation();

  const onSubmit = (data) => {
    updatePassword(data)
      .unwrap()
      .then(() => {
        console.log("Password updated successfully!");
        navigate("/app");
      })
      .catch((err) => {
        console.error("Password update failed:", err);
      });
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <div className="flex flex-col gap-3">
          <AuthHeader
            title="Update Password"
            subtitle="Remember your password?"
            linkText="Go to Dashboard"
            linkHref={"/app"}
          />
          <Form {...form}>
            <form
              method="POST"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5"
            >
              <FormField
                control={form.control}
                name="oldPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Old Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your old password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your new password"
                        {...field}
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
                      <Input
                        type="password"
                        placeholder="Re-enter your new password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? "Updating" : "Update Password"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
