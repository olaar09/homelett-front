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
          <span className="font-bold">
            Software developer/DevOps Consultant (Contract)
          </span>
          <span className="text-sm text-gray-400">January 2023 - Present</span>
        </div>

        <span className="text-gray-600 text-sm">
          TravCollege provides a smooth experience to Africans applying to
          colleges abroad through thier online platform. Helping students from
          70 plus high schools apply/montitor college applications directly to
          900 + universities around Europe, Aisa and North America. I joined a
          team of 4 developers to help oversee the platfrom move from current
          monolith application to an API based architecture running on modern
          cloud infrastructures. The stack i use day to day include PHP
          7/Laravel, Javascript / React JS, Nginx, Ubuntu 18 (Running on Digital
          ocean & AWS platforms), Ansible and Docker
        </span>
      </div>
    </div>
  );
};
