import React from "react";
import { Avatar, Card } from "antd";
import { Icon } from "@iconify/react";

const { Meta } = Card;

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
  return (
    <div className="flex flex-col gap-y-3 my-4">
      <div className="flex items-center gap-x-2">
        <Icon icon={avatar} className="bg-transparent text-3xl text-gray-600" />
        <span className="text-foreground font-bold">{senderName}</span>
      </div>

      <span className=" text-[0.85rem]">{content}</span>
    </div>
  );
};

export default RenderAnswer;
