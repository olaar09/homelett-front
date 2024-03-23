"use client";

import { Icon } from "@iconify/react";
import Chip from "@/app/components/Chip";
import SubjectList from "../_components/SubjectItem";
import HomeChatInput from "../_components/ChatInput";
import { useState } from "react";
import Drawer from "../_components/Drawer";

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

const Chat = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-y-4 mt-24 px-6 ">
        <SubjectList items={dummy} sectionTitle={"Subjects "} />
        <SubjectList items={dummyPro} sectionTitle={"Professional "} />
        <SubjectList items={dummyPro} sectionTitle={"Featured "} />
      </div>
    </>
  );
};

export default Chat;
