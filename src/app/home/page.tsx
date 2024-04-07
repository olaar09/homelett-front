"use client";

import { Icon } from "@iconify/react";
import Chip from "@/app/components/Chip";
import HomeChatInput from "./_components/ChatInput";
import { useContext, useState } from "react";
import Drawer from "./_components/Drawer";
import Link from "next/link";
import StickyHead from "@/app/components/Header";
import { AuthContext } from "@/contexts/AuthContext";
import GroupCodeDrawer from "./_components/GroupCodeDrawer";
import { message } from "antd";
import { useRouter } from "next/navigation";

const Chat = () => {
  const auth = useContext(AuthContext);
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
    await onSubmitMessage();
  };

  const onSubmitMessage = async () => {
    setHasChat(true);
    setBusy(true);
    setTextContent("");
    message.success("Sending message");
  };

  return (
    <section>
      <div className="flex items-center gap-x-3 ">
        <div className="w-14 h-14">
          <Icon className="text-foreground text-6xl" icon="simple-icons:poe" />
        </div>
        <span className=" text-foreground font-bold text-4xl">ASK</span>
      </div>

      <div className="fixed bottom-5  left-0 right-0 px-4">
        <div className="text-black w-full  pt-7">
          <HomeChatInput
            hasChat={hasChat}
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
