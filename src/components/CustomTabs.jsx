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

export function CustomTabs({ activeChallenge, refetchActiveChallengeDetails }) {
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
  });

  console.log("problems fetching", problemsFetching);

  const problems = response?.data || [];
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
        <DataTableDemo
          data={problems}
          activeChallengeId={_id}
          refetchProblems={refetchProblems}
          refetchActiveChallengeDetails={refetchActiveChallengeDetails}
          problemsFetching={problemsFetching}
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
