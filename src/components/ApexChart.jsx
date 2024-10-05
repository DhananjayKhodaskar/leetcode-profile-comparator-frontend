import React from "react";
import ReactApexChart from "react-apexcharts";

const ApexChart = ({ chartData }) => {
  const allStartTimes = chartData.flatMap((charData) =>
    charData.data.map((c) => c.contest.startTime)
  );
  const minStartTime = Math.min(...allStartTimes) * 1000;
  const maxStartTime = new Date().getTime();

  const series = chartData.map((charData) => {
    const plottingData = charData.data.map((c) => {
      const timestamp = new Date(c.contest.startTime * 1000);
      return {
        x: timestamp,
        y: c.rating,
      };
    });

    const firstDataPoint = plottingData[0];
    const lastDataPoint = plottingData[plottingData.length - 1];

    if (firstDataPoint && firstDataPoint.x.getTime() > minStartTime) {
      plottingData.unshift({
        x: new Date(minStartTime),
        y: 0,
      });
    }

    if (lastDataPoint && lastDataPoint.x.getTime() < maxStartTime) {
      plottingData.push({
        x: new Date(maxStartTime),
        y: lastDataPoint.y,
      });
    }

    return {
      data: plottingData,
      name: charData.name,
      extend_to_end: true,
    };
  });

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
      curve: "smooth",
    },
    title: {
      text: "Ranking and Rating Data",
      align: "left",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
    xaxis: {
      type: "datetime",
      min: minStartTime,
      max: maxStartTime,
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
