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
import { formatTimestamp, getProblemNameFromSlug } from "@/utils/getSubmissionData";
import { v4 as uuidv4 } from "uuid";

export function RecentActivityTable({ recentTableData }) {
  return (
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
        {recentTableData?.map((recentData) => (
          <TableRow key={uuidv4()}>
            <TableCell>{recentData.username}</TableCell>
            <TableCell className="font-medium">
              <a
                target="_blank"
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
        <TableRow></TableRow>
      </TableFooter>
    </Table>
  );
}
// title: submission.title,
// titleSlug: submission.titleSlug,
// timestamp: submission.timestamp,
// statusDisplay: submission.statusDisplay,
// lang: submission.lang,
// username: user.username,
