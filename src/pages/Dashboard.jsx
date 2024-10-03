import React, { useEffect, useState } from "react";
import axios from "axios";
import { transformData } from "../utils/formatChartData";
import ApexChart from "../components/ApexChart";

const Dashboard = () => {
  // State to store the data
  const [userData, setUserData] = useState([]);

  // Array of LeetCode usernames to fetch data for
  const leetcodeUsernames = ["saurabh_kl", "mayur92828"];

  // Fetch user data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Loop through the usernames and fetch data for each
        const results = await Promise.all(
          leetcodeUsernames.map(async (username) => {
            const response = await axios.get(
              `http://localhost:3000/${username}/contest`
            );
            return response.data; // Return the fetched data
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
    console.log("userData", userData);
  }, [userData]);

  return (
    <div style={{ width: "100vw", height: "80vh" }}>
      <ApexChart chartData={userData} />
    </div>
  );
};

export default Dashboard;
