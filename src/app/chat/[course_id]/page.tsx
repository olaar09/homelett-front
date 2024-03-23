"use client";

import { Icon } from "@iconify/react";
import Chip from "@/app/components/Chip";
import SubjectList from "../_components/SubjectItem";
import HomeChatInput from "../_components/ChatInput";
import { useState } from "react";
import Drawer from "../_components/Drawer";
import Link from "next/link";
import StickyHead from "@/app/components/Header";

const Chat = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [hasChat, setHasChat] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("CSS 101");

  return (
    <section
      className={`flex items-center  h-screen flex-col relative ${
        hasChat ? "justify-start" : "justify-center"
      }`}
    >
      <Drawer isOpen={openDrawer} setIsOpen={setOpenDrawer} />

      <StickyHead hasContent={hasChat}>
        <div className="flex justify-between items-center">
          <div className="flex gap-x-4 items-center ">
            <div
              onClick={() => setOpenDrawer(true)}
              className="flex items-center h-full w-8"
            >
              <Icon
                icon={"material-symbols:menu"}
                className="text-3xl cursor-pointer"
              />
            </div>

            <div
              onClick={() => setOpenDrawer(true)}
              className="flex items-center gap-x-2  px-1 py-1 w-32 h-10"
            >
              <span className="font-bold">{selectedSubject}</span>
              <Icon
                icon={"ri:arrow-drop-down-line"}
                className="text-3xl cursor-pointer "
              />
            </div>
          </div>

          <Link href={"/chat/select_course"}>
            <div className="flex items-center bg-panel px-3 py-1 rounded-lg gap-x-2">
              <Icon
                icon={"octicon:apps-16"}
                className="text-md cursor-pointer"
              />
              <span className="text-sm">New subject</span>
            </div>
          </Link>
        </div>
      </StickyHead>

      <div className="flex items-center gap-x-3 ">
        <div className="w-14 h-14">
          <Icon className="text-foreground text-6xl" icon="simple-icons:poe" />
        </div>
        <span className=" text-foreground font-bold text-4xl">ASK</span>
      </div>

      <div className="fixed bottom-5  left-0 right-0 px-4">
        <div className="flex flex-row  items-center justify-evenly gap-x-2 mt-4 ">
          <div className="shrink-0">
            <Chip
              title="Write"
              icon="streamline:ai-edit-spark-solid"
              isSelected={true}
              toggleSelect={() => console.log("kmk")}
            />
          </div>
          <div className="shrink-0">
            <Chip
              title="Upload"
              icon="ri:attachment-fill"
              isSelected={false}
              toggleSelect={() => console.log("kmk")}
            />
          </div>
          <div className="shrink-0">
            <Chip
              title="Voice"
              icon="icon-park-solid:voice-one"
              isSelected={false}
              toggleSelect={() => console.log("kmk")}
            />
          </div>
        </div>

        <div className="text-black w-full  pt-7">
          <HomeChatInput onChange={() => console.log("")} />
        </div>
      </div>
    </section>
  );
};

export default Chat;
