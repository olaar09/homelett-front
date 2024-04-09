import React from "react";
import { Avatar, Button, Card, Table, Tooltip } from "antd";
import { Icon } from "@iconify/react";
import ACButton from "@/app/components/Button";

const viewTypes = [
  { icon: "ic:outline-table-view", name: "Table view" },
  { icon: "bi:pie-chart-fill", name: "Pie chart" },
  { icon: "mingcute:chart-bar-fill", name: "Bar chart" },
  { icon: "fa6-solid:chart-line", name: "Line chart" },
  { icon: "teenyicons:area-chart-outline", name: "Area chart" },
];

const ViewSelector = ({
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
          <Button type="link" onClick={() => onClick(view.name)}>
            <Icon
              className={`${
                selectedView === view.name ? " text-primary" : " text-gray-700"
              }`}
              icon={view.icon}
            />
          </Button>
        </Tooltip>
      ))}
    </div>
  );
};

const Header = ({
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

const TextContentDisplay = ({
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

const TableContentDisplay = ({
  data,
  columns,
  avatar,
  senderName,
}: {
  data: any;
  columns: any;
  senderName: string;
  avatar: string;
}) => {
  const onChangeDisplay = () => {
    alert("Change display");
  };

  return (
    <div className=" relative">
      <div className="absolute -top-7 right-1 flex items-center gap-x-3">
        <ViewSelector onClick={onChangeDisplay} selectedView={null} />
      </div>
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
    </div>
  );
};

interface RenderAnswerProps {
  avatar: string;
  content: string;
  senderName: string;
}

const RenderAnswer: React.FC<RenderAnswerProps> = ({
  avatar,
  content,
  senderName,
}) => {
  try {
    const parse = JSON.parse(content);
    const headers = Object.keys(parse);
    // single table
    if (Array.isArray(parse) && parse.length > 0) {
      const columns = Object.keys(parse[0]).map((x) => {
        return {
          title: x,
          dataIndex: x,
          key: x,
        };
      });
      return (
        <div className=" flex flex-col gap-y-3  hover:bg-gray-100 cursor-pointer px-2 rounded-lg py-2 w-full">
          <Header avatar={avatar} senderName={senderName} />
          <TableContentDisplay
            data={parse}
            columns={columns}
            senderName={senderName}
            avatar={avatar}
          />
        </div>
      );
      // multiple tables
    } else if (headers.length > 0 && Array.isArray(parse[headers[0]])) {
      const ui = [];
      for (const index in headers) {
        if (Array.isArray(parse[headers[index]])) {
          const rows = parse[headers[index]];
          console.log("Keys Hellllo", headers);

          const columns = Object.keys(rows[0]).map((x) => {
            return {
              title: x,
              dataIndex: x,
              key: x,
            };
          });
          ui.push(
            <div key={headers[index]}>
              <span className=" font-bold text-sm block my-3">
                {headers[index]}
              </span>
              <TableContentDisplay
                data={rows}
                columns={columns}
                senderName={senderName}
                avatar={avatar}
              />
            </div>
          );
        }
      }
      return (
        <div className=" flex flex-col gap-y-3  hover:bg-gray-100 cursor-pointer px-2 rounded-lg py-2 w-full">
          <Header avatar={avatar} senderName={senderName} />
          {ui}
        </div>
      );
    } else {
      return (
        <TextContentDisplay
          avatar={avatar}
          senderName={senderName}
          content={content}
        />
      );
    }
  } catch (error) {
    return (
      <TextContentDisplay
        avatar={avatar}
        senderName={senderName}
        content={content}
      />
    );
  }
};

export default RenderAnswer;
