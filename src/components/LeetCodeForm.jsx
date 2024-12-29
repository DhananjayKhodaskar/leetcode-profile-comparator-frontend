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
import { leetcodeUsernameSchema } from "@/validation/signUpSchema";

const LeetCodeForm = ({ onSubmit }) => {
  const form = useForm({
    resolver: zodResolver(leetcodeUsernameSchema),
    defaultValues: {
      leetcodeUsername: "",
    },
  });

  return (
    <Form {...form}>
      <form
        method="POST"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 w-80"
      >
        <FormField
          control={form.control}
          name="leetcodeUsername"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Leetcode ID{" "}
                <a
                  className="underline"
                  href="https://raw.githubusercontent.com/DhananjayKhodaskar/assets/refs/heads/main/image.png"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  (example):
                </a>
              </FormLabel>

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
