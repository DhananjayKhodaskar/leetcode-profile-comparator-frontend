import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  calculateStreaks,
  getLast24hSubmission,
  getRecentSubmission,
} from "@/utils/getSubmissionData";
import StreakCalender from "@/components/StreakCalender";
import { v4 as uuidv4 } from "uuid";
import Ranking from "@/components/Ranking";
import ApexLineChart from "@/components/ApexLineChart";
import { transformData } from "@/utils/formatChartData";
import { RecentActivityTable } from "@/components/RecentActivityTable";
import StreakComparison from "@/components/StreakComparison";

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
      } = response.data;
      setStreakData(resStreakData);
      localStorage.setItem("data", JSON.stringify(response.data));
      processData(usersData);
      setRecentTableData(recentActivity);
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
      } = JSON.parse(storedData);
      processData(usersData);
      setStreakData(resStreakData);
      setRecentTableData(recentActivity);
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (!getDataFromLocalStorage()) {
      fetchAndStoreUserData();
    }
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const results = await Promise.all(
  //         leetcodeUsernames.map(async (username) => {
  //           const response = await axios.get(
  //             `http://localhost:3000/${username}/solved`
  //           );
  //           return { ...response.data, username: username };
  //         })
  //       );
  //       setUserSolvedData(results);
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const results = await Promise.all(
  //         leetcodeUsernames.map(async (username) => {
  //           const response = await axios.get(
  //             `http://localhost:3000/${username}/calendar`
  //           );
  //           const streakData = calculateStreaks(response.data);
  //           return { ...streakData, username: username };
  //         })
  //       );
  //       setStreakData(results);
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div style={{ width: "80vw" }}>
      <ApexLineChart chartData={rankingChartData} />
      <StreakComparison streakData={streakData} />
      <RecentActivityTable recentTableData={recentTableData} />
      {/* <div className="flex flex-row  gap-2 justify-around">
        <Ranking rankingData={submission24h} title="Top Solvers - Last 24H" />
        <Ranking
          rankingData={userSolvedData.map((data) => {
            return {
              username: data.username,
              score: data.solvedProblem,
              key: uuidv4(),
            };
          })}
          colorArray={[
            "bg-cyan-200", // Rank 1
            "bg-cyan-300", // Rank 2
            "bg-cyan-400", // Rank 3
            "bg-cyan-500", // Rank 4
            "bg-cyan-600",
          ]}
          title="Total Problems Solved"
        />
      </div> */}
      {/* <StreakCalender streakData={streakData} /> */}
    </div>
  );
};

export default Dashboard;
