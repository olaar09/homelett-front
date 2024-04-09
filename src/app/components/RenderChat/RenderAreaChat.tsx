import { Icon } from "@iconify/react/dist/iconify.js";
import { Card, Select, Button, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
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
const AreaChart: React.FC<{ title: string; data: any[] }> = ({
  title,
  data,
}) => {
  const [x, setX] = useState<any>();
  const [y, setY] = useState<any>();
  const [yData, setYData] = useState<any>();
  const [xData, setXData] = useState<any>();

  let columns: any[] = [];
  if (data.length > 0) {
    columns = Object.keys(data[0]);
  }

  /*   useEffect(() => {
    setX("created_at");
    setY("amount");
  }, []); */

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
        data: yData ?? [],
      },
    ],
    options: {
      chart: {
        type: "area",
        height: 350,
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
        text: x,
        align: "left",
      },
      labels: xData ?? [],
      xaxis: {
        type: "category",
      },
      yaxis: {
        opposite: true,
      },
      legend: {
        horizontalAlign: "left",
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
          title="Area chart"
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
        <div id="chart">
          <ReactApexChart
            options={state.options}
            series={state.series}
            type="area"
            height={350}
          />
        </div>
      )}
    </>
  );
};

export default AreaChart;
