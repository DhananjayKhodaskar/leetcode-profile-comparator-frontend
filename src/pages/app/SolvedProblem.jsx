import React, { useState } from "react";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
} from "@/components/ui/table"; // Assuming you have these components
import { useGetAllSolvedProblemsQuery } from "@/services/challenge";
import { Button } from "@/components/ui/button";
import { ChallengeDetailsDrawer } from "@/components/ChallengeDetailsDrawer";

const SolvedProblem = () => {
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State for drawer visibility
  const [activeChallengeId, setActiveChallengeId] = useState(""); // State for selected active challenge ID
  const limit = 5; // Set limit per page

  const { data, isLoading, error } = useGetAllSolvedProblemsQuery({
    page: currentPage,
    limit,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching solved problems</div>;
  }

  const { solvedProblems, totalPages } = data?.data || {};

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleChallengeClick = (challengeId) => {
    setActiveChallengeId(challengeId); // Set the clicked challenge ID
    setIsDrawerOpen(true); // Open the drawer
  };

  return (
    <div className="h-full w-full">
      <div className="relative h-[20vh] w-full">
        <img
          src="https://raw.githubusercontent.com/DhananjayKhodaskar/assets/refs/heads/main/2142076.jpg" // Replace with the actual image source for this page
          alt="Solved Problems Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center text-white">
          <h2 className="text-xl md:text-3xl font-bold">Solved Problems</h2>
        </div>
      </div>

      <div className="py-4 px-4">
        <h2 className="text-lg font-semibold mb-2">Your Solved Problems</h2>
        <p className="text-gray-500 mb-4">
          Explore the problems you have successfully completed.
        </p>

        <Table className="border rounded-md">
          <TableCaption>A list of solved problems by the user.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Title Slug</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Active Challenge ID</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {solvedProblems?.map((problem, index) => (
              <TableRow key={index}>
                <TableCell>{problem.titleSlug || "N/A"}</TableCell>
                <TableCell>{problem.method || "N/A"}</TableCell>
                <TableCell
                  className="cursor-pointer text-blue-500"
                  onClick={() =>
                    handleChallengeClick(problem.activeChallengeId)
                  } // Handle click
                >
                  {problem.activeChallengeId || "N/A"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3} className="flex gap-2">
                <Button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <Button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>

        <ChallengeDetailsDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          activeChallengeId={activeChallengeId}
          groupId={null}
        />
      </div>
    </div>
  );
};

export default SolvedProblem;
