// components/SlideOut.tsx
import TextAvatar from "@/app/components/TextAvatar";
import { ISubjectItem } from "@/app/interfaces/IChatItem";
import { FireBaseAuthContext } from "@/contexts/AuthContext";
import FirebaseContext from "@/contexts/FirebaseContext";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

type DrawerProps = {
  isOpen: boolean;
  setIsOpen: (status: boolean) => void;
};

const Drawer: React.FC<DrawerProps> = ({ isOpen, setIsOpen }) => {
  const services = useContext(FirebaseContext);
  const auth = useContext(FireBaseAuthContext);
  const router = useRouter();

  const menus = [
    { title: "Explore", icon: "octicon:apps-16" },
    { title: "Profile", icon: "material-symbols:settings" },
    {
      title: "Logout",
      icon: "streamline:logout-1-solid",
      click: async () => {
        setIsOpen(false);
        await services!.authService.logout();
        router.push("/");
      },
    },
  ];

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isOpen]);

  const onChangeChat = (subject: ISubjectItem) => {
    setIsOpen(false);
    auth.updateChat(subject.id);
  };

  return (
    <aside className=" lg:hidden">
      {/*   <button
        className="fixed top-4 left-4 z-10 p-2 text-white bg-background rounded hover:bg-background"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icon
          icon={"material-symbols:menu"}
          className="text-3xl cursor-pointer"
        />
      </button> */}

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
                SequelBase
              </span>
            </div>
            <Icon
              icon={"jam:write-f"}
              onClick={() => setIsOpen(!isOpen)}
              className="text-2xl text-foreground-secondary"
            />
          </div>
          <div className="mt-2 px-4 h-5">
            <h2 className="text-foreground-secondary text-xs ">
              Subscriptions
            </h2>
          </div>

          <div className="flex-1 overflow-y-scroll">
            {(auth.currentUserProfile?.subscribedSubjects ?? []).map(
              (val, index) => {
                return (
                  <div
                    onClick={() => onChangeChat(val)}
                    key={index}
                    className="px-2 border-b-[0.1px] border-b-foreground-secondary h-16 mt-4 flex gap-x-6 items-start"
                  >
                    <div className="w-2">
                      <TextAvatar character={"A"} />
                    </div>

                    <div className="flex-grow ml-4">
                      <span className="truncate">{val.title}</span>
                      <p className="text-xs text-foreground-secondary truncate whitespace-break-spaces">
                        {val.description}
                      </p>
                    </div>
                  </div>
                );
              }
            )}
          </div>
          <div className="  flex flex-col justify-end pb-3">
            {menus.map((menu, index) => {
              return (
                <div
                  key={index}
                  onClick={menu.click}
                  className="px-4 bg-panel mx-2 rounded-lg border-b-foreground-secondary h-16 mt-4 flex gap-x-2 items-center"
                >
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
