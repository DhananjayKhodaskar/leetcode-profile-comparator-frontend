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
  formatTimestamp,
  getProblemNameFromSlug,
} from "@/utils/getSubmissionData";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { Button } from "./ui/button";

export function RecentActivityTable({ recentTableData }) {
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
      <Table>
        <TableCaption>A list of recent activity in your group.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Username</TableHead>
            <TableHead>Title Slug</TableHead>
            <TableHead>Time</TableHead>
            <TableHead className="text-right">Language</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems?.map((recentData) => (
            <TableRow key={uuidv4()}>
              <TableCell>{recentData.username}</TableCell>
              <TableCell className="font-medium">
                <a
                  target="_blank"
                  rel="noopener noreferrer" 
                  href={`https://leetcode.com/problems/${recentData.titleSlug}/description/`}
                >
                  {getProblemNameFromSlug(recentData.titleSlug)}
                </a>
              </TableCell>
              <TableCell>{formatTimestamp(recentData.timestamp)}</TableCell>
              <TableCell className="text-right">
                {recentData?.lang
                  ? recentData.lang.charAt(0).toUpperCase() +
                    recentData.lang.slice(1)
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
