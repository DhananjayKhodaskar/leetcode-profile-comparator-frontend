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
import { useResetPasswordMutation } from "@/services/auth";
import { Loader2 } from "lucide-react";
import { resetPasswordSchema } from "@/validation/resetPasswordSchema";
import AuthHeader from "@/components/AuthHeader";

const ResetPassword = () => {
  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const onSubmit = (data) => {
    const { newPassword } = data; // Only send the newPassword field
    resetPassword({ newPassword })
      .unwrap()
      .then(() => {
        console.log("Password reset successful!");
      })
      .catch((err) => {
        console.error("Reset failed:", err);
      });
  };

  return (
    <div className="flex flex-col w-full justify-center items-center gap-6 mt-8">
      <div className="flex flex-col gap-3">
        <AuthHeader
          title="Set New Password"
          subtitle="Remembered your password?"
          linkText="Go to Sign In"
          linkHref={"/auth/login"}
        />

        <Form {...form}>
          <form
            method="POST"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 w-80"
          >
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter new password"
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
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm new password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Resetting" : "Reset Password"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
