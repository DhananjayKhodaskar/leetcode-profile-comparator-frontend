import { useState, useEffect } from "react";
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
import { UserRoundPlus } from "lucide-react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { addMemberSchema } from "@/validation/addMemberSchema";
import { useAddMemberToGroupMutation } from "@/services/group";
import { useSearchUserMutation } from "@/services/user";

const AddMemberModal = () => {
  const [createGroup, { isLoading: isAddMemberLoading }] =
    useAddMemberToGroupMutation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [searchUser] = useSearchUserMutation(); // Initialize the searchUser mutation
  console.log("searchResults", searchResults);
  const form = useForm({
    resolver: zodResolver(addMemberSchema),
    defaultValues: {
      email: "",
    },
  });

  useEffect(() => {
    const fetchUsers = async () => {
      if (searchQuery.trim() === "") {
        setSearchResults([]);
        return;
      }

      try {
        const result = await searchUser(searchQuery).unwrap(); // Use the searchUser mutation
        console.log("Search result:", result); // Log the search result for debugging purposes
        setSearchResults(result); // Update searchResults with the response data
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchUsers();
    }, 500); // Debounce delay of 500ms

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, searchUser]);

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    form.reset();
    setIsDialogOpen(false);
  };

  const onSubmit = (values) => {
    console.log("Member email:", values.email);
    handleDialogClose();
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AvatarButton
        groupName={"Add Member"}
        ButtonIconComponent={UserRoundPlus}
        buttonName="Add Member"
        handleOnClick={handleDialogOpen}
      />
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a New Member</DialogTitle>
          <DialogDescription>
            Enter the email of the member you want to add.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      placeholder="Enter member's email"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        setSearchQuery(e.target.value); // Update search query state
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Add Member</Button>
            </DialogFooter>
          </form>
        </Form>
        {searchResults.length > 0 && (
          <div className="mt-4">
            <h4>Search Results:</h4>
            <ul>
              {searchResults.map((user) => (
                <li key={user._id} className="py-2 border-b border-gray-200">
                  <img
                    src={user.userAvatar}
                    alt={`${user.realName}'s avatar`}
                    className="w-8 h-8 inline-block mr-2 rounded-full"
                  />
                  <span>
                    {user.realName} ({user.username}) - {user.email}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddMemberModal;
