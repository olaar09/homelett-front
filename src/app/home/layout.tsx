"use client";

import { Icon } from "@iconify/react";
import Chip from "@/app/components/Chip";
import SubjectList from "./_components/SubjectItem";
import HomeChatInput from "./_components/ChatInput";
import { useState } from "react";
import Drawer from "./_components/Drawer";

import Head from "next/head";
import Image from "next/image";

const dummy = [
  { title: "CSS 101", description: "Electrical theory and assertions" },
];

const dummyPro = [
  {
    title: "Beginner Python",
    description: "Beginning python programming from scratch",
  },
  {
    title: "Beginner Javascript",
    description: "Beginning python programming from scratch",
  },
  {
    title: "Beginner React",
    description: "Beginning python programming from scratch",
  },
];

const ChatLayout: React.FC<any> = ({ children }) => {
  return <div className="min-h-screen">{children}</div>;
};

export default ChatLayout;
