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
    <div>
      <h1>Solved Problems</h1>
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
                onClick={() => handleChallengeClick(problem.activeChallengeId)} // Handle click
              >
                {problem.activeChallengeId || "N/A"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3} className="flex justify-end gap-2">
              <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
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
  );
};

export default SolvedProblem;
