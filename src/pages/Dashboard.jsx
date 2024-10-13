import React, { useEffect, useState } from "react";
import axios from "axios";
import ApexLineChart from "@/components/ApexLineChart";
import { RecentActivityTable } from "@/components/RecentActivityTable";
import StreakComparison from "@/components/StreakComparison";
import LeaderboardCard from "@/components/LeaderCard";
import { ModeToggle } from "@/components/mode-toggle";

const Dashboard = () => {
  const [rankingChartData, setRankingChartData] = useState([]);
  const [submission24h, setSubmission24h] = useState([]);
  const [userSolvedData, setUserSolvedData] = useState([]);
  const [streakData, setStreakData] = useState([]);
  const [recentTableData, setRecentTableData] = useState([]);
  const usernames = [
    "rahulb_001",
    "mayur92828",
    "prem__",
    "tejas702",
    "Yawn_Sean",
    "ya695678",
    "dnialh",
  ];

  const processData = (usersData) => {
    const rankingChartData = usersData.map((userObject) => ({
      name: userObject?.profile?.realName || userObject?.username,
      data: userObject.userContestRankingHistory,
    }));

    setRankingChartData(rankingChartData);
  };

  const fetchAndStoreUserData = async () => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/app/get-users-data`,
        {
          usernames,
        }
      );
      const {
        usersData,
        recentActivity,
        streakData: resStreakData,
        last24HoursSubmissions,
        solvedProblemData,
      } = response.data;
      setStreakData(resStreakData);
      localStorage.setItem("data", JSON.stringify(response.data));
      processData(usersData);
      setRecentTableData(recentActivity);
      setSubmission24h(last24HoursSubmissions);
      setUserSolvedData(solvedProblemData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const getDataFromLocalStorage = () => {
    const storedData = localStorage.getItem("data");
    if (storedData) {
      const {
        usersData,
        recentActivity,
        streakData: resStreakData,
        last24HoursSubmissions,
        solvedProblemData,
      } = JSON.parse(storedData);
      processData(usersData);
      setStreakData(resStreakData);
      setRecentTableData(recentActivity);
      setSubmission24h(last24HoursSubmissions);
      setUserSolvedData(solvedProblemData);
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (!getDataFromLocalStorage()) {
      fetchAndStoreUserData();
    }
  }, []);

  return (
    <div style={{ width: "80vw" }}>
      <ModeToggle />
      <ApexLineChart chartData={rankingChartData} />
      <StreakComparison streakData={streakData} />
      <LeaderboardCard
        submissions={submission24h}
        title={"Last 24H Submissions"}
      />
      <LeaderboardCard submissions={userSolvedData} title={"Problem Solved"} />
      <RecentActivityTable recentTableData={recentTableData} />
    </div>
  );
};

export default Dashboard;
