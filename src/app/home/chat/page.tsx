"use client";

import { Icon } from "@iconify/react";
import { ChangeEvent, useContext, useEffect, useState } from "react";

import Link from "next/link";
import { Spin, message } from "antd";
import APIUtil from "@/services/APIUtil";
import { IChat } from "@/app/interfaces/ISubjectItem";
import { useRequest } from "ahooks";
import TextAvatar from "@/app/components/TextAvatar";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import LoadingOverlay from "@/app/components/LoadingOverlay";
import ChatInput from "../_components/ChatInput";
import ConnectorModal from "../_components/Connector/Connector";

const HeaderItem = ({
  withBg,
  title,
  icon,
}: {
  withBg: boolean;
  title: string;
  icon: string;
}) => {
  return (
    <div
      className={` items-center flex gap-x-1 py-2 cursor-pointer hover:opacity-55 transition-all duration-150 ${
        withBg
          ? "bg-primary text-foreground-inverted rounded-lg px-3 "
          : "text-foreground "
      }`}
    >
      <Icon icon={icon} className="text-xl" />
      <span className="text-sm font-bold mt-0"> {title}</span>
    </div>
  );
};

const Chat = () => {
  const [chats, setChats] = useState<IChat[]>([]);
  const [openConnector, setOpenConnector] = useState<boolean>(false);
  const [userInput, setUserInput] = useState("");

  const currentAuth = useContext(AuthContext);
  const authContext = useContext(AuthContext);
  const apiUtil = new APIUtil();
  const router = useRouter();

  const getChats = async (): Promise<any> => {
    try {
      const data = await apiUtil.profileService.loadProfile();
      if (data) {
        return data;
      }
    } catch (error) {
      message.error("unable to load data");
    }
  };

  const { data, error, loading } = useRequest(() => getChats(), {
    ready:
      authContext.currentUser != null && authContext.currentUser != undefined,
  });

  useEffect(() => {
    if (currentAuth) {
      if (
        (!currentAuth.dataSources || currentAuth.dataSources?.length < 1) &&
        !currentAuth.loadingSources
      ) {
        console.log("ASDFGH", currentAuth.dataSources, currentAuth, loading);

        onOpenConnector();
      }
    }
  }, [currentAuth, currentAuth.loadingSources]);

  const onSendChat = () => {
    console.log("chat here");
  };

  const onChange = (ev: any) => {
    setUserInput(ev.target?.value);
  };

  const onOpenConnector = () => {
    setOpenConnector(true);
  };

  const onCloseConnector = () => {
    if (!currentAuth.dataSources || currentAuth.dataSources?.length < 1) {
      return;
    }

    setOpenConnector(false);
  };

  return (
    <main className="h-full bg-background-thin min-h-screen flex flex-col">
      <LoadingOverlay
        loading={currentAuth.loading || currentAuth.loadingSources}
      />
      <ConnectorModal visible={openConnector} onClose={onCloseConnector} />
      <section className="h-14  flex items-center justify-between px-6">
        <HeaderItem
          icon="devicon:mysql-wordmark"
          title="Main DB"
          withBg={false}
        />

        <div className="flex items-center gap-x-7">
          <HeaderItem
            icon="fluent:history-32-filled"
            title="Previous chats"
            withBg={false}
          />
          <HeaderItem withBg icon="ri:chat-new-fill" title="Start a new chat" />
        </div>
      </section>

      <section className="flex flex-grow justify-end flex-col  px-6">
        <div className="flex w-full lg:w-full xl:w-8/12 mx-auto py-10">
          <ChatInput
            disabled={false}
            busy={false}
            hasChat={false}
            value={userInput}
            onSend={onSendChat}
            onChange={onChange}
          />
        </div>
      </section>
    </main>
  );
};

export default Chat;
