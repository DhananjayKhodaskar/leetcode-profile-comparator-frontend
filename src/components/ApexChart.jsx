import React from "react";
import ReactApexChart from "react-apexcharts";

const ApexChart = ({ chartData }) => {
  // Find the min and max startTimes across all data sets
  const allStartTimes = chartData.flatMap((charData) =>
    charData.data.map((c) => c.contest.startTime)
  );
  const minStartTime = Math.min(...allStartTimes) * 1000; // Convert to milliseconds
  const maxStartTime = new Date().getTime(); // Current time as max

  const series = chartData.map((charData) => {
    // Create the plotting data for each series
    const plottingData = charData.data.map((c) => {
      const timestamp = new Date(c.contest.startTime * 1000); // Convert to milliseconds
      return {
        x: timestamp, // Use timestamp for x-axis
        y: c.rating,
      };
    });

    // Find the first and last data points for the current series
    const firstDataPoint = plottingData[0];
    const lastDataPoint = plottingData[plottingData.length - 1];

    // Extend the line to the past by adding a zero-value point at minStartTime
    if (firstDataPoint && firstDataPoint.x.getTime() > minStartTime) {
      plottingData.unshift({
        x: new Date(minStartTime), // Earliest start time
        y: 0, // Set rating to 0
      });
    }

    // Extend the line to the future by adding a point with the same last rating at maxStartTime
    if (lastDataPoint && lastDataPoint.x.getTime() < maxStartTime) {
      plottingData.push({
        x: new Date(maxStartTime), // Latest time to extend
        y: lastDataPoint.y, // Keep the same rating value
      });
    }

    return {
      data: plottingData,
      name: charData.name,
      extend_to_end: true,
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
      curve: "smooth", // Smoother line for better visualization
    },
    title: {
      text: "Ranking and Rating Data",
      align: "left",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // Alternating row colors
        opacity: 0.5,
      },
    },
    xaxis: {
      type: "datetime",
      min: minStartTime, // Setting the min range for x-axis
      max: maxStartTime, // Setting the max range for x-axis
    },
  };

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={options} series={series} type="line" />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ApexChart;
