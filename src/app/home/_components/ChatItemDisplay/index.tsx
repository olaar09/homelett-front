import React from "react";
import { Table, message } from "antd";
import { IChatHistoryItem } from "@/app/interfaces/IChatHistoryItem";
import RenderQuestion from "./RenderQuestion";
import RenderAnswer from "./RenderAnswer";
import { IDataSourceItem } from "@/app/interfaces/IDatasourceItem";

interface RenderTableAnswerProps {
  data: IChatHistoryItem;
  datasource: IDataSourceItem;
}

const RenderChatItem: React.FC<RenderTableAnswerProps> = ({
  data,
  datasource,
}) => {
  switch (data.type) {
    case "question":
      return (
        <RenderQuestion avatar={""} content={data.message!} senderName={""} />
      );
    case "answer":
      return (
        <RenderAnswer
          chatHistoryItem={data}
          avatar={datasource.source_type.icon}
          senderName={datasource.name!}
        />
      );
    default:
      return <></>;
  }
};

export default RenderChatItem;
