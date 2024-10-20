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
import { CircleX, ExternalLink, Loader2, UserRoundPlus } from "lucide-react";
import { useSearchUserMutation } from "@/services/user";
import UserCard from "./UserCard";
import { Badge } from "./ui/badge";
import { useAddMemberToGroupMutation } from "@/services/group";

const AddMemberModal = ({ groupId, refetchGroupInfo }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const [searchUser] = useSearchUserMutation();
  const [addMemberToGroup, { isLoading }] = useAddMemberToGroupMutation();

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

  useEffect(() => {
    if (!isDialogOpen) handleDialogClose();
  }, [isDialogOpen]);

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setSearchQuery("");
    setSelectedUser(null);
    setSearchResults([]);
    setIsDialogOpen(false);
  };

  const handleRemoveUser = () => {
    setSelectedUser(null);
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleAddMember = () => {
    addMemberToGroup({ userId: selectedUser._id, groupId })
      .then(() => {
        refetchGroupInfo();
      })
      .finally(() => handleDialogClose());
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
        {!selectedUser ? (
          <>
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
                        handleClick={(e) => setSelectedUser(user)}
                      >
                        <Badge variant="secondary" className="h-5 rounded-full">
                          <a
                            href={`https://leetcode.com/u/${username}`}
                            target="_blank"
                            onClick={(e) => e.stopPropagation()}
                            className="flex flex-row justify-center items-center gap-2"
                          >
                            View Profile
                            <ExternalLink size={12} />
                          </a>
                        </Badge>
                      </UserCard>
                    );
                  })}
                </ul>
              </div>
            )}
          </>
        ) : (
          <UserCard
            realName={selectedUser?.realName}
            userAvatar={selectedUser?.userAvatar}
            username={selectedUser?.username}
          >
            <CircleX className="cursor-pointer" onClick={handleRemoveUser} />
          </UserCard>
        )}
        {selectedUser && (
          <DialogFooter>
            <Button onClick={handleAddMember}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Add Member
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddMemberModal;
