import React, { useState } from "react";
import { Avatar, Button, Card, Table, Tooltip } from "antd";
import { Icon } from "@iconify/react";
import ACButton from "@/app/components/Button";
import { IChatHistoryItem } from "@/app/interfaces/IChatHistoryItem";
import {
  Header,
  ContentDisplay,
  TextContentDisplay,
} from "./RenderAnswerComponents";

interface RenderAnswerProps {
  chatHistoryItem: IChatHistoryItem;
  avatar: string;
  senderName: string;
}

const RenderAnswer: React.FC<RenderAnswerProps> = ({
  chatHistoryItem,
  avatar,
  senderName,
}) => {
  try {
    const parse = JSON.parse(chatHistoryItem.message!);
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
          <ContentDisplay
            data={parse}
            columns={columns}
            senderName={senderName}
            avatar={avatar}
            chatHistoryItem={chatHistoryItem}
          />
        </div>
      );
      // multiple tables
    } else if (headers.length > 0 && Array.isArray(parse[headers[0]])) {
      const ui = [];
      for (const index in headers) {
        if (Array.isArray(parse[headers[index]])) {
          const rows = parse[headers[index]];
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
              <ContentDisplay
                data={rows}
                columns={columns}
                senderName={senderName}
                avatar={avatar}
                chatHistoryItem={chatHistoryItem}
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
          content={chatHistoryItem.message!}
        />
      );
    }
  } catch (error) {
    return (
      <TextContentDisplay
        avatar={avatar}
        senderName={senderName}
        content={chatHistoryItem.message!}
      />
    );
  }
};

export default RenderAnswer;
