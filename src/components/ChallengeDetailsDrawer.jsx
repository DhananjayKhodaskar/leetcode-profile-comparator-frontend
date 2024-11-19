import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
  } from "@/components/ui/drawer";
  import { Button } from "./ui/button";
  import ChallengeProblemTable from "./ChallengeProblemTable";
  
  export function ChallengeDetailsDrawer({
    isOpen,
    onClose,
    activeChallengeId,
    groupId,
  }) {
    return (
      <Drawer open={isOpen} onOpenChange={onClose}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Challenge Details</DrawerTitle>
          </DrawerHeader>
          {activeChallengeId && (
            <ChallengeProblemTable
              showUserDropdown={false}
              activeChallengeId={activeChallengeId}
              groupId={groupId}
              joinedUsers={[]}
              forHistory={true}
            />
          )}
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerContent>
      </Drawer>
    );
  }
  