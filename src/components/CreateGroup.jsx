import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import AvatarButton from "./AvatarButton";
import { CirclePlus, Loader2 } from "lucide-react";
import { Textarea } from "./ui/textarea";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { createGroupSchema } from "@/validation/createGroupSchema";
import {
  useCreateGroupMutation,
  useFetchJoinedGroupsQuery,
} from "@/services/group";

const CreateGroup = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [createGroup, { isLoading }] = useCreateGroupMutation();
  const { refetch } = useFetchJoinedGroupsQuery();

  const form = useForm({
    resolver: zodResolver(createGroupSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    form.reset();
    setIsDialogOpen(false);
  };

  const onSubmit = (values) => {
    createGroup(values)
      .unwrap()
      .then(() => refetch())
      .catch((err) => {
        console.error("Login failed:", err);
      })
      .finally(() => handleDialogClose());
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AvatarButton
        groupName={"Add Squad"}
        ButtonIconComponent={CirclePlus}
        buttonName="Create Squad"
        handleOnClick={handleDialogOpen}
      />
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a New Squad</DialogTitle>
          <DialogDescription>
            Bring your team together with a new squad.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      id="name"
                      placeholder="Enter squad name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      id="description"
                      placeholder="Enter squad description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? "Creating Squad" : "Create Squad"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroup;
