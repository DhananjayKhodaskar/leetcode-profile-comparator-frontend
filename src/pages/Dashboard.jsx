import React, { useEffect, useState } from "react";
import axios from "axios";
import StreakCalender from "@/components/StreakCalender";
import { v4 as uuidv4 } from "uuid";
import Ranking from "@/components/Ranking";
import ApexLineChart from "@/components/ApexLineChart";
import { transformData } from "@/utils/formatChartData";
import { RecentActivityTable } from "@/components/RecentActivityTable";
import StreakComparison from "@/components/StreakComparison";
import LeaderboardCard from "@/components/LeaderCard";

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
      } = response.data;
      setStreakData(resStreakData);
      localStorage.setItem("data", JSON.stringify(response.data));
      processData(usersData);
      setRecentTableData(recentActivity);
      setSubmission24h(last24HoursSubmissions);
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
      } = JSON.parse(storedData);
      processData(usersData);
      setStreakData(resStreakData);
      setRecentTableData(recentActivity);
      setSubmission24h(last24HoursSubmissions);
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
      <ApexLineChart chartData={rankingChartData} />
      <StreakComparison streakData={streakData} />
      <LeaderboardCard
        submissions={submission24h}
        title={"Last 24H Submissions"}
      />
      <RecentActivityTable recentTableData={recentTableData} />
    </div>
  );
};

export default Dashboard;
