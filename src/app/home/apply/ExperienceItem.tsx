"use client";
import { Icon } from "@iconify/react";

export const ExperienceItem = ({
  title,
  duration,
  content,
  companyName,
}: {
  title: string;
  duration: string;
  content: any;
  companyName: any;
}) => {
  console.log(content[0]);

  const summary = content[0]?.ex_summary;
  const highlights = content[0]?.highlights;

  return (
    <div className="">
      <div className="my-6  text-gray-700 flex flex-col gap-y-4">
        <div className="flex flex-col items-start">
          <span className="font-bold">
            {companyName} - {title}
          </span>
          <span className="text-sm text-gray-400">
            {"Feb 2021 - June 2024"}
          </span>
        </div>

        <span className="text-gray-600 text-sm whitespace-pre-wrap block">
          {summary}
        </span>

        <ul className=" flex flex-col gap-y-2 list-disc">
          {(highlights ?? []).map((highlight: any) => {
            const text = Object.values(highlight)[1];

            return (
              <li className="flex items-start gap-x-2">
                <span className="rounded-full h-2 w-2 border-2 border-dashed  bg-gray-600 mt-[5px]">
                  {" "}
                </span>
                <span className=" text-sm whitespace-pre-wrap block ">
                  {text}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
