import React from "react";
import Chart from "react-apexcharts";

const PercentageChart: React.FC = () => {
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "donut",
      fontFamily: "Arial, sans-serif",
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    },
    colors: ["#60a5fa", "#d1d5db"], // Custom colors for the segments
    labels: ["Skill Match", "Skill Gap"], // Custom legend labels
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
      fontSize: "14px",
    },
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "10px",
              offsetY: -10,
            },
            value: {
              show: true,
              fontSize: "22px",
              offsetY: 10,
            },
            total: {
              show: true,
              showAlways: true,
              label: "Skill match",
              fontSize: "11px",
              fontWeight: 600,
              color: "#373d3f",
              formatter: function (w) {
                return ""; // Total label
              },
            },
          },
        },
      },
    },
  };

  const series: any = [90, 10]; // 90% progress, 10% remaining

  return (
    <div id="chart">
      <Chart options={options} series={series} type="donut" width="340" />
    </div>
  );
};

export default PercentageChart;
