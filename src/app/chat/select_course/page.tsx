"use client";

import { Icon } from "@iconify/react";
import Chip from "@/app/components/Chip";
import { useState } from "react";
import Drawer from "../_components/Drawer";
import Link from "next/link";
import StickyHead from "@/app/components/Header";
import SubjectListInfinite from "../_components/SubjectListInfinite";

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
  {
    title: "Beginner React",
    description: "Beginning python programming from scratch",
  },
  {
    title: "Beginner React",
    description: "Beginning python programming from scratch",
  },
  {
    title: "Beginner React",
    description: "Beginning python programming from scratch",
  },
  {
    title: "Beginner React",
    description: "Beginning python programming from scratch",
  },
  {
    title: "Beginner React",
    description: "Beginning python programming from scratch",
  },
  {
    title: "Beginner React",
    description: "Beginning python programming from scratch",
  },
  {
    title: "Beginner React",
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
    <div>
      <StickyHead hasContent={true}>
        <Link href={"/chat/1"}>
          <div className="flex items-center  py-1 rounded-lg gap-x-2">
            <Icon
              icon={"material-symbols:arrow-back-ios-rounded"}
              className="text-md cursor-pointer text-2xl"
            />
            <span className="text-lg">Add a new subject</span>
          </div>
        </Link>
      </StickyHead>

      <div className="flex flex-col gap-y-4 mt-24  ">
        <SubjectListInfinite items={dummyPro} />
      </div>
    </div>
  );
};

export default Chat;
