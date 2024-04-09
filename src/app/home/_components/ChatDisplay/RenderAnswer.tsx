import React from "react";
import { Avatar, Card, Table } from "antd";
import { Icon } from "@iconify/react";

const { Meta } = Card;

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
      <div className="flex items-center gap-x-2">
        <Icon icon={avatar} className="bg-transparent text-3xl text-gray-600" />
        <span className="text-foreground font-bold">{senderName}</span>
      </div>

      <span className=" text-[0.85rem]">{content}</span>
    </div>
  );
};

const TableContentDisplay = ({
  data,
  columns,
}: {
  data: any;
  columns: any;
}) => {
  return (
    <div className=" w-full">
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
  let parsable;

  try {
    const parse = JSON.parse(content);
    const headers = Object.keys(parse);
    // single table
    if (Array.isArray(parse) && parse.length > 0) {
      console.log(Object.keys(parse[0]), parse);
      const columns = Object.keys(parse[0]).map((x) => {
        return {
          title: x,
          dataIndex: x,
          key: x,
        };
      });
      return <TableContentDisplay data={parse} columns={columns} />;
    } else if (headers.length > 0 && Array.isArray(parse[headers[0]])) {
      return <div>Multiple tables</div>;
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
