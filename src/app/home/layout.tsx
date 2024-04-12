"use client";

import { AuthContext } from "@/contexts/AuthContext";
import { Icon } from "@iconify/react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";

const NavMenu = ({
  title,
  icon,
  path,
}: {
  path: string;
  title: string;
  icon: string;
}) => {
  const browserPath = usePathname();
  return (
    <div
      className={`font-body  flex items-center h-10 hover:bg-[#E8E7FF] hover:text-primary hover:font-bold rounded-md px-2 w-full  cursor-pointer  gap-x-3  ${
        browserPath.includes(path)
          ? "bg-[#E8E7FF] text-primary font-body "
          : "text-foreground"
      }`}
    >
      <Icon className="text-lg   font-body" icon={icon} />
      <span className="text-md font-thin font-body  ">{title}</span>
    </div>
  );
};
const HeadIcon = () => {
  return (
    <div className="flex items-center gap-x-2   pl-4 h-full border-b shadow-sm w-full">
      <div className="w-6 h-14  flex items-center">
        <Icon
          className="text-gray-700 text-2xl opacity-90 mt-1"
          icon="simple-icons:poe"
        />
      </div>
      <span className=" text-gray-700 font-bold text-xl">SequelBase</span>
    </div>
  );
};
const Nav: React.FC<any> = ({ children }) => {
  const router = useRouter();
  const path = usePathname();
  const authContext = useContext(AuthContext);

  const onLogout = () => {
    localStorage.clear();
    router.push("/");
    authContext.clearUser();
  };
  return (
    <div className="min-h-screen w-full overflow-hidden">
      <div className="flex items-center w-full h-full overflow-hidden">
        <div className=" bg-background w-[290px] min-h-screen border-r border-gray-300 shadow-sm flex flex-col h-full items-start ">
          <HeadIcon />
          <div className="flex flex-col items-start gap-y-2 py-5 w-full px-2 ">
            <Link className="w-full" href={"/home/chat"}>
              <NavMenu
                path="/home/chat"
                icon={"heroicons:chat-bubble-left-ellipsis-20-solid"}
                title="Chat"
              />
            </Link>
            <Link className="w-full" href={"/home/workflows"}>
              <NavMenu
                path="/home/workflows"
                icon={"octicon:workflow-16"}
                title="Workflows"
              />
            </Link>
            <Link className="w-full" href={"/home/board"}>
              <NavMenu
                path="/home/board"
                icon={"fluent:pin-48-filled"}
                title="Pin board"
              />
            </Link>

            <Link className="w-full" href={"/home/connections"}>
              <NavMenu
                path="/home/connections"
                icon={"mdi:connection"}
                title="Connections"
              />
            </Link>
          </div>
          <div className="flex flex-grow  justify-end flex-col py-3 px-2 w-full ">
            <div className="flex flex-col border-t w-full py-5">
              <NavMenu
                path="/home/profile"
                icon={"clarity:user-line"}
                title="Profile"
              />
              <Link className="w-full" href={"/home/team"}>
                <NavMenu
                  path="/home/team"
                  icon={"ant-design:team-outlined"}
                  title="Team"
                />
              </Link>

              <Link className="w-full" href={"/home/api_keys"}>
                <NavMenu
                  path="/home/api_keys"
                  icon={"tabler:api"}
                  title="API Keys"
                />
              </Link>
              <div onClick={onLogout}>
                <NavMenu
                  path={"/logout"}
                  icon={"ic:outline-logout"}
                  title="Logout"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-screen overflow-hidden ">{children}</div>
      </div>
    </div>
  );
};

export default Nav;
