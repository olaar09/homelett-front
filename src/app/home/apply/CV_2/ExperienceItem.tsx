"use client";
import { Icon } from "@iconify/react";
import { Button, Tooltip } from "antd";
import { useState } from "react";

export const ExperienceItem = ({
  title,
  duration,
  content,
  list,
  companyName,
}: {
  title: string;
  duration: string;
  content: string;
  list: string;
  companyName: any;
}) => {
  const [isList, setIsList] = useState(false);
  return (
    <div className="">
      <div className="my-6  text-gray-700 flex flex-col gap-y-4">
        <div className="flex flex-col items-start">
          <div className="flex items-center justify-between w-full">
            <span className="font-bold">
              {companyName} - {title}
            </span>

            <Tooltip title={isList ? "Switch to content" : "Switch to list"}>
              <Button onClick={() => setIsList(!isList)} type="link">
                <Icon
                  icon={
                    isList ? "fluent:list-24-filled" : "majesticons:list-box"
                  }
                />
              </Button>
            </Tooltip>
          </div>

          <span className="text-sm text-gray-400">{duration}</span>
        </div>

        <span
          className="text-gray-600 text-sm whitespace-pre-wrap block"
          dangerouslySetInnerHTML={{
            __html: isList ? content : list,
          }}
        />
      </div>
    </div>
  );
};
