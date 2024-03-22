"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import HomeChatInput from "./components/chatInput";
import { ChangeEvent } from "react";
import Chip from "../components/Chip";
import SubjectList from "./components/SubjectItem";

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
  return (
    <>
      <section className="flex items-center  h-full flex-col justify-end  pt-24 ">
        <div className="flex items-center gap-x-3">
          <div className="w-14 h-14">
            <Icon
              className="text-foreground text-6xl"
              icon="simple-icons:poe"
            />
          </div>
          <span className=" text-foreground font-bold text-4xl">ASK</span>
        </div>

        <div className="flex flex-row flex-nowrap  overflow-x-scroll w-full px-6 py-1 space-x-2 mt-10">
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

        <div className="text-black w-full px-6">
          <HomeChatInput onChange={() => console.log("")} />
        </div>
      </section>

      <div className="flex flex-col gap-y-4 mt-24 ">
        <SubjectList items={dummy} sectionTitle={"Subjects "} />
        <SubjectList items={dummyPro} sectionTitle={"Professional "} />
      </div>
    </>
  );
};

export default Chat;
