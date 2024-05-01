import { Icon } from "@iconify/react";

import { Avatar } from "antd";

const HeaderSide = ({ profile }: any) => {
  return (
    <div className="w-full flex flex-col items-center h-48  pt-4">
      <Avatar
        shape="square"
        className="w-32 h-32"
        size={"large"}
        src={"/sample.png"}
      />
      <div className="flex flex-col items-center mt-2">
        <span className="font-black text-2xl">
          {profile.first_name} {profile.last_name}
        </span>
        <span className="text-gray-600 text-xl font-black">
          {profile.profession}
        </span>
      </div>
    </div>
  );
};

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

//"bi:github"

const ASide = ({ profile }: any) => {
  const skills =
    profile?.attributes?.filter((attr: any) => attr.attribute === "skill") ??
    [];

  const languages =
    profile?.attributes?.filter((attr: any) => attr.attribute === "language") ??
    [];

  const links =
    profile?.attributes?.filter((attr: any) => attr.attribute === "link") ?? [];

  const academics =
    profile?.attributes?.filter((attr: any) => attr.attribute === "academic") ??
    [];

  console.log(skills, " joeldkms;");

  return (
    <div className="bg-gray-200 h-full w-4/12  ">
      <HeaderSide profile={profile} />

      <div className="flex flex-col gap-y-6 mt-10  px-10 mx-auto w-11/12">
        {(links ?? []).map((link: any, key: any) => (
          <AsideItem2 key={key} desc={link.value} title={link.title} />
        ))}

        {/*         <AsideItem title={profile?.niche_email} icon={"mage:email-fill"} />
        <AsideItem title={profile?.niche_phone} icon={"mdi:telephone"} />
        <AsideItem
          title={"linkedin.com/in/isaac09/"}
          icon={"akar-icons:linkedin-v1-fill"}
        />
        <AsideItem title={profile?.link_1} icon={profile?.link_1_icon} /> */}
      </div>

      <div className="mt-10  mx-auto w-11/12 px-10 ">
        <span className="font-black">Education</span>
        <div className="flex flex-col gap-y-4 mt-4 ">
          {academics.map((academic: any, key: any) => (
            <AsideItem2 key={key} desc={academic.value} title={academic.icon} />
          ))}
        </div>
      </div>

      <div className="mt-10  mx-auto w-11/12 px-10 ">
        <span className="font-black">Skills</span>
        <div className="flex flex-col gap-y-4 mt-4 ">
          {skills.map((sk: any, key: any) => (
            <AsideItem2 key={key} desc={sk.value} title={sk.icon} />
          ))}
          {/*          <AsideItem2 desc={"Flask, Django"} title={"Python"} />
          <AsideItem2 desc={"Laravel, YII"} title={"PHP"} /> */}
        </div>
      </div>

      <div className="mt-10  mx-auto w-11/12 px-10 ">
        <span className="font-black">Languages</span>
        <div className="flex flex-col gap-y-4 mt-4 ">
          {languages.map((lang: any, key: any) => (
            <AsideItem2 key={key} desc={lang.value} title={lang.icon} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ASide;
