import React from "react";
import { Avatar, Card } from "antd";
import { Icon } from "@iconify/react";

const { Meta } = Card;

interface RenderQuestionProps {
  avatar: string;
  content: string;
  senderName: string;
}

const RenderQuestion: React.FC<RenderQuestionProps> = ({
  avatar,
  content,
  senderName,
}) => {
  return (
    <div className="flex flex-col gap-y-3 w-full hover:bg-gray-100 cursor-pointer px-2 rounded-lg py-2">
      <div className="flex items-center gap-x-2">
        <Icon
          icon="bx:cool"
          className="bg-transparent text-3xl text-gray-600"
        />
        <span className="text-foreground font-bold">You</span>
      </div>

      <span className=" text-[0.85rem]">{content}</span>
    </div>
  );
};

export default RenderQuestion;
