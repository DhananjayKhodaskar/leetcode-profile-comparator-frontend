import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input"; // Import Input component
import { pastelBgColor } from "@/utils/config";
import ChallengeDetailsDialog from "./ChallengeDetailsDialog";
import CreateCustomChallengeDialog from "./CreateCustomChallengeDialog";
import { useGetChallengesQuery } from "@/services/challenge";
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import startChallegeImg from "../assets/StartChallenge.jpeg";

const StartChallenge = ({ refetchActiveChallengeDetails }) => {
  const [selectedChallengeId, setSelectedChallengeId] = useState(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isCustomDialogOpen, setIsCustomDialogOpen] = useState(false);
  const [page, setPage] = useState(1); // Page state
  const [pageSize, setPageSize] = useState(10); // Page size state
  const [searchTerm, setSearchTerm] = useState(""); // Search term state

  // Query with pagination and search parameters
  const {
    data: response,
    isLoading,
    error,
  } = useGetChallengesQuery({ page, pageSize, search: searchTerm });
  const resData = response?.data || [];

  const handleRowClick = (challengeId) => {
    setSelectedChallengeId(challengeId);
    setIsDetailsDialogOpen(true);
  };

  const closeDetailsDialog = () => {
    setIsDetailsDialogOpen(false);
    setSelectedChallengeId(null);
  };

  const handleCreateCustomChallenge = () => {
    setIsCustomDialogOpen(true);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (e) => {
    setPageSize(parseInt(e.target.value, 10));
    setPage(1); // Reset to the first page when page size changes
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1); // Reset to the first page when search changes
  };

  return (
    <div className="h-full w-full">
      <div className="relative h-[20vh] w-full">
        <img
          src={startChallegeImg}
          alt="Challenge Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center text-white">
          <h2 className="text-xl md:text-3xl font-bold">Select a Challenge</h2>
        </div>
      </div>

      <div className="py-4 px-4">
        <h2 className="text-lg font-semibold mb-2">Challenges</h2>
        <p className="text-gray-500 mb-4">Choose a challenge to get started.</p>

        {/* Search Field */}
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Search challenges..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error fetching challenges.</p>
        ) : (
          <Table>
            <TableCaption>A list of available challenges.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Challenge Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Total Problems</TableHead>
                <TableHead className="text-right">Created By</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {resData?.challenges?.map((challenge) => (
                <TableRow
                  key={challenge._id}
                  className="cursor-pointer"
                  onClick={() => handleRowClick(challenge._id)}
                >
                  <TableCell className="font-medium">
                    {challenge.name}
                  </TableCell>
                  <TableCell>{challenge.description}</TableCell>
                  <TableCell className="text-right">
                    {challenge.totalProblems}
                  </TableCell>
                  <TableCell className="text-right">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost">
                            {challenge.createdBy.realName}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="flex flex-col">
                            <p>
                              <strong>Username:</strong>{" "}
                              {challenge.createdBy.username}
                            </p>
                            <p>
                              <strong>Email:</strong>{" "}
                              {challenge.createdBy.email}
                            </p>
                            <p>
                              <strong>Role:</strong> {challenge.createdBy.role}
                            </p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        <TableFooter>
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="space-x-2">
              <Button
                disabled={page === 1}
                onClick={() => handlePageChange(page - 1)}
                className="mr-2"
              >
                Previous
              </Button>
              <Button
                onClick={() => handlePageChange(page + 1)}
                className="ml-2"
                disabled={resData?.totalPages == page}
              >
                Next
              </Button>
            </div>
          </div>
        </TableFooter>
      </div>

      {selectedChallengeId && (
        <ChallengeDetailsDialog
          selectedChallengeId={selectedChallengeId}
          isOpen={isDetailsDialogOpen}
          onClose={closeDetailsDialog}
          refetchActiveChallengeDetails={refetchActiveChallengeDetails}
        />
      )}

      <CreateCustomChallengeDialog
        isOpen={isCustomDialogOpen}
        onOpenChange={setIsCustomDialogOpen}
      />
    </div>
  );
};

export default StartChallenge;
