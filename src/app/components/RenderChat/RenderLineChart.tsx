import { ChatContext } from "@/contexts/ChatContext";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Card, Select, Button, Tooltip } from "antd";
import React, { useContext, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
const { Option } = Select;

/* const data = [
  { price: 31, date: "2023-01" },
  { price: 40, date: "2023-02" },
  { price: 70, date: "2023-03" },
  { price: 32, date: "2023-04" },
  { price: 67, date: "2023-05" },
  { price: 31, date: "2023-06" },
  { price: 70, date: "2023-07" },
  { price: 53, date: "2023-08" },
  { price: 60, date: "2023-09" },
];
 */
const LineChart: React.FC<{
  title: string;
  data: any[];
  onUpdateConfig: (data: any) => void;
}> = ({ title, data, onUpdateConfig }) => {
  const [x, setX] = useState<any>();
  const [y, setY] = useState<any>();
  const [yData, setYData] = useState<any>();
  const [xData, setXData] = useState<any>();
  const chatContext = useContext(ChatContext);

  let columns: any[] = [];
  if (data.length > 0) {
    columns = Object.keys(data[0]);
  }

  useEffect(() => {
    if (y && x) {
      onUpdateConfig({ line_chart: { x: x, y: y } });
      chatContext.scrollToBottom!();
    }
  }, [x, y]);

  useEffect(() => {
    if (y) {
      const values = data.map((dt: any) => dt[y]);
      setYData(values);
    }
  }, [y]);

  useEffect(() => {
    if (x) {
      const values = data.map((dt: any) => dt[x]);
      setXData(values);
    }
  }, [x]);

  const state = {
    series: [
      {
        name: y,
        data: yData,
      },
    ],
    options: {
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
        curve: "straight",
      },
      title: {
        text: x,
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: xData,
      },
    },
  };

  const handleDropdownChange = (value: any, dropdown: any) => {
    if (dropdown === "x") {
      setX(value);
    } else {
      setY(value);
    }
  };

  return (
    <>
      {(!x || !y) && (
        <Card
          title="Line chart"
          className="w-full  p-4 h-full"
          bordered={false}
        >
          <div className="flex flex-col items-center justify-center space-y-4 w-4/12 mx-auto">
            <div className="flex items-center gap-x-2 w-full">
              <Tooltip title="Which value is displayed on the left side to show description or timeline">
                {" "}
                <Icon
                  icon={"ic:outline-info"}
                  className=" text-gray-600 text-xl"
                />
              </Tooltip>
              <Select
                placeholder="Select X axis"
                className="w-full"
                onChange={(value) => handleDropdownChange(value, "x")}
              >
                {columns.map((col) => (
                  <Option value={col}>{col}</Option>
                ))}
              </Select>
            </div>

            <div className="flex items-center gap-x-2 w-full">
              <Tooltip title="Which value is displayed on the right side to show growth">
                <Icon
                  icon={"ic:outline-info"}
                  className=" text-gray-600 text-xl"
                />
              </Tooltip>
              <Select
                placeholder="Select Y axis"
                className="w-full"
                onChange={(value) => handleDropdownChange(value, "y")}
              >
                {columns.map((col) => (
                  <Option value={col}>{col}</Option>
                ))}
              </Select>
            </div>
          </div>
        </Card>
      )}

      {x && y && (
        <div id="line_chart">
          <ReactApexChart
            options={state.options}
            series={state.series}
            type="line"
            height={350}
          />
        </div>
      )}
    </>
  );
};

export default LineChart;
