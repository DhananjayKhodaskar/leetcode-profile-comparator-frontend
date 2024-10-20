import { useState, useEffect } from "react";
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
import { useSearchUserMutation } from "@/services/user";
import UserCard from "./UserCard";
import { Badge } from "./ui/badge";

const AddMemberModal = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [searchUser] = useSearchUserMutation();

  useEffect(() => {
    const fetchUsers = async () => {
      if (searchQuery.trim() === "") {
        setSearchResults([]);
        return;
      }

      try {
        const result = await searchUser(searchQuery).unwrap();
        setSearchResults(result);
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
    setSearchQuery("");
    setSearchResults([]);
    setIsDialogOpen(false);
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
            Enter the user email, leetcode id or name
          </DialogDescription>
        </DialogHeader>
        <Input
          id="email"
          placeholder="e.g. John Doe"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchResults.length > 0 && (
          <div className="mt-4">
            <h4>Search Results:</h4>
            <ul>
              {searchResults.map((user) => {
                const { userAvatar, realName, _id, username } = user;
                return (
                  <UserCard
                    key={_id}
                    userAvatar={userAvatar}
                    realName={realName}
                    username={username}
                  >
                    <Badge variant="secondary" className="h-5 rounded-full">
                      <a
                        href={`https://leetcode.com/u/${username}`}
                        target="_blank"
                      >
                        View Profile
                      </a>
                    </Badge>
                  </UserCard>
                );
              })}
            </ul>
          </div>
        )}
        <DialogFooter>
          <Button onClick={handleDialogClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddMemberModal;
