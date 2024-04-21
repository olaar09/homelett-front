"use client";
import { Icon } from "@iconify/react";

export const OverviewItem = ({ content }: { content: string }) => {
  /*   const cover = ` 
  I am eager to bring my extensive background in software engineering, particularly as a React frontend engineer, to the Remote Principal Mobile Engineer position at GitLab. With over five years of experience in software development and three years dedicated to mastering React Native, I possess a deep understanding of the technologies pivotal to this role including Javascript, NodeJS, ReactJS, and associated frameworks like NextJS, SASS, SCSS, and Tailwind.\n\nMy technical proficiency extends to managing applications on AWS and deploying projects using Vercel, complemented by hands-on experience with Ubuntu environments and fundamental knowledge in networking and cybersecurity. These skills ensure that I can contribute effectively to GitLab’s objectives in driving mobile app development and leading new tech initiatives.\n\nBeyond my technical capabilities, I am an avid volleyball and basketball player, activities that have honed my teamwork and leadership skills—qualities that are beneficial for fostering collaboration and innovation within GitLab's remote team setting.\n\nI am enthusiastic about the opportunity to leverage my technical expertise and passion for open-source platforms at GitLab, contributing to your team's success and the continued evolution of your impressive suite of DevOps tools
  `; */
  return (
    <div className="">
      <div className="my-4  text-gray-700 flex flex-col gap-y-4">
        <span
          className="text-gray-600 text-sm"
          dangerouslySetInnerHTML={{
            __html: content ?? "".replaceAll("\n", "<br />"),
          }}
        ></span>
      </div>
    </div>
  );
};
