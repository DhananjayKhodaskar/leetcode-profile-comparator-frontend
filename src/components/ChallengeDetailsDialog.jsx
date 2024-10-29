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
import {
  useCreateActiveChallengeMutation,
  useGetChallengeByIdQuery,
} from "@/services/challenge";
import { useSelector } from "react-redux";
import { DatePickerDemo } from "./DatePickerDemo";

const ChallengeDetailsDialog = ({
  selectedChallengeId,
  isOpen,
  onClose,
  refetchActiveChallengeDetails,
}) => {
  const { selectedGroup } = useSelector((state) => state.group);
  const { data: response } = useGetChallengeByIdQuery(selectedChallengeId);

  const [createActiveChallenge, { isLoading, error }] =
    useCreateActiveChallengeMutation();

  // New state for the modal
  const [isCreateChallengeModalOpen, setCreateChallengeModalOpen] =
    useState(false);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(null);

  const handleSubmit = async () => {
    const challengeData = {
      challengeId: selectedChallengeId,
      groupId: selectedGroup._id,
      description,
      endDate: date, // Include date in the payload
    };
    try {
      const result = await createActiveChallenge(challengeData).unwrap();
      refetchActiveChallengeDetails();
      // Optionally reset the form or navigate to another page
      setCreateChallengeModalOpen(false); // Close modal after submission
      setDescription(""); // Reset description
      setDate(null); // Reset date
    } catch (err) {
      console.error("Failed to create challenge:", err);
    }
  };

  const challenge = response?.data;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{challenge?.name}</DialogTitle>
          <DialogDescription>{challenge?.description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 max-h-96 overflow-auto">
          {challenge?.problems?.map((problem) => (
            <Card key={problem._id} className="border p-4 bg-slate-50">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  {problem?.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  Difficulty: {problem?.difficulty}
                </p>
                <a
                  href={problem?.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  View Problem
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
        <DialogFooter>
          <Button
            variant="primary"
            onClick={() => setCreateChallengeModalOpen(true)}
          >
            Start Challenge
          </Button>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>

      {/* New Modal for Challenge Creation */}
      <Dialog
        open={isCreateChallengeModalOpen}
        onOpenChange={() => setCreateChallengeModalOpen(false)}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Challenge</DialogTitle>
            <DialogDescription>Fill in the details below:</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <textarea
              className="border rounded-md p-2 w-full"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <DatePickerDemo date={date} setDate={setDate} />
          </div>
          <DialogFooter>
            <Button
              variant="primary"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Challenge"}
            </Button>
            <Button
              variant="outline"
              onClick={() => setCreateChallengeModalOpen(false)}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Dialog>
  );
};

export default ChallengeDetailsDialog;
