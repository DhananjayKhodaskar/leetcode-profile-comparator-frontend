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
import { loginSchema } from "@/validation/loginSchema";
import AuthHeader from "@/components/AuthHeader";

const Login = ({ onSubmit }) => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div className="flex flex-col w-full justify-center items-center gap-6 mt-8">
      {!form.isSubmitted ? ( // This condition is added to mimic the structure of the SignUp component
        <div className="flex flex-col gap-3">
          <AuthHeader
            title="Sign In"
            subtitle="Don't have an account?"
            linkText="Create an account"
            linkHref={"/auth/signup"}
          />
          <Form {...form}>
            <form
              method="POST"
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
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                      />
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
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </Form>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {/* Placeholder for any loading state or further actions */}
        </div>
      )}
    </div>
  );
};

export default Login;
