"use client";

import { Icon } from "@iconify/react";
import Chip from "@/app/components/Chip";
import SubjectList from "./_components/SubjectItem";
import HomeChatInput from "./_components/ChatInput";
import { useState } from "react";
import Drawer from "./_components/Drawer";

import Head from "next/head";
import Image from "next/image";

const HeadIcon = () => {
  return (
    <div className="flex items-center gap-x-2   pl-4 h-full border-b shadow-sm">
      <div className="w-6 h-14  flex items-center">
        <Icon
          className="text-foreground text-2xl opacity-90 mt-1"
          icon="simple-icons:poe"
        />
      </div>
      <span className=" text-foreground font-bold text-xl">SequelBase</span>
    </div>
  );
};
const ChatLayout: React.FC<any> = ({ children }) => {
  return (
    <div className="min-h-screen w-full">
      <div className="flex items-center w-full h-full">
        <div className=" bg-background w-[260px] min-h-screen border-r border-gray-300 shadow-sm ">
          <HeadIcon />
        </div>

        <div className="flex-grow">{children}</div>
      </div>
    </div>
  );
};

export default ChatLayout;
