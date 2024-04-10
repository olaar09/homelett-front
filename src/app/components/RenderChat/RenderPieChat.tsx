import { IChatHistoryItem } from "@/app/interfaces/IChatHistoryItem";
import { ChatContext } from "@/contexts/ChatContext";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Card, Select, Button, Tooltip, Checkbox } from "antd";
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
const PieChat: React.FC<{
  chatHistoryItem: IChatHistoryItem;
  title: string;
  data: any[];
  onUpdateConfig: (data: any) => void;
}> = ({ title, data, onUpdateConfig, chatHistoryItem }) => {
  const [x, setX] = useState<any>();
  const [y, setY] = useState<any>(null);
  const [yData, setYData] = useState<any>();
  const [xData, setXData] = useState<any>();
  const chatContext = useContext(ChatContext);

  let columns: any[] = [];
  if (data.length > 0) {
    columns = Object.keys(data[0]);
  }

  useEffect(() => {
    setX(chatHistoryItem.extra?.pie_chart?.x);
    setY(chatHistoryItem.extra?.pie_chart?.y);
  }, []);

  useEffect(() => {
    if (y && x) {
      onUpdateConfig({ pie_chart: { x: x, y: y } });
      chatContext.scrollToBottom!();
    }
  }, [x, y]);

  useEffect(() => {
    if (y) {
      const values = data.map((dt: any) =>
        isNaN(Number(dt[y])) ? 0 : Number(dt[y])
      );
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
    series: yData ?? [], // Example data for Matches, Messages, and Super Likes
    options: {
      chart: {
        type: "pie",
      },
      labels: xData,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
      title: {
        text: "",
        align: "left",
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
        <Card title="Pie chart" className="w-full  p-4 h-full" bordered={false}>
          <div className="flex flex-col items-center justify-center space-y-4 w-4/12 mx-auto">
            <div className="flex items-center gap-x-2 w-full">
              <Tooltip title="Which value is displayed as label and title">
                {" "}
                <Icon
                  icon={"ic:outline-info"}
                  className=" text-gray-600 text-xl"
                />
              </Tooltip>
              <Select
                placeholder="Select Labels"
                className="w-full"
                onChange={(value) => handleDropdownChange(value, "x")}
              >
                {columns.map((col) => (
                  <Option value={col}>{col}</Option>
                ))}
              </Select>
            </div>

            <div className="flex items-center gap-x-2 w-full">
              <Tooltip title="Which value forms the pie, should be number value">
                <Icon
                  icon={"ic:outline-info"}
                  className=" text-gray-600 text-xl"
                />
              </Tooltip>
              <Select
                placeholder="Select Fill data"
                className="w-full"
                onChange={(value) => handleDropdownChange(value, "y")}
              >
                {columns.map((col) => (
                  <Option value={col}>{col}</Option>
                ))}
              </Select>

              {/*     <Checkbox.Group
                options={columns}
                defaultValue={[]}
                onChange={handleCheckBoxChange}
              /> */}
            </div>
          </div>
        </Card>
      )}

      {x && y && (
        <div id="bar_chart">
          <ReactApexChart
            options={state.options}
            series={state.series}
            type="pie"
            height={350}
          />
        </div>
      )}
    </>
  );
};

export default PieChat;
