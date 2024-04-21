"use client";
import { Icon } from "@iconify/react";

export const ExperienceItem = ({
  title,
  duration,
  content,
}: {
  title: string;
  duration: string;
  content: string;
}) => {
  return (
    <div className="">
      <div className="my-6  text-gray-700 flex flex-col gap-y-4">
        <div className="flex flex-col items-start">
          <span className="font-bold">{title}</span>
          <span className="text-sm text-gray-400">{duration}</span>
        </div>

        <span
          className="text-gray-600 text-sm whitespace-pre-wrap block"
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
      </div>
    </div>
  );
};
