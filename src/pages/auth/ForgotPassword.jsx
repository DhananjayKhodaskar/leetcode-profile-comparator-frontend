import { useNavigate } from "react-router-dom";
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
import { useForgotPasswordMutation } from "@/services/auth";
import { Loader2 } from "lucide-react";
import { forgotPasswordSchema } from "@/validation/forgotPassword";
import { useToast } from "@/hooks/use-toast";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const { toast } = useToast(); // Add toast hook

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const onSubmit = async (data) => {
    try {
      await forgotPassword(data).unwrap();
      toast({
        title: "Success!",
        description: "Password reset email sent successfully.",
      });
      navigate("/auth/login");
    } catch (err) {
      toast({
        title: "Failed!",
        description:
          err?.data?.message || "An error occurred while sending the email.",
      });
      console.error("Request failed:", err);
    }
  };

  return (
    <div className="flex flex-col w-full justify-center items-center gap-6 mt-8">
      <div className="flex flex-col gap-3">
        <AuthHeader
          title="Forgot Password"
          subtitle="Remember your password?"
          linkText="Login"
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

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Submitting" : "Submit"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;
