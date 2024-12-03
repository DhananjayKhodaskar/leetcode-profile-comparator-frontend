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
import { useLoginMutation, useLoginWithGoogleMutation } from "@/services/auth";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const [login, { data: leetcodeLoginData, error, isLoading }] =
    useLoginMutation();
  const [
    loginWithGoogle,
    { data: loginWithGoogleData, error: singUpWithGoogleLogin },
  ] = useLoginWithGoogleMutation();
  const { success, message, data } = leetcodeLoginData || {};

  const onSubmit = (data) => {
    login(data)
      .unwrap()
      .then(() => {
        navigate("/app");
      })
      .catch((err) => {
        console.error("Login failed:", err);
      });
  };

  const handleLoginWithGoogle = (credential) => {
    loginWithGoogle(credential)
      .unwrap()
      .then(() => {
        navigate("/app");
      })
      .catch((err) => {
        console.error("Login failed:", err);
      });
  };

  return (
    <div className="flex flex-col w-full justify-center items-center gap-6 mt-8">
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
            <span className="text-sm text-gray-600">
              <a href={"/auth/forgot-password"} className="underline">
                Forgot Password
              </a>
            </span>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Logging In" : "Login"}
            </Button>
          </form>
          <div className="flex items-center justify-center w-full">
            <div className="border-t border-gray-300 flex-grow mr-3"></div>
            <span className="text-gray-500 font-medium">OR</span>
            <div className="border-t border-gray-300 flex-grow ml-3"></div>
          </div>
          <div className="flex flex-row justify-center">
            <GoogleLogin
              onSuccess={handleLoginWithGoogle}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
