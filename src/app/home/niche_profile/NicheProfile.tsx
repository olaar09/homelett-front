"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Drawer } from "antd";
import { useState } from "react";
import BioInfo from "./Components/BioInfo";
import AcademicInfo from "./Components/Academics";
import Skills from "./Components/Skills";
import Experiences from "./Components/Experience";

const requiredDetails = [
  {
    isCompleted: false,
    key: "basic",
    title: "Bio information",
    description:
      "Basic information about you, including first name, last name and phone number",
  },
  {
    isCompleted: false,
    key: "academics",
    title: "Academic information",
    description:
      "Information about your history. Also include any certificate or diploma from a traditional institution",
  },
  {
    isCompleted: false,
    key: "skills",
    title: "Primary skills",
    description:
      "List all your primary skills that makes you valuable in the roles your looking for",
  },
  {
    isCompleted: false,
    key: "work",
    title: "Work experience",
    description:
      "Information about your work history. Also include any internship, freelancing or contract roles",
  },
  {
    isCompleted: false,
    key: "socials",
    title: "Social links",
    description:
      "Information about your social media presence such as linkedin, Github, etc",
  },
  {
    isCompleted: false,
    key: "awards",
    title: "Accomplishments",
    description:
      "Such as awards, ground breaking accomplishments and recognitions",
  },
  {
    isCompleted: false,
    key: "settings",
    title: "Settings",
    description: "Add settings such as agent mode",
  },
];
const NicheProfileDrawer = ({
  open,
  onClose,
}: {
  onClose: any;
  open: boolean;
}) => {
  const [selected, setSelected] = useState<any>(requiredDetails[0]);
  const [data, setData] = useState<any>({});

  const onSelect = (info: any) => {
    setSelected(info);
  };

  const onContinue = (key: string, data: Object) => {
    setData({ ...data, [key]: data });
    onSelectNext(key);
  };

  const onSelectNext = (current: string) => {
    switch (current) {
      case "basic":
        setSelected(requiredDetails[1]);
        break;
      case "academics":
        setSelected(requiredDetails[2]);
        break;
      case "skills":
        setSelected(requiredDetails[3]);
        break;
      case "work":
        setSelected(requiredDetails[4]);
        break;
      case "socials":
        setSelected(requiredDetails[5]);
        break;
      case "awards":
        setSelected(requiredDetails[6]);
        break;
      case "settings":
        onSubmitForm();
        break;
    }
  };

  const onSubmitForm = () => {
    console.log(requiredDetails);
  };

  return (
    <Drawer
      width={
        typeof window !== "undefined"
          ? window.screen.width - window.screen.width / 4.5
          : 0
      }
      title="Manage profile"
      onClose={onClose}
      className="px-0 py-0"
      style={{ padding: 0 }}
      open={open}
    >
      <div className="w-full flex items-center h-full  px-0 overflow-hidden">
        <div className="lg:w-[400px] w-full border-r h-full border-gray-200  overflow-y-scroll  ">
          {requiredDetails.map((info) => (
            <div
              className={`flex flex-col gap-y-2 h-32 hover:bg-gray-50 ${
                selected?.key === info.key ? "bg-gray-100" : ""
              } cursor-pointer px-4 py-4`}
            >
              <div className="flex justify-between w-full items-center pr-4">
                <span className="text-md font-black">{info.title}</span>
                {/*   <Icon
                  icon={"lets-icons:check-fill"}
                  className="text-xl text-green-700"
                /> */}
              </div>

              <span className="text-sm text-gray-500">{info.description}</span>
            </div>
          ))}
        </div>

        <div className=" lg:flex-grow lg:flex flex-col h-full   px-4 py-3 overflow-y-scroll">
          {selected?.key === "basic" && (
            <BioInfo onContinue={(data: any) => onContinue("basic", data)} />
          )}

          {selected?.key === "academics" && (
            <AcademicInfo
              onContinue={(data: any) => onContinue("academics", data)}
            />
          )}

          {selected?.key === "skills" && (
            <Skills onContinue={(data: any) => onContinue("skills", data)} />
          )}

          {selected?.key === "work" && (
            <Experiences
              onContinue={(data: any) => onContinue("social", data)}
            />
          )}
        </div>
      </div>
    </Drawer>
  );
};

export default NicheProfileDrawer;
