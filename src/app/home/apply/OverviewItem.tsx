"use client";
import { Icon } from "@iconify/react";

export const OverviewItem = ({
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
      <div className="my-4  text-gray-700 flex flex-col gap-y-4">
        <span
          className="text-gray-600 text-sm"
          dangerouslySetInnerHTML={{
            __html: ` 
          I am excited to apply for the Principal Mobile Engineer position at
          GitLab, as advertised. With a robust background in software
          engineering and specialized expertise in mobile app development using
          React Native, I am eager to leverage my skills to contribute to your
          dynamic team.\n\nHaving earned a Bachelor’s degree in Computer
          Science, I have amassed over seven years of experience in software
          engineering, with more than five of these years dedicated to
          developing high-quality mobile applications. My journey began as a
          frontend engineer, where I honed my skills in JavaScript, NodeJS,
          ReactJS, and other front-end technologies such as Jes, Mocha, NextJS,
          SASS, SCSS, and Tailwind. This foundation has been instrumental in my
          ability to lead projects and innovate solutions that enhance user
          engagement and satisfaction.\n\nIn my current role, I have been
          pivotal in driving the development of mobile applications, with a
          particular focus on React Native. This experience aligns well with the
          responsibilities outlined for your position, especially since I have
          also taken the lead in new initiatives and team-building efforts. My
          role involves direct interaction with users to gather feedback and
          iterate on products, ensuring that the final deliverables are not only
          functional but also user-centric.\n\nI am also skilled in various
          other technologies such as AWS, Vercel, and Ubuntu, which have been
          vital in deploying scalable and efficient applications. My experiences
          with networking and cybersecurity have further ensured that the
          applications I develop are secure and robust against potential
          threats.\n\nOutside of my professional life, I am an avid volleyball
          and basketball player, which allows me to hone skills that are just as
          valuable off the court as on it—teamwork, strategic thinking, and
          leadership. Additionally, my interest in music has enhanced my
          creativity and ability to think outside the box—qualities that I bring
          to every project I undertake.\n\nI am particularly drawn to GitLab
          because of its commitment to open-source projects and its robust suite
          of tools that facilitate effective collaboration and project
          management. I am enthusiastic about the opportunity to bring my
          background in mobile development and my passion for innovative
          open-platform solutions to GitLab, contributing to the company’s
          success in delivering top-tier applications.\n\nThank you for
          considering my application. I am looking forward to the possibility of
          contributing to and growing with GitLab, and excited about the
          potential to further develop applications that meet the needs of users
          worldwide.\n\nSincerely,\n\nJohn Isaac
          `,
          }}
        ></span>
      </div>
    </div>
  );
};
