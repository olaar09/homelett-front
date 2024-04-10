import React, { useContext, useState } from "react";
import { Button, Card, Table, Tooltip } from "antd";
import { Icon } from "@iconify/react";
import { IChatHistoryItem } from "@/app/interfaces/IChatHistoryItem";
import AreaChart from "@/app/components/RenderChat/RenderAreaChat";
import LineChart from "@/app/components/RenderChat/RenderLineChart";
import BarChart from "@/app/components/RenderChat/RenderBarChat";
import PieChat from "@/app/components/RenderChat/RenderPieChat";
import { ChatContext } from "@/contexts/ChatContext";

const viewTypes = [
  { icon: "ic:outline-table-view", key: "table", name: "Table view" },
  { icon: "bi:pie-chart-fill", key: "pie", name: "Pie chart" },
  { icon: "mingcute:chart-bar-fill", key: "bar", name: "Bar chart" },
  { icon: "fa6-solid:chart-line", key: "line", name: "Line chart" },
  { icon: "fa6-solid:chart-area", key: "area", name: "Area chart" },
];

export const TextContentDisplay = ({
  avatar,
  senderName,
  content,
}: {
  avatar: string;
  senderName: string;
  content: string;
}) => {
  return (
    <div className="flex flex-col gap-y-3 my-4 hover:bg-gray-100 cursor-pointer px-2 rounded-lg py-2 w-full">
      <Header avatar={avatar} senderName={senderName} />
      <span className=" text-[0.85rem]">{content}</span>
    </div>
  );
};

export const ViewSelector = ({
  onClick,
  selectedView,
}: {
  onClick: (name: string) => void;
  selectedView: string | null;
}) => {
  return (
    <div className="absolute  right-1 flex items-center gap-x-3">
      {viewTypes.map((view) => (
        <Tooltip title={view.name}>
          <Button className="w-2" type="link" onClick={() => onClick(view.key)}>
            <Icon
              className={`${
                selectedView === view.key ? " text-primary" : " text-gray-700"
              }`}
              icon={view.icon}
            />
          </Button>
        </Tooltip>
      ))}
    </div>
  );
};

export const Header = ({
  avatar,
  senderName,
}: {
  avatar: string;
  senderName: string;
}) => {
  return (
    <div className="flex items-center gap-x-2">
      <Icon icon={avatar} className="bg-transparent text-3xl text-gray-600" />
      <span className="text-foreground font-bold">{senderName}</span>
    </div>
  );
};

export const ContentDisplay = ({
  chatHistoryItem,
  data,
  columns,
  avatar,
  senderName,
}: {
  chatHistoryItem: IChatHistoryItem;
  data: any;
  columns: any;
  senderName: string;
  avatar: string;
}) => {
  const [viewKey, setViewKey] = useState("table");
  const chatContext = useContext(ChatContext);

  const onChangeDisplay = (selected: string) => {
    setViewKey(selected);
    chatContext.scrollToBottom!();
  };

  return (
    <div className=" relative ">
      <div className="absolute -top-7 right-1 flex items-center gap-x-3 z-30">
        <ViewSelector onClick={onChangeDisplay} selectedView={viewKey} />
      </div>

      <div>
        {viewKey === "table" && (
          <Table
            dataSource={data}
            columns={columns}
            rowKey="id"
            pagination={false}
            bordered
            size="small"
            // scroll={{ x: columns.length > 5 ? 3300 : undefined }}
            rowClassName={() => "text-xs p-0 m-0 "}
          />
        )}

        {viewKey === "area" && <AreaChart data={data} title="" />}
        {viewKey === "pie" && <PieChat data={data} title="" />}
        {viewKey === "bar" && <BarChart data={data} title="" />}
        {viewKey === "line" && <LineChart data={data} title="" />}
      </div>
    </div>
  );
};
