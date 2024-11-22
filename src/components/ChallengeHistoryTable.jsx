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
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { Button } from "./ui/button";
import { useGetChallengeHistoryQuery } from "@/services/challenge";
import { useParams } from "react-router-dom";
import { ChallengeDetailsDrawer } from "./ChallengeDetailsDrawer";

export function ChallengeHistoryTable() {
  const { groupId } = useParams();
  const { data: response } = useGetChallengeHistoryQuery(groupId);
  const challengeHistoryData = response?.data || [];
  const [selectedActiveChallenge, setSelectedActiveChallenge] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = challengeHistoryData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(challengeHistoryData.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleChallengeClick = (challengeId) => {
    setSelectedActiveChallenge(challengeId);
    setIsDrawerOpen(true);
  };

  return (
    <div>
      <Table className="border rounded-md">
        <TableCaption>
          A list of finished challenges in your group.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Active Challenge ID</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.map((challenge) => (
            <TableRow key={uuidv4()}>
              <TableCell>{challenge.name || "N/A"}</TableCell>
              <TableCell>{challenge.description || "N/A"}</TableCell>
              <TableCell
                onClick={() =>
                  handleChallengeClick(challenge.activeChallengeId)
                }
                className="cursor-pointer text-blue-500"
              >
                {challenge.activeChallengeId || "N/A"}
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
        onClose={setIsDrawerOpen}
        activeChallengeId={selectedActiveChallenge}
        groupId={groupId}
      />
    </div>
  );
}
