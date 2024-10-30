import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTableDemo } from "./DataTableDemo";
import ChallengeDetails from "./ChallengeDetails";
import { useGetActiveChallengeProblemsQuery } from "@/services/challenge";
import { SelectUserProblemTableDropdown } from "./SelectUserProblemTableDropdown";
import { useState } from "react";
import { useSelector } from "react-redux";
import { SelectCategoryDropdown } from "./SelectCategoryDropdown";

export function CustomTabs({ activeChallenge, refetchActiveChallengeDetails }) {
  const { user } = useSelector((state) => state.user.user);
  const [paginationData, setPaginationData] = useState({
    page: 1,
    limit: 10,
    selectedCategories: [],
  });
  const [selectedUserId, setSelectedUserId] = useState(user?._id);
  const {
    _id,
    challenge,
    startedBy,
    groupId,
    startDate,
    endDate,
    description,
    __v,
    status,
    joinedUsers,
    challengeDetails,
    problemCount,
  } = activeChallenge || {};
  const {
    data: response,
    error,
    isFetching: problemsFetching,
    isLoading,
    refetch: refetchProblems,
  } = useGetActiveChallengeProblemsQuery({
    groupId: groupId,
    userId: selectedUserId,
    page: paginationData.page,
    limit: paginationData.limit,
    categories: paginationData.selectedCategories.join(","),
  });
  const disableTableFunctionality = user._id !== selectedUserId;

  const data = response?.data || {};
  const { totalProblems, totalPages, currentPage, categories, problems } = data;
  console.log(
    "totalProblems, totalPages, currentPage, categories, problems",
    totalProblems,
    totalPages,
    currentPage,
    categories,
    problems
  );
  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="description">Overview</TabsTrigger>
        <TabsTrigger value="problems">Problems</TabsTrigger>
        <TabsTrigger value="recent-activity">Recent Activity</TabsTrigger>
      </TabsList>

      <TabsContent value="description">
        <ChallengeDetails
          activeChallengeId={_id}
          challengeDetails={challengeDetails}
          joinedUsers={joinedUsers}
          problemCount={problemCount}
          endDate={endDate}
          refetchActiveChallengeDetails={refetchActiveChallengeDetails}
        />
      </TabsContent>

      <TabsContent value="problems">
        <SelectCategoryDropdown
          categories={categories}
          paginationData={paginationData}
          setPaginationData={setPaginationData}
        />
        <SelectUserProblemTableDropdown
          joinedUsers={joinedUsers}
          setSelectedUserId={setSelectedUserId}
          selectedUserId={selectedUserId}
          user={user}
        />
        <DataTableDemo
          problems={problems}
          totalProblems={totalProblems}
          currentPage={currentPage}
          categories={categories}
          totalPages={totalPages}
          activeChallengeId={_id}
          refetchProblems={refetchProblems}
          refetchActiveChallengeDetails={refetchActiveChallengeDetails}
          problemsFetching={problemsFetching}
          disableTableFunctionality={disableTableFunctionality}
          paginationData={paginationData}
          setPaginationData={setPaginationData}
        />
      </TabsContent>

      <TabsContent value="recent-activity">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Overview of the latest actions taken on the project.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul>
              <li>User A completed Task 1.</li>
              <li>User B submitted feedback.</li>
              <li>User C joined the project.</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button>View All Activity</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
