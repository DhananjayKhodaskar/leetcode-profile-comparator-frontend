import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import PasswordInput from "./PasswordInput";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signUpFormSchema } from "@/validation/signUpSchema";

const LeetCodeForm = ({ onSubmit }) => {
  const [visiblePasswordField, setVisiblePasswordField] = useState(null);
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
    setVisiblePasswordField((prevField) => (prevField === field ? null : field));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-80">
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
  );
};

export default LeetCodeForm;
