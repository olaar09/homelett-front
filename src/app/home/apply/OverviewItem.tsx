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
        <span className="text-gray-600 text-sm">
          I am a software engineering enthusiast with an eye for clean code and
          systematic approach. I believe in working with the team and sharing
          knowledge on the job. During my 3+ year careeer as a fullstack web
          developer, i have consistently improved my understanding of the end to
          end process of scalable software development. Recently, i have
          increasingly grown interested in microservices and distributed
          architectures and the technology that binds them. Most importantly i
          am ever looking to improve my skills.
        </span>
      </div>
    </div>
  );
};
