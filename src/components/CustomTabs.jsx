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

export function CustomTabs({ activeChallenge }) {
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
    isLoading,
  } = useGetActiveChallengeProblemsQuery({
    groupId: groupId,
  });
  const problems = response?.data || [];
  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="problems">Problems</TabsTrigger>
        <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        <TabsTrigger value="recent-activity">Recent Activity</TabsTrigger>
      </TabsList>

      <TabsContent value="description">
        <ChallengeDetails
          challengeDetails={challengeDetails}
          joinedUsers={joinedUsers}
          problemCount={problemCount}
        />
      </TabsContent>

      <TabsContent value="problems">
        <DataTableDemo data={problems} />
      </TabsContent>

      <TabsContent value="leaderboard">
        <Card>
          <CardHeader>
            <CardTitle>Leaderboard</CardTitle>
            <CardDescription>
              This tab displays the rankings of participants or contributors.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol>
              <li>1. User A - Points: 150</li>
              <li>2. User B - Points: 120</li>
              <li>3. User C - Points: 100</li>
            </ol>
          </CardContent>
          <CardFooter>
            <Button>View More</Button>
          </CardFooter>
        </Card>
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
