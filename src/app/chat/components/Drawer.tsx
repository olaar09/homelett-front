// components/SlideOut.tsx
import TextAvatar from "@/app/components/TextAvatar";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";

type DrawerProps = {
  isOpen: boolean;
  setIsOpen: (status: boolean) => void;
};

const menus = [
  { title: "Settings", icon: "material-symbols:settings" },
  { title: "Profile", icon: "iconamoon:profile-fill" },
  { title: "Logout", icon: "streamline:logout-1-solid" },
];
const Drawer: React.FC<DrawerProps> = ({ isOpen, setIsOpen }) => {
  return (
    <aside className=" lg:hidden">
      <button
        className="fixed top-4 left-4 z-10 p-2 text-white bg-background rounded hover:bg-background"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icon
          icon={"material-symbols:menu"}
          className="text-3xl cursor-pointer"
        />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <div
        className={`fixed top-0 left-0 z-20 w-3/4 h-full bg-background shadow-lg transform transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className=" h-full flex flex-col">
          <div className="h-16 flex items-center justify-between bg-panel px-4 py-2">
            <div className="flex items-center gap-x-2">
              <Icon
                icon={"simple-icons:poe"}
                className=" text-foreground text-3xl"
              />
              <span className=" text-foreground text-2xl font-bold pb-[0.5px]">
                AfterClass
              </span>
            </div>
            <Icon
              icon={"jam:write-f"}
              onClick={() => setIsOpen(!isOpen)}
              className="text-2xl text-foreground-secondary"
            />
          </div>
          <div className="mt-2 px-4 h-5">
            <h2 className="text-foreground-secondary text-xs ">Recent</h2>
          </div>

          <div className="flex-1 overflow-y-scroll">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => {
              return (
                <div className="px-4 border-b-[0.1px] border-b-foreground-secondary h-16 mt-4 flex gap-x-2 items-start">
                  <TextAvatar character={"A"} />
                  <div>
                    <span>CSS 101</span>
                    <p className="text-xs text-foreground-secondary">
                      This is the content of the slide-out panel.
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="  flex flex-col justify-end pb-3">
            {menus.map((menu) => {
              return (
                <div className="px-4 bg-panel mx-2 rounded-lg border-b-foreground-secondary h-16 mt-4 flex gap-x-2 items-center">
                  <div className="flex items-center gap-x-2">
                    <Icon icon={menu.icon} />
                    <span>{menu.title}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Drawer;
