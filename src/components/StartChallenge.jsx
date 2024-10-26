import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { pastelBgColor } from "@/utils/config";
import ChallengeDetailsDialog from "./ChallengeDetailsDialog";
import { useGetChallengesQuery } from "@/services/challenge";

const StartChallenge = ({ refetchActiveChallengeDetails }) => {
  const [selectedChallengeId, setSelectedChallengeId] = useState(null);
  const [isMainDialogOpen, setIsMainDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const { data: response, error, isLoading } = useGetChallengesQuery();
  const challenges = response?.data || [];

  const handleCardClick = (challengeId) => {
    setSelectedChallengeId(challengeId);
    setIsMainDialogOpen(false); // Close main dialog
    setIsDetailsDialogOpen(true); // Open details dialog
  };

  const closeDetailsDialog = () => {
    setIsDetailsDialogOpen(false); // Close details dialog
    setIsMainDialogOpen(true); // Reopen main dialog
    setSelectedChallengeId(null); // Clear selected challenge
  };

  return (
    <div className="h-full w-full flex flex-row justify-center items-center">
      <Dialog open={isMainDialogOpen} onOpenChange={setIsMainDialogOpen}>
        <DialogTrigger asChild>
          <Button>Start Challenge</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Select a Challenge</DialogTitle>
            <DialogDescription>
              Choose a challenge to get started.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 max-h-96 overflow-auto">
            {challenges.map((challenge, index) => (
              <Card
                key={challenge._id}
                onClick={() => handleCardClick(challenge._id)}
                className={`border p-4 cursor-pointer ${
                  pastelBgColor[index % pastelBgColor.length] || "bg-slate-50"
                }`}
              >
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    {challenge.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{challenge.description}</p>
                  <p className="text-sm text-gray-500">
                    Total Problems: {challenge.totalProblems}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <DialogFooter>
            <div className="flex flex-col gap-4 justify-center items-center w-full">
              <div className="flex items-center justify-center w-full">
                <div className="border-t border-gray-300 flex-grow mr-3"></div>
                <span className="text-gray-500 font-medium">OR</span>
                <div className="border-t border-gray-300 flex-grow ml-3"></div>
              </div>

              <Button className="w-full" variant="outline">
                Create Custom Challenge
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {selectedChallengeId && (
        <ChallengeDetailsDialog
          selectedChallengeId={selectedChallengeId}
          isOpen={isDetailsDialogOpen}
          onClose={closeDetailsDialog}
          refetchActiveChallengeDetails={refetchActiveChallengeDetails}
        />
      )}
    </div>
  );
};

export default StartChallenge;
