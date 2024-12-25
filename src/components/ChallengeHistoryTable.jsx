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
import startChallegeImg from "@/assets/6615.jpg";

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
    <div className="h-full w-full">
    <div className="relative h-[20vh] w-full">
      <img
        src={startChallegeImg}
        alt="Finished Challenges Hero"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center text-white">
        <h2 className="text-xl md:text-3xl font-bold">Finished Challenges</h2>
      </div>
    </div>
  
    <div className="py-4 px-4">
      <Table className="border rounded-md p-3">
        <TableCaption>
          A list of finished challenges in your group.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Active Challenge ID</TableHead>
            <TableHead>Started On</TableHead>
            <TableHead>Ended On</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.map((challenge) => (
            <TableRow key={uuidv4()}>
              <TableCell>{challenge.name || "N/A"}</TableCell>
              <TableCell
                onClick={() =>
                  handleChallengeClick(challenge.activeChallengeId)
                }
                className="cursor-pointer text-blue-500"
              >
                {challenge.activeChallengeId || "N/A"}
              </TableCell>
              <TableCell>
                {challenge.startDate
                  ? new Intl.DateTimeFormat("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    }).format(new Date(challenge.startDate))
                  : "N/A"}
              </TableCell>
              <TableCell>
                {challenge.endDate
                  ? new Intl.DateTimeFormat("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    }).format(new Date(challenge.endDate))
                  : "N/A"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5} className="flex justify-end gap-2">
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
  </div>
  );
}
