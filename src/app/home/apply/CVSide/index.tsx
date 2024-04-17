import { Icon } from "@iconify/react";
import HeaderSide from "./Header";

const AsideItem = ({ title, icon }: any) => {
  return (
    <div className="flex items-center gap-x-2 text-gray-700">
      <Icon icon={icon} />
      <span className="text-sm"> {title}</span>
    </div>
  );
};

const AsideItem2 = ({ title, desc }: any) => {
  return (
    <div className="flex gap-x-2 text-gray-700 flex-col items-start">
      <span className="text-sm"> {title}</span>
      <span className="text-xs text-gray-500"> {desc}</span>
    </div>
  );
};

const ASide = () => {
  return (
    <div className="bg-gray-200 h-full w-4/12  ">
      <HeaderSide />

      <div className="flex flex-col gap-y-6 mt-10  px-10 mx-auto w-11/12">
        <AsideItem title={"agboolar09@gmail.com"} icon={"mage:email-fill"} />
        <AsideItem title={"+234819993993"} icon={"mdi:telephone"} />
        <AsideItem
          title={"linkedin.com/in/olaar09/"}
          icon={"akar-icons:linkedin-v1-fill"}
        />
        <AsideItem title={"github.com/olaar09"} icon={"bi:github"} />
      </div>

      <div className="mt-10  mx-auto w-11/12 px-10 ">
        <span className="font-black">Education</span>
        <div className="flex flex-col gap-y-4 mt-4 ">
          <AsideItem2 desc={"2022 - 2024"} title={"MSC Software engineering"} />
          <AsideItem2 desc={"2017 - 2020"} title={"BSC Comp Sci"} />
        </div>
      </div>

      <div className="mt-10  mx-auto w-11/12 px-10 ">
        <span className="font-black">Skills</span>
        <div className="flex flex-col gap-y-4 mt-4 ">
          <AsideItem2 desc={"React, Nuxt, Next, Vue"} title={"Javascript"} />
          <AsideItem2 desc={"Flask, Django"} title={"Python"} />
          <AsideItem2 desc={"Laravel, YII"} title={"PHP"} />
        </div>
      </div>

      <div className="mt-10  mx-auto w-11/12 px-10 ">
        <span className="font-black">Languages</span>
        <div className="flex flex-col gap-y-4 mt-4 ">
          <AsideItem2 desc={"Native"} title={"Yoruba"} />
          <AsideItem2 desc={"Work, Official"} title={"English"} />
        </div>
      </div>
    </div>
  );
};

export default ASide;
