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
import { formatTimestamp } from "@/utils/getSubmissionData"; // Ensure this utility handles the new timestamp format
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { Button } from "./ui/button";
import { useGetRecentActivityInActiveChallengeQuery } from "@/services/challenge";

export function RecentActivityTable({activeChallengeId}) {
  // Accept recentTableData as a prop
  const { data: response } =
    useGetRecentActivityInActiveChallengeQuery(activeChallengeId);

  const recentTableData = response?.data?.recentSubmissions || [];
  console.log(recentTableData)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = recentTableData?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(recentTableData?.length / itemsPerPage);

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

  return (
    <div>
      <Table className={"border rounded-md"}>
        <TableCaption>A list of recent activity in your group.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Username</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Time</TableHead>
            <TableHead className="text-right">Method</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems?.map((recentData) => (
            <TableRow key={uuidv4()}>
              <TableCell>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://leetcode.com/u/${recentData.username}`}
                >
                  {recentData?.realName
                    ? recentData.realName.charAt(0).toUpperCase() +
                      recentData.realName.slice(1)
                    : "N/A"}
                </a>
              </TableCell>
              <TableCell className="font-medium">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={recentData.link} // Use the new link property
                >
                  {recentData.title} {/* Display the title directly */}
                </a>
              </TableCell>
              <TableCell>{formatTimestamp(recentData.solvedAt)}</TableCell>{" "}
              <TableCell className="text-right">
                {recentData?.method
                  ? recentData.method.charAt(0).toUpperCase() +
                    recentData.method.slice(1)
                  : "N/A"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4} className="flex justify-end gap-2">
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
    </div>
  );
}
