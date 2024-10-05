import React, { useEffect, useState } from "react";
import axios from "axios";
import { transformData } from "../utils/formatChartData";
import ApexChart from "../components/ApexChart";
import {
  calculateStreaks,
  getLast24hSubmission,
} from "@/utils/getSubmissionData";
import Ranking from "@/components/Ranking";

const Dashboard = () => {
  const [userData, setUserData] = useState([]);
  const [submission24h, setSubmission24h] = useState([]);
  const [userSolvedData, setUserSolvedData] = useState([]);
  const leetcodeUsernames = [
    "rahulb_001",
    "mayur92828",
    "prem__",
    "tejas702",
    "Yawn_Sean",
    "ya695678",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await Promise.all(
          leetcodeUsernames.map(async (username) => {
            const response = await axios.get(
              `http://localhost:3000/${username}/contest`
            );
            return response.data;
          })
        );
        console.log("results:", results);
        setUserData(
          transformData({ contests: results, usernames: leetcodeUsernames })
        ); // Store the fetched data in state
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Loop through the usernames and fetch data for each
        const results = await Promise.all(
          leetcodeUsernames.map(async (username) => {
            const response = await axios.get(
              `http://localhost:3000/${username}/acSubmission`
            );
            return getLast24hSubmission({ ...response.data, username });
          })
        );
        const tranformedData = results
          .map((user) => {
            return {
              score: user.submissions.length,
              username: user.username,
              key: Math.random(),
            };
          })
          .sort((a, b) => b.score - a.score);
        setSubmission24h(tranformedData);

        console.log("results::>>>>", results);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Loop through the usernames and fetch data for each
        const results = await Promise.all(
          leetcodeUsernames.map(async (username) => {
            const response = await axios.get(
              `http://localhost:3000/${username}/solved`
            );
            return { ...response.data, username: username };
          })
        );
        setUserSolvedData(results);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Loop through the usernames and fetch data for each
        const results = await Promise.all(
          leetcodeUsernames.map(async (username) => {
            const response = await axios.get(
              `http://localhost:3000/${username}/calendar`
            );
            const streakData = calculateStreaks(response.data);
            return { ...streakData, username: username };
          })
        );
        // const streakData = calculateStreaks(results)
        console.log("thi is the result", results);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ width: "80vw" }}>
      <div className="flex flex-row gap-2 justify-around">
        <Ranking rankingData={submission24h} title="Top Solvers - Last 24H" />
        <Ranking
          rankingData={userSolvedData.map((data) => {
            return {
              username: data.username,
              score: data.solvedProblem,
              key: Math.random(),
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
      </div>
      <ApexChart chartData={userData} />
    </div>
  );
};

export default Dashboard;
