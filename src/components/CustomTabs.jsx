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
import { RecentActivityTable } from "./RecentActivityTable";
import ChallengeProblemTable from "./ChallengeProblemTable";

export function CustomTabs({ activeChallenge, refetchActiveChallengeDetails }) {
  const { user } = useSelector((state) => state.user.user);

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
        <ChallengeProblemTable
          joinedUsers={joinedUsers}
          activeChallengeId={_id}
          forHistory={false}
          refetchActiveChallengeDetails={refetchActiveChallengeDetails}
        />
      </TabsContent>

      <TabsContent value="recent-activity">
        <RecentActivityTable activeChallengeId={_id} />
      </TabsContent>
    </Tabs>
  );
}
