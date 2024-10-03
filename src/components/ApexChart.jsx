import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const ApexChart = ({ chartData }) => {
  const series = chartData.map((charData) => {
    const plottingData = charData.data.map((c) => {
      // Extract timestamp from startTime
      const timestamp = new Date(c.contest.startTime * 1000); // Convert to milliseconds

      return {
        x: timestamp, // Use timestamp for x-axis
        y: c.rating,
      };
    });
    return {
      data: plottingData,
      name: charData.name,
    };
  });

  console.log("series>>>>>>>", series);
  console.log("chartData--->", chartData);
  // Define chart options
  const options = {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth", // Changed to smooth for better visualization
    },
    title: {
      text: "Ranking and Rating Data",
      align: "left",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      type: "datetime",
    },
  };

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          //   height={350}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ApexChart;
