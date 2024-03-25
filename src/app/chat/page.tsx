"use client";

import { Icon } from "@iconify/react";
import Chip from "@/app/components/Chip";
import HomeChatInput from "./_components/ChatInput";
import { useContext, useState } from "react";
import Drawer from "./_components/Drawer";
import Link from "next/link";
import StickyHead from "@/app/components/Header";
import { FireBaseAuthContext } from "@/contexts/FireBaseAuthContext";
import GroupCodeDrawer from "./_components/GroupCodeDrawer";
import { message } from "antd";
import { useRouter } from "next/navigation";

const Chat = () => {
  const auth = useContext(FireBaseAuthContext);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [hasChat, setHasChat] = useState(false);
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  const [textContent, setTextContent] = useState("");

  const onOpenDrawer = () => {
    setOpenDrawer(true);
  };

  const onSend = async () => {
    if (!textContent) return message.warning("Enter a message to chat");
    if (textContent.length < 2) return message.warning("Enter a valid message");
    if (!auth.currentUserProfile?.currentSubjectId) {
      message.success("You need to subscribe to a subject first");
      return router.push("/chat/select_subject");
    }

    await onSubmitMessage();
  };

  const onSubmitMessage = async () => {
    setHasChat(true);
    setBusy(true);
    message.success("Sending message");
  };

  const notHasGroup =
    !auth.currentUserProfile?.groups ||
    auth.currentUserProfile!.groups.length < 1;

  return (
    <section
      className={`flex items-center  h-screen flex-col relative ${
        hasChat ? "justify-start" : "justify-center"
      }`}
    >
      <Drawer isOpen={openDrawer} setIsOpen={setOpenDrawer} />
      <GroupCodeDrawer
        onClose={() => console.log("")}
        open={auth && auth!.currentUser! && !auth.loading && notHasGroup}
        items={[]}
      />

      <StickyHead hasContent={hasChat}>
        <div className="flex justify-between items-center">
          <div className="flex gap-x-4 items-center ">
            <div
              onClick={onOpenDrawer}
              className="flex items-center h-full w-8"
            >
              <Icon
                icon={"material-symbols:menu"}
                className="text-3xl cursor-pointer"
              />
            </div>

            {!auth.loading && auth.currentUserProfile?.currentSubjectId && (
              <div
                onClick={onOpenDrawer}
                className="flex items-center gap-x-2  px-1 py-1 w-32 h-10"
              >
                <span className="font-bold truncate">
                  {auth.currentUserProfile?.currentSubject?.title}
                </span>
                <Icon
                  icon={"ri:arrow-drop-down-line"}
                  className="text-3xl cursor-pointer "
                />
              </div>
            )}

            {(auth.loading || !auth.currentUserProfile?.currentSubjectId) && (
              <div className="h-10 flex items-center">
                <Icon
                  icon={"eos-icons:three-dots-loading"}
                  className="text-3xl cursor-pointer "
                />
              </div>
            )}
          </div>

          <Link href={"/chat/select_subject"}>
            <div className="flex items-center bg-panel px-3 py-1 rounded-lg gap-x-2">
              <Icon
                icon={"octicon:apps-16"}
                className="text-md cursor-pointer"
              />
              <span className="text-sm">New subject</span>
            </div>
          </Link>
        </div>
      </StickyHead>

      <div className="flex items-center gap-x-3 ">
        <div className="w-14 h-14">
          <Icon className="text-foreground text-6xl" icon="simple-icons:poe" />
        </div>
        <span className=" text-foreground font-bold text-4xl">ASK</span>
      </div>

      <div className="fixed bottom-5  left-0 right-0 px-4">
        <div className="flex flex-row  items-center justify-evenly gap-x-2 mt-4 ">
          <div className="shrink-0">
            <Chip
              title="Write"
              icon="streamline:ai-edit-spark-solid"
              isSelected={true}
              toggleSelect={() => console.log("kmk")}
            />
          </div>
          <div className="shrink-0">
            <Chip
              title="Upload"
              icon="ri:attachment-fill"
              isSelected={false}
              toggleSelect={() => console.log("kmk")}
            />
          </div>
          <div className="shrink-0">
            <Chip
              title="Voice"
              icon="icon-park-solid:voice-one"
              isSelected={false}
              toggleSelect={() => console.log("kmk")}
            />
          </div>
        </div>

        <div className="text-black w-full  pt-7">
          <HomeChatInput
            busy={busy}
            value={textContent}
            disabled={auth.loading}
            onChange={(e) => setTextContent(e.target?.value)}
            onSend={onSend}
          />
        </div>
      </div>
    </section>
  );
};

export default Chat;
