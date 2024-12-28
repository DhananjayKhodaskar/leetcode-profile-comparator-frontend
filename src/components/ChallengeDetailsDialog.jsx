import React, { useEffect, useState } from "react";
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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  const [dateError, setDateError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSubmit = async () => {
    // Check if the date is today or later
    if (!date || new Date(date) < new Date()) {
      setDateError("The date must be today or later.");
      return; // Prevent form submission
    }
    setDateError(""); // Clear any existing error

    const challengeData = {
      challengeId: selectedChallengeId,
      groupId: selectedGroup._id,
      description,
      endDate: date, // Include date in the payload
    };
    try {
      const result = await createActiveChallenge(challengeData).unwrap();
      refetchActiveChallengeDetails();
      setCreateChallengeModalOpen(false); // Close modal after submission
      setDescription(""); // Reset description
      setDate(null); // Reset date
    } catch (err) {
      console.error("Failed to create challenge:", err);
    }
  };

  useEffect(() => {
    setDateError(""); // Clear any existing error
  }, [date]);

  const challenge = response?.data;
  const problems = challenge?.problems || [];

  // Calculate the index range for current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProblems = problems.slice(startIndex, endIndex);

  // Calculate the total pages
  const totalPages = Math.ceil(problems.length / itemsPerPage);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-1/2">
        <DialogHeader>
          <DialogTitle>{challenge?.name}</DialogTitle>
          <DialogDescription>{challenge?.description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 max-h-96 overflow-auto">
          <Table>
            <TableCaption>A list of the challenge problems.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Title</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead>Link</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentProblems.map((problem) => (
                <TableRow key={problem._id}>
                  <TableCell className="font-medium">
                    {problem?.title}
                  </TableCell>
                  <TableCell>{problem?.difficulty}</TableCell>
                  <TableCell>
                    <a
                      href={problem?.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      View Problem
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3} className="text-center">
                  <Button
                    disabled={currentPage === 1}
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                  >
                    Previous
                  </Button>
                  <span className="mx-2">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    disabled={currentPage === totalPages}
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                  >
                    Next
                  </Button>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
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
            <DialogTitle>Start New Challenge</DialogTitle>
            <DialogDescription>Fill in the details below:</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <textarea
              className="border rounded-md p-2 w-full"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div>
              <label
                htmlFor="challenge-end-date"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Challenge End Date
              </label>
              <DatePickerDemo
                id="challenge-end-date"
                date={date}
                setDate={setDate}
              />
            </div>
            {dateError && <p className="text-red-500 text-sm">{dateError}</p>}
          </div>

          <DialogFooter>
            <Button
              variant="primary"
              onClick={handleSubmit}
              disabled={isLoading || !date || dateError}
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
