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

//"bi:github"

const ASide = ({ profile }: any) => {
  return (
    <div className="bg-gray-200 h-full w-4/12  ">
      <HeaderSide />

      <div className="flex flex-col gap-y-6 mt-10  px-10 mx-auto w-11/12">
        <AsideItem title={profile?.niche_email} icon={"mage:email-fill"} />
        <AsideItem title={profile?.niche_phone} icon={"mdi:telephone"} />
        <AsideItem
          title={"linkedin.com/in/isaac09/"}
          icon={"akar-icons:linkedin-v1-fill"}
        />
        <AsideItem title={profile?.link_1} icon={profile?.link_1_icon} />
      </div>

      <div className="mt-10  mx-auto w-11/12 px-10 ">
        <span className="font-black">Education</span>
        <div className="flex flex-col gap-y-4 mt-4 ">
          <AsideItem2
            desc={profile?.link_1_date}
            title={profile?.link_1_title}
          />
          <AsideItem2
            desc={profile?.link_2_date}
            title={profile?.link_2_title}
          />
        </div>
      </div>

      <div className="mt-10  mx-auto w-11/12 px-10 ">
        <span className="font-black">Skills</span>
        <div className="flex flex-col gap-y-4 mt-4 ">
          {profile?.skills ??
            [].map((sk) => (
              <AsideItem2
                desc={"React, Nuxt, Next, Vue"}
                title={"Javascript"}
              />
            ))}
          {/*          <AsideItem2 desc={"Flask, Django"} title={"Python"} />
          <AsideItem2 desc={"Laravel, YII"} title={"PHP"} /> */}
        </div>
      </div>

      <div className="mt-10  mx-auto w-11/12 px-10 ">
        <span className="font-black">Languages</span>
        <div className="flex flex-col gap-y-4 mt-4 ">
          {profile?.languages ??
            [].map((sk) => <AsideItem2 desc={"Native"} title={"Yoruba"} />)}
        </div>
      </div>
    </div>
  );
};

export default ASide;
