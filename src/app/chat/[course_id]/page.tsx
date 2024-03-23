"use client";

import { Icon } from "@iconify/react";
import Chip from "@/app/components/Chip";
import SubjectList from "../_components/SubjectItem";
import HomeChatInput from "../_components/ChatInput";
import { useState } from "react";
import Drawer from "../_components/Drawer";

const Chat = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [hasChat, setHasChat] = useState(false);

  return (
    <section
      className={`flex items-center  h-screen flex-col relative ${
        hasChat ? "justify-start" : "justify-center"
      }`}
    >
      <Drawer isOpen={openDrawer} setIsOpen={setOpenDrawer} />

      <div
        className={`h-14 w-full top-3 bg-background left-0 right-0 px-4 border-b-[0.5px] border-b-foreground-secondary ${
          hasChat ? "sticky" : "fixed "
        }`}
      >
        <div className="flex gap-x-4 items-center ">
          <div
            onClick={() => setOpenDrawer(true)}
            className="flex items-center h-full"
          >
            <Icon
              icon={"material-symbols:menu"}
              className="text-3xl cursor-pointer"
            />
          </div>

          <div
            onClick={() => setOpenDrawer(true)}
            className="flex items-center gap-x-2 bg-panel px-3 py-1 rounded-lg"
          >
            <span className="font-bold">CSS 101</span>
            <Icon
              icon={"ri:arrow-drop-down-line"}
              className="text-3xl cursor-pointer"
            />
          </div>
        </div>
      </div>

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
